"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { useDebounce } from "@/lib/performance"

interface SearchWithDebounceProps {
  onSearch: (query: string) => void
  placeholder?: string
  delay?: number
  className?: string
}

export default function SearchWithDebounce({
  onSearch,
  placeholder = "البحث...",
  delay = 300,
  className = "",
}: SearchWithDebounceProps) {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const debouncedQuery = useDebounce(query, delay)

  useEffect(() => {
    if (debouncedQuery !== query) {
      setIsSearching(true)
    }
  }, [query, debouncedQuery])

  useEffect(() => {
    onSearch(debouncedQuery)
    setIsSearching(false)
  }, [debouncedQuery, onSearch])

  const clearSearch = () => {
    setQuery("")
    onSearch("")
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pr-10 pl-10 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isSearching && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {query && !isSearching && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <div className="p-2 text-sm text-gray-600">
            البحث عن: <span className="font-medium text-gray-900">"{query}"</span>
          </div>
        </div>
      )}
    </div>
  )
}
