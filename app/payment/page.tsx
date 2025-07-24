"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  MessageCircle,
  CreditCard,
  Shield,
  CheckCircle,
  Copy,
  ExternalLink,
  ArrowLeft,
  Clock,
  Zap,
  Crown,
  Loader2,
  Wallet,
} from "lucide-react"
import Link from "next/link"

export default function PaymentPage() {
  const [selectedPlan, setSelectedPlan] = useState("advanced")
  const [paymentStep, setPaymentStep] = useState(1) // 1: plan selection, 2: payment details, 3: payment confirmation
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentAddress] = useState("TQrYKdQBJJt4iNKKSRhqwYqpamQKGvvZMGm") // Example USDT TRC20 address
  const [transactionHash, setTransactionHash] = useState("")

  const plans = [
    {
      id: "basic",
      name: "الأساسي",
      price: "10",
      originalPrice: "15",
      savings: "33%",
      features: ["موقع واحد", "نطاق فرعي مجاني", "دعم أساسي", "SSL مجاني"],
      popular: false,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "advanced",
      name: "المتقدم",
      price: "25",
      originalPrice: "35",
      savings: "29%",
      features: ["3 مواقع", "نطاق مخصص", "دعم متقدم", "تحليلات مفصلة", "نسخ احتياطي"],
      popular: true,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "pro",
      name: "الاحترافي",
      price: "50",
      originalPrice: "70",
      savings: "29%",
      features: ["مواقع غير محدودة", "نطاقات متعددة", "دعم أولوية", "API متقدم", "تخصيص كامل"],
      popular: false,
      color: "from-green-500 to-emerald-500",
    },
  ]

  const selectedPlanData = plans.find((plan) => plan.id === selectedPlan)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("تم نسخ العنوان!")
  }

  const handlePayment = async () => {
    if (!transactionHash) {
      alert("يرجى إدخال رقم المعاملة")
      return
    }

    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setPaymentStep(3)
    }, 3000)
  }

  const renderPlanSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">اختر خطتك</h2>
        <p className="text-gray-600">ادفع بـ USDT واحصل على خصم إضافي</p>
      </div>

      <div className="grid gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`cursor-pointer transition-all duration-300 ${
              selectedPlan === plan.id
                ? "border-2 border-purple-500 shadow-xl bg-gradient-to-br from-purple-50 to-white scale-105"
                : "border shadow-lg hover:shadow-xl bg-white hover:scale-102"
            } ${plan.popular ? "relative" : ""}`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 text-sm font-bold shadow-lg">
                  ⭐ الأكثر شعبية
                </Badge>
              </div>
            )}

            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${plan.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <Crown className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-gray-600 text-sm">
                      {plan.features.slice(0, 2).join(" • ")}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-blue-600">${plan.price}</span>
                    <div className="text-sm">
                      <div className="text-gray-500 line-through">${plan.originalPrice}</div>
                      <div className="text-gray-500">/شهر</div>
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-0 text-xs font-bold">
                    وفر {plan.savings}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        onClick={() => setPaymentStep(2)}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 py-4 text-lg"
      >
        متابعة الدفع
        <ArrowLeft className="mr-2 h-5 w-5" />
      </Button>
    </div>
  )

  const renderPaymentDetails = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">تفاصيل الدفع</h2>
        <p className="text-gray-600">ادفع بـ USDT (TRC20) بأمان</p>
      </div>

      {/* Order Summary */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">ملخص الطلب</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">الخطة:</span>
              <span className="font-bold text-gray-900">{selectedPlanData?.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">السعر الأصلي:</span>
              <span className="text-gray-500 line-through">${selectedPlanData?.originalPrice}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">خصم العملة المشفرة:</span>
              <span className="text-green-600 font-bold">-{selectedPlanData?.savings}</span>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between items-center text-lg font-bold">
              <span className="text-gray-900">المجموع:</span>
              <span className="text-blue-600">{selectedPlanData?.price} USDT</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Instructions */}
      <Card className="border-2 border-yellow-200 bg-yellow-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Shield className="h-6 w-6 text-yellow-600 mt-0.5" />
            <div className="space-y-3">
              <h4 className="font-bold text-yellow-800">تعليمات الدفع</h4>
              <div className="text-sm text-yellow-700 space-y-2">
                <p>1. انسخ عنوان المحفظة أدناه</p>
                <p>2. أرسل {selectedPlanData?.price} USDT (شبكة TRC20) إلى العنوان</p>
                <p>3. أدخل رقم المعاملة (Transaction Hash)</p>
                <p>4. سيتم تفعيل حسابك خلال 5-10 دقائق</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Address */}
      <Card className="bg-white shadow-lg border">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Wallet className="h-5 w-5 text-blue-600" />
            <h4 className="font-bold text-gray-900">عنوان المحفظة (USDT TRC20)</h4>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300">
            <div className="flex items-center justify-between">
              <code className="text-sm font-mono text-gray-800 break-all">{paymentAddress}</code>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(paymentAddress)}
                className="ml-2 flex-shrink-0"
              >
                <Copy className="h-4 w-4 mr-1" />
                نسخ
              </Button>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>⚠️ تأكد من إرسال USDT على شبكة TRC20 فقط</p>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Hash Input */}
      <Card className="bg-white shadow-lg border">
        <CardContent className="p-6 space-y-4">
          <h4 className="font-bold text-gray-900">رقم المعاملة</h4>
          <div className="space-y-2">
            <Input
              placeholder="أدخل رقم المعاملة (Transaction Hash)"
              value={transactionHash}
              onChange={(e) => setTransactionHash(e.target.value)}
              className="font-mono text-sm"
            />
            <p className="text-xs text-gray-500">
              يمكنك العثور على رقم المعاملة في محفظتك أو على{" "}
              <a href="https://tronscan.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                TronScan
                <ExternalLink className="inline h-3 w-3 ml-1" />
              </a>
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={() => setPaymentStep(1)}
          className="flex-1"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          السابق
        </Button>
        <Button
          onClick={handlePayment}
          disabled={!transactionHash || isProcessing}
          className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
        >
          {isProcessing ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <CheckCircle className="mr-2 h-4 w-4" />
          )}
          {isProcessing ? "جاري التحقق..." : "تأكيد الدفع"}
        </Button>
      </div>
    </div>
  )

  const renderPaymentConfirmation = () => (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-xl">
        <CheckCircle className="h-10 w-10 text-white" />
      </div>
      
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">تم الدفع بنجاح! 🎉</h2>
        <p className="text-gray-600">تم تفعيل اشتراكك في خطة {selectedPlanData?.name}</p>
      </div>

      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6 space-y-4">
          <h3 className="font-bold text-green-800">تفاصيل الاشتراك</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">الخطة:</span>
              <span className="font-bold">{selectedPlanData?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">المبلغ المدفوع:</span>
              <span className="font-bold">{selectedPlanData?.price} USDT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">رقم المعاملة:</span>
              <span className="font-mono text-xs break-all">{transactionHash}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">تاريخ التفعيل:</span>
              <span className="font-bold">{new Date().toLocaleDateString("ar-SA")}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Link href="/dashboard">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            الذهاب إلى لوحة التحكم
            <ArrowLeft className="mr-2 h-4 w-4" />
          </Button>
        </Link>
        
        <Link href="/chat">
          <Button variant="outline" className="w-full">
            <Zap className="mr-2 h-4 w-4" />
            ابدأ إنشاء موقعك الأول
          </Button>
        </Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100" dir="rtl">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-pink-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Chat2Site
              </h1>
            </Link>
            
            {/* Progress Steps */}
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step === paymentStep
                      ? "bg-blue-600 text-white"
                      : step < paymentStep
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step < paymentStep ? <CheckCircle className="h-4 w-4" /> : step}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="relative container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {paymentStep === 1 && renderPlanSelection()}
          {paymentStep === 2 && renderPaymentDetails()}
          {paymentStep === 3 && renderPaymentConfirmation()}
        </div>
      </div>
    </div>
  )
}