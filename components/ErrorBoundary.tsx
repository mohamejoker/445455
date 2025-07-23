"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)

    // Log to error reporting service
    if (typeof window !== "undefined") {
      // You can integrate with services like Sentry here
      console.error("Error details:", {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
      })
    }
  }

  render() {
    if (this.state.hasError) {
      const { fallback: Fallback } = this.props

      if (Fallback && this.state.error) {
        return <Fallback error={this.state.error} reset={() => this.setState({ hasError: false, error: undefined })} />
      }

      return <DefaultErrorFallback error={this.state.error} reset={() => this.setState({ hasError: false })} />
    }

    return this.props.children
  }
}

function DefaultErrorFallback({ error, reset }: { error?: Error; reset: () => void }) {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="text-center max-w-md mx-auto">
        <div className="w-32 h-32 bg-gradient-to-r from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-16 w-16 text-red-500" />
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">حدث خطأ غير متوقع</h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          نعتذر، حدث خطأ في هذا الجزء من التطبيق. يرجى المحاولة مرة أخرى.
        </p>

        {error && process.env.NODE_ENV === "development" && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
            <h3 className="font-bold text-red-800 mb-2">تفاصيل الخطأ:</h3>
            <code className="text-sm text-red-700 break-all">{error.message}</code>
          </div>
        )}

        <div className="space-y-4">
          <Button
            onClick={reset}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            إعادة المحاولة
          </Button>

          <Link href="/">
            <Button variant="outline" className="w-full bg-transparent">
              <Home className="h-4 w-4 mr-2" />
              العودة للرئيسية
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ErrorBoundary
