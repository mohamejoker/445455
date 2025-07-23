import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageCircle, Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4"
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

        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-gray-200 mb-4">404</div>
          <div className="w-32 h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="h-16 w-16 text-gray-400" />
          </div>
        </div>

        {/* Content */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">الصفحة غير موجودة</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          عذراً، لا يمكننا العثور على الصفحة التي تبحث عنها. ربما تم نقلها أو حذفها.
        </p>

        {/* Actions */}
        <div className="space-y-4">
          <Link href="/">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <Home className="h-4 w-4 mr-2" />
              العودة للرئيسية
            </Button>
          </Link>

          <div className="flex gap-3">
            <Link href="/chat" className="flex-1">
              <Button variant="outline" className="w-full bg-transparent">
                إنشاء موقع
              </Button>
            </Link>
            <Link href="/help" className="flex-1">
              <Button variant="outline" className="w-full bg-transparent">
                المساعدة
              </Button>
            </Link>
          </div>
        </div>

        {/* Suggestions */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="font-bold text-gray-900 mb-4">ربما تبحث عن:</h3>
          <div className="space-y-2">
            <Link href="/templates" className="block text-blue-600 hover:text-blue-800 transition-colors">
              • استعراض القوالب
            </Link>
            <Link href="/pricing" className="block text-blue-600 hover:text-blue-800 transition-colors">
              • خطط الأسعار
            </Link>
            <Link href="/dashboard" className="block text-blue-600 hover:text-blue-800 transition-colors">
              • لوحة التحكم
            </Link>
            <Link href="/help" className="block text-blue-600 hover:text-blue-800 transition-colors">
              • مركز المساعدة
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
