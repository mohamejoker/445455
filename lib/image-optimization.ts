"use client"

import type React from "react"

interface ImageOptimizationOptions {
  quality?: number
  format?: "webp" | "jpeg" | "png"
  width?: number
  height?: number
  fit?: "cover" | "contain" | "fill"
}

export class ImageOptimizer {
  private static canvas: HTMLCanvasElement | null = null
  private static ctx: CanvasRenderingContext2D | null = null

  private static getCanvas(): HTMLCanvasElement {
    if (!this.canvas) {
      this.canvas = document.createElement("canvas")
      this.ctx = this.canvas.getContext("2d")
    }
    return this.canvas
  }

  static async optimizeImage(file: File, options: ImageOptimizationOptions = {}): Promise<Blob> {
    const { quality = 0.8, format = "webp", width, height, fit = "cover" } = options

    return new Promise((resolve, reject) => {
      const img = new Image()

      img.onload = () => {
        try {
          const canvas = this.getCanvas()
          const ctx = this.ctx!

          // Calculate dimensions
          const { width: targetWidth, height: targetHeight } = this.calculateDimensions(
            img.width,
            img.height,
            width,
            height,
            fit,
          )

          canvas.width = targetWidth
          canvas.height = targetHeight

          // Clear canvas
          ctx.clearRect(0, 0, targetWidth, targetHeight)

          // Draw image
          if (fit === "cover") {
            this.drawImageCover(ctx, img, targetWidth, targetHeight)
          } else if (fit === "contain") {
            this.drawImageContain(ctx, img, targetWidth, targetHeight)
          } else {
            ctx.drawImage(img, 0, 0, targetWidth, targetHeight)
          }

          // Convert to blob
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob)
              } else {
                reject(new Error("Failed to create blob"))
              }
            },
            `image/${format}`,
            quality,
          )
        } catch (error) {
          reject(error)
        }
      }

      img.onerror = () => reject(new Error("Failed to load image"))
      img.src = URL.createObjectURL(file)
    })
  }

  private static calculateDimensions(
    originalWidth: number,
    originalHeight: number,
    targetWidth?: number,
    targetHeight?: number,
    fit = "cover",
  ) {
    if (!targetWidth && !targetHeight) {
      return { width: originalWidth, height: originalHeight }
    }

    if (targetWidth && !targetHeight) {
      const ratio = targetWidth / originalWidth
      return { width: targetWidth, height: Math.round(originalHeight * ratio) }
    }

    if (!targetWidth && targetHeight) {
      const ratio = targetHeight / originalHeight
      return { width: Math.round(originalWidth * ratio), height: targetHeight }
    }

    return { width: targetWidth!, height: targetHeight! }
  }

  private static drawImageCover(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    targetWidth: number,
    targetHeight: number,
  ) {
    const scale = Math.max(targetWidth / img.width, targetHeight / img.height)
    const scaledWidth = img.width * scale
    const scaledHeight = img.height * scale
    const x = (targetWidth - scaledWidth) / 2
    const y = (targetHeight - scaledHeight) / 2

    ctx.drawImage(img, x, y, scaledWidth, scaledHeight)
  }

  private static drawImageContain(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    targetWidth: number,
    targetHeight: number,
  ) {
    const scale = Math.min(targetWidth / img.width, targetHeight / img.height)
    const scaledWidth = img.width * scale
    const scaledHeight = img.height * scale
    const x = (targetWidth - scaledWidth) / 2
    const y = (targetHeight - scaledHeight) / 2

    ctx.drawImage(img, x, y, scaledWidth, scaledHeight)
  }

  static generatePlaceholder(width: number, height: number, color = "#f0f0f0"): string {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")!

    canvas.width = width
    canvas.height = height

    ctx.fillStyle = color
    ctx.fillRect(0, 0, width, height)

    return canvas.toDataURL()
  }

  static async createThumbnail(file: File, size = 150): Promise<Blob> {
    return this.optimizeImage(file, {
      width: size,
      height: size,
      fit: "cover",
      quality: 0.7,
      format: "webp",
    })
  }

  static getOptimizedImageUrl(src: string, options: ImageOptimizationOptions = {}): string {
    if (src.startsWith("data:") || src.startsWith("blob:")) {
      return src
    }

    // For placeholder.svg URLs, add parameters
    if (src.includes("placeholder.svg")) {
      const url = new URL(src, window.location.origin)

      if (options.width) url.searchParams.set("width", options.width.toString())
      if (options.height) url.searchParams.set("height", options.height.toString())

      return url.toString()
    }

    // For other images, you could integrate with image optimization services
    // like Cloudinary, ImageKit, or Next.js Image Optimization
    return src
  }
}

// React hook for image optimization
export function useImageOptimization() {
  const [isOptimizing, setIsOptimizing] = useState(false)

  const optimizeImage = useCallback(async (file: File, options: ImageOptimizationOptions = {}): Promise<Blob> => {
    setIsOptimizing(true)
    try {
      const optimizedBlob = await ImageOptimizer.optimizeImage(file, options)
      return optimizedBlob
    } finally {
      setIsOptimizing(false)
    }
  }, [])

  const createThumbnail = useCallback(async (file: File, size = 150): Promise<Blob> => {
    setIsOptimizing(true)
    try {
      const thumbnail = await ImageOptimizer.createThumbnail(file, size)
      return thumbnail
    } finally {
      setIsOptimizing(false)
    }
  }, [])

  return {
    optimizeImage,
    createThumbnail,
    isOptimizing,
  }
}

// Lazy loading image component
export function LazyImage({
  src,
  alt,
  width,
  height,
  className = "",
  placeholder,
  onLoad,
  onError,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & {
  placeholder?: string
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoaded(true)
    onLoad?.(e)
  }

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setHasError(true)
    onError?.(e)
  }

  const optimizedSrc = useMemo(() => {
    if (!src || !isInView) return placeholder || ImageOptimizer.generatePlaceholder(300, 200)
    return ImageOptimizer.getOptimizedImageUrl(src, { width: Number(width), height: Number(height) })
  }, [src, isInView, width, height, placeholder])

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      <img
        ref={imgRef}
        src={optimizedSrc || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${isLoaded && !hasError ? "opacity-100" : "opacity-0"}`}
        loading="lazy"
        decoding="async"
        {...props}
      />

      {!isLoaded && !hasError && isInView && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-gray-400 text-center">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-sm">فشل في تحميل الصورة</div>
          </div>
        </div>
      )}
    </div>
  )
}

import { useState, useMemo, useCallback, useRef, useEffect } from "react"
