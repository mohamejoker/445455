"use client"

import type React from "react"

import { useEffect, useState, useRef, useCallback } from "react"

// Performance monitoring hook
export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    renderTime: 0,
    memoryUsage: 0,
    loadTime: 0,
  })

  useEffect(() => {
    const startTime = performance.now()

    // Monitor render time
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        if (entry.entryType === "measure") {
          setMetrics((prev) => ({
            ...prev,
            renderTime: Math.round(entry.duration),
          }))
        }
      })
    })

    observer.observe({ entryTypes: ["measure"] })

    // Monitor memory usage
    if ("memory" in performance) {
      const memoryInfo = (performance as any).memory
      setMetrics((prev) => ({
        ...prev,
        memoryUsage: Math.round(memoryInfo.usedJSHeapSize / 1024 / 1024),
      }))
    }

    // Monitor load time
    const loadTime = performance.now() - startTime
    setMetrics((prev) => ({
      ...prev,
      loadTime: Math.round(loadTime),
    }))

    return () => {
      observer.disconnect()
    }
  }, [])

  return metrics
}

// Lazy loading hook
export function useLazyLoad(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return [ref, isVisible] as const
}

// Virtual scrolling hook
export function useVirtualScroll<T>(items: T[], itemHeight: number, containerHeight: number) {
  const [scrollTop, setScrollTop] = useState(0)

  const startIndex = Math.floor(scrollTop / itemHeight)
  const endIndex = Math.min(startIndex + Math.ceil(containerHeight / itemHeight) + 1, items.length)

  const visibleItems = {
    items: items.slice(startIndex, endIndex),
    startIndex,
    endIndex,
    totalHeight: items.length * itemHeight,
    offsetY: startIndex * itemHeight,
  }

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }, [])

  return { visibleItems, handleScroll }
}

// Debounce hook
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Throttle hook
export function useThrottle<T>(value: T, limit: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value)
  const lastRan = useRef(Date.now())

  useEffect(() => {
    const handler = setTimeout(
      () => {
        if (Date.now() - lastRan.current >= limit) {
          setThrottledValue(value)
          lastRan.current = Date.now()
        }
      },
      limit - (Date.now() - lastRan.current),
    )

    return () => {
      clearTimeout(handler)
    }
  }, [value, limit])

  return throttledValue
}

// Image preloader
export function preloadImages(urls: string[]): Promise<void[]> {
  const promises = urls.map((url) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve()
      img.onerror = reject
      img.src = url
    })
  })

  return Promise.all(promises)
}

// Resource prefetcher
export function prefetchResource(url: string, type: "script" | "style" | "image" = "script") {
  const link = document.createElement("link")
  link.rel = "prefetch"
  link.href = url

  if (type === "script") {
    link.as = "script"
  } else if (type === "style") {
    link.as = "style"
  } else if (type === "image") {
    link.as = "image"
  }

  document.head.appendChild(link)
}

// Performance measurement utilities
export class PerformanceTracker {
  private static marks: Map<string, number> = new Map()

  static mark(name: string) {
    this.marks.set(name, performance.now())
    performance.mark(name)
  }

  static measure(name: string, startMark: string, endMark?: string) {
    if (endMark) {
      performance.measure(name, startMark, endMark)
    } else {
      const startTime = this.marks.get(startMark)
      if (startTime) {
        const duration = performance.now() - startTime
        console.log(`${name}: ${duration.toFixed(2)}ms`)
      }
    }
  }

  static getMetrics() {
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming

    return {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      firstPaint: performance.getEntriesByName("first-paint")[0]?.startTime || 0,
      firstContentfulPaint: performance.getEntriesByName("first-contentful-paint")[0]?.startTime || 0,
      largestContentfulPaint: performance.getEntriesByType("largest-contentful-paint")[0]?.startTime || 0,
    }
  }
}

// Bundle analyzer
export function analyzeBundleSize() {
  if (typeof window !== "undefined" && "performance" in window) {
    const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[]

    const analysis = resources.reduce(
      (acc, resource) => {
        const size = resource.transferSize || 0
        const type = resource.name.split(".").pop() || "unknown"

        if (!acc[type]) {
          acc[type] = { count: 0, totalSize: 0 }
        }

        acc[type].count++
        acc[type].totalSize += size

        return acc
      },
      {} as Record<string, { count: number; totalSize: number }>,
    )

    console.table(analysis)
    return analysis
  }
}

// Memory usage monitor
export function monitorMemoryUsage() {
  if ("memory" in performance) {
    const memory = (performance as any).memory

    return {
      used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
      total: Math.round(memory.totalJSHeapSize / 1024 / 1024),
      limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024),
    }
  }

  return null
}

// FPS monitor
export function useFPSMonitor() {
  const [fps, setFPS] = useState(60)
  const frameCount = useRef(0)
  const lastTime = useRef(performance.now())

  useEffect(() => {
    let animationId: number

    const updateFPS = () => {
      frameCount.current++
      const currentTime = performance.now()

      if (currentTime - lastTime.current >= 1000) {
        setFPS(Math.round((frameCount.current * 1000) / (currentTime - lastTime.current)))
        frameCount.current = 0
        lastTime.current = currentTime
      }

      animationId = requestAnimationFrame(updateFPS)
    }

    animationId = requestAnimationFrame(updateFPS)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  return fps
}
