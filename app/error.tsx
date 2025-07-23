"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, RefreshCw, Home, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="text-center max-w-md mx-auto">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <MessageCircle className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Chat2Site
          </h1>
        </div>

        {/* Error Illustration */}
        <div className="mb-8">
          <div className="w-32 h-32 bg-gradient-to-r from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="h-16 w-16 text-red-500" />
          </div>
        </div>

        {/* Content */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">حدث خطأ غير متوقع</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          نعتذر، حدث خطأ أثناء تحميل هذه الصفحة. فريقنا التقني تم إشعاره بالمشكلة.
        </p>

        {/* Error Details (Development only) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
            <h3 className="font-bold text-red-800 mb-2">تفاصيل الخطأ:</h3>
            <code className="text-sm text-red-700 break-all">{error.message}</code>
            {error.digest && <p className="text-xs text-red-600 mt-2">Digest: {error.digest}</p>}
          </div>
        )}

        {/* Actions */}
        <div className="space-y-4">
          <Button
            onClick={reset}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            إعادة المحاولة
          </Button>

          <div className="flex gap-3">
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full bg-transparent">
                <Home className="h-4 w-4 mr-2" />
                الرئيسية
              </Button>
            </Link>
            <Link href="/help" className="flex-1">
              <Button variant="outline" className="w-full bg-transparent">
                المساعدة
              </Button>
            </Link>
          </div>
        </div>

        {/* Support Info */}
        <div className="mt-12 p-6 bg-blue-50 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-2">تحتاج مساعدة؟</h3>
          <p className="text-blue-700 text-sm mb-4">إذا استمرت المشكلة، يرجى التواصل مع فريق الدعم</p>
          <div className="flex gap-2 justify-center">
            <Button size="sm" variant="outline" className="bg-white">
              دردشة مباشرة
            </Button>
            <Button size="sm" variant="outline" className="bg-white">
              إرسال بريد
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
