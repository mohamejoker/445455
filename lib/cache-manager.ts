"use client"

import { useEffect } from "react"

import { useState } from "react"

interface CacheItem<T> {
  data: T
  timestamp: number
  ttl: number
}

class CacheManager {
  private cache: Map<string, CacheItem<any>> = new Map()
  private maxSize = 100

  constructor(maxSize?: number) {
    if (maxSize) {
      this.maxSize = maxSize
    }
  }

  set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void {
    // Remove oldest items if cache is full
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value
      this.cache.delete(oldestKey)
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    })
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key)

    if (!item) {
      return null
    }

    // Check if item has expired
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key)
      return null
    }

    return item.data as T
  }

  has(key: string): boolean {
    const item = this.cache.get(key)

    if (!item) {
      return false
    }

    // Check if item has expired
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key)
      return false
    }

    return true
  }

  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  size(): number {
    return this.cache.size
  }

  keys(): string[] {
    return Array.from(this.cache.keys())
  }

  // Clean expired items
  cleanup(): void {
    const now = Date.now()

    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key)
      }
    }
  }

  // Get cache statistics
  getStats() {
    const now = Date.now()
    let expired = 0
    let valid = 0

    for (const item of this.cache.values()) {
      if (now - item.timestamp > item.ttl) {
        expired++
      } else {
        valid++
      }
    }

    return {
      total: this.cache.size,
      valid,
      expired,
      maxSize: this.maxSize,
      hitRate: valid / (valid + expired) || 0,
    }
  }
}

// Create singleton instance
export const cacheManager = new CacheManager()

// Auto cleanup every 5 minutes
if (typeof window !== "undefined") {
  setInterval(
    () => {
      cacheManager.cleanup()
    },
    5 * 60 * 1000,
  )
}

// Cache decorator for functions
export function cached<T extends (...args: any[]) => any>(
  fn: T,
  ttl: number = 5 * 60 * 1000,
  keyGenerator?: (...args: Parameters<T>) => string,
): T {
  return ((...args: Parameters<T>) => {
    const key = keyGenerator ? keyGenerator(...args) : JSON.stringify(args)

    // Try to get from cache first
    const cached = cacheManager.get(key)
    if (cached !== null) {
      return cached
    }

    // Execute function and cache result
    const result = fn(...args)
    cacheManager.set(key, result, ttl)

    return result
  }) as T
}

// React hook for cached data
export function useCachedData<T>(key: string, fetcher: () => Promise<T>, ttl: number = 5 * 60 * 1000) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      // Check cache first
      const cached = cacheManager.get<T>(key)
      if (cached !== null) {
        setData(cached)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const result = await fetcher()
        cacheManager.set(key, result, ttl)
        setData(result)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [key, ttl])

  const refetch = async () => {
    cacheManager.delete(key)
    setLoading(true)
    setError(null)

    try {
      const result = await fetcher()
      cacheManager.set(key, result, ttl)
      setData(result)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, refetch }
}

// Local storage cache with expiration
export class LocalStorageCache {
  private prefix: string

  constructor(prefix = "cache_") {
    this.prefix = prefix
  }

  set<T>(key: string, data: T, ttl: number = 24 * 60 * 60 * 1000): void {
    if (typeof window === "undefined") return

    const item = {
      data,
      timestamp: Date.now(),
      ttl,
    }

    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(item))
    } catch (error) {
      console.warn("Failed to save to localStorage:", error)
    }
  }

  get<T>(key: string): T | null {
    if (typeof window === "undefined") return null

    try {
      const itemStr = localStorage.getItem(this.prefix + key)
      if (!itemStr) return null

      const item = JSON.parse(itemStr)

      // Check if expired
      if (Date.now() - item.timestamp > item.ttl) {
        localStorage.removeItem(this.prefix + key)
        return null
      }

      return item.data as T
    } catch (error) {
      console.warn("Failed to read from localStorage:", error)
      return null
    }
  }

  delete(key: string): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(this.prefix + key)
  }

  clear(): void {
    if (typeof window === "undefined") return

    const keys = Object.keys(localStorage)
    keys.forEach((key) => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key)
      }
    })
  }

  cleanup(): void {
    if (typeof window === "undefined") return

    const keys = Object.keys(localStorage)
    const now = Date.now()

    keys.forEach((key) => {
      if (key.startsWith(this.prefix)) {
        try {
          const itemStr = localStorage.getItem(key)
          if (itemStr) {
            const item = JSON.parse(itemStr)
            if (now - item.timestamp > item.ttl) {
              localStorage.removeItem(key)
            }
          }
        } catch (error) {
          // Remove corrupted items
          localStorage.removeItem(key)
        }
      }
    })
  }
}

export const localStorageCache = new LocalStorageCache()

// Auto cleanup localStorage cache on page load
if (typeof window !== "undefined") {
  window.addEventListener("load", () => {
    localStorageCache.cleanup()
  })
}
