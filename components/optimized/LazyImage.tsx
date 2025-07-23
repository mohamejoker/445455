"use client"

import { useState, useCallback, memo } from "react"
import { useLazyLoad } from "@/lib/performance"

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  placeholder?: string
  onLoad?: () => void
  onError?: () => void
}

const LazyImage = memo(function LazyImage({
  src,
  alt,
  className = "",
  placeholder = "/placeholder.svg?height=200&width=300",
  onLoad,
  onError,
}: LazyImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [ref, isVisible] = useLazyLoad(0.1)

  const handleLoad = useCallback(() => {
    setImageLoaded(true)
    onLoad?.()
  }, [onLoad])

  const handleError = useCallback(() => {
    setImageError(true)
    onError?.()
  }, [onError])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {isVisible && (
        <>
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          <img
            src={imageError ? placeholder : src}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            decoding="async"
          />
        </>
      )}

      {!isVisible && (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
          <div className="text-gray-400 text-sm">جاري التحميل...</div>
        </div>
      )}
    </div>
  )
})

export default LazyImage
