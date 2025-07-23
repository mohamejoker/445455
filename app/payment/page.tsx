"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  MessageCircle,
  CreditCard,
  Shield,
  CheckCircle,
  Copy,
  ExternalLink,
  Clock,
  Star,
  Zap,
  Globe,
  ArrowLeft,
  Wallet,
  QrCode,
} from "lucide-react"
import Link from "next/link"

export default function PaymentPage() {
  const [selectedPlan, setSelectedPlan] = useState("advanced")
  const [paymentMethod, setPaymentMethod] = useState("usdt")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStep, setPaymentStep] = useState(1)
  const [walletAddress] = useState("TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE")
  const [transactionHash, setTransactionHash] = useState("")

  const plans = {
    basic: {
      name: "الأساسي",
      price: 10,
      originalPrice: 15,
      features: ["موقع واحد", "نطاق فرعي", "دعم أساسي", "SSL مجاني"],
      color: "from-blue-500 to-blue-600",
    },
    advanced: {
      name: "المتقدم",
      price: 25,
      originalPrice: 35,
      features: ["3 مواقع", "نطاق مخصص", "دعم متقدم", "تحليلات", "نسخ احتياطي"],
      color: "from-purple-500 to-pink-500",
      popular: true,
    },
    pro: {
      name: "الاحترافي",
      price: 50,
      originalPrice: 70,
      features: ["مواقع غير محدودة", "نطاقات متعددة", "دعم أولوية", "API", "تخصيص كامل"],
      color: "from-green-500 to-emerald-500",
    },
  }

  const currentPlan = plans[selectedPlan as keyof typeof plans]

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setPaymentStep(2)
    }, 2000)
  }

  const handleConfirmPayment = async () => {
    if (!transactionHash.trim()) {
      alert("يرجى إدخال رقم المعاملة")
      return
    }

    setIsProcessing(true)

    // Simulate payment verification
    setTimeout(() => {
      setIsProcessing(false)
      setPaymentStep(3)
    }, 3000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("تم نسخ العنوان!")
  }

  if (paymentStep === 3) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4"
        dir="rtl"
      >
        <Card className="w-full max-w-md text-center shadow-2xl border-0">
          <CardContent className="p-8">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">تم الدفع بنجاح!</h2>
            <p className="text-gray-600 mb-6">
              تم تأكيد دفعتك وتفعيل خطة {currentPlan.name}. يمكنك الآن البدء في إنشاء مواقعك.
            </p>
            <div className="space-y-3">
              <Link href="/chat">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                  ابدأ إنشاء موقعك الآن
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" className="w-full bg-transparent">
                  الذهاب إلى لوحة التحكم
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4" dir="rtl">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 mb-8">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Chat2Site
              </h1>
            </Link>
            <Badge className="bg-blue-100 text-blue-800 border-0">
              <Shield className="h-3 w-3 mr-1" />
              دفع آمن
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Plan Selection */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">اختر خطتك</h2>
              <p className="text-gray-600">اختر الخطة التي تناسب احتياجاتك</p>
            </div>

            <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="space-y-4">
              {Object.entries(plans).map(([key, plan]) => (
                <div key={key} className="relative">
                  <RadioGroupItem value={key} id={key} className="sr-only" />
                  <label
                    htmlFor={key}
                    className={`block p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      selectedPlan === key
                        ? "border-blue-500 bg-blue-50 shadow-lg"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${plan.color} rounded-lg flex items-center justify-center`}
                        >
                          <Zap className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                          {plan.popular && (
                            <Badge className="bg-purple-100 text-purple-800 border-0 text-xs">الأكثر شعبية</Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="text-3xl font-bold text-blue-600">${plan.price}</span>
                          <div>
                            <div className="text-sm text-gray-500 line-through">${plan.originalPrice}</div>
                            <div className="text-xs text-gray-500">/شهر</div>
                          </div>
                        </div>
                        <Badge className="bg-red-100 text-red-800 border-0 text-xs mt-1">
                          وفر ${plan.originalPrice - plan.price}
                        </Badge>
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </label>
                </div>
              ))}
            </RadioGroup>

            {/* Features Comparison */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">لماذا Chat2Site؟</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: <Zap className="h-4 w-4" />, text: "إنشاء سريع" },
                    { icon: <Shield className="h-4 w-4" />, text: "أمان عالي" },
                    { icon: <Globe className="h-4 w-4" />, text: "نشر فوري" },
                    { icon: <Star className="h-4 w-4" />, text: "جودة احترافية" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-700">
                      <div className="text-blue-600">{item.icon}</div>
                      <span className="text-sm font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Payment */}
          <div className="space-y-6">
            {paymentStep === 1 && (
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    تفاصيل الدفع
                  </CardTitle>
                  <CardDescription>ادفع بأمان باستخدام USDT</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Order Summary */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-3">ملخص الطلب</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>خطة {currentPlan.name}</span>
                        <span>${currentPlan.originalPrice}</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>خصم</span>
                        <span>-${currentPlan.originalPrice - currentPlan.price}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span>المجموع</span>
                        <span className="text-blue-600">${currentPlan.price} USDT</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">طريقة الدفع</Label>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <Wallet className="h-8 w-8 text-blue-600" />
                        <div>
                          <h4 className="font-bold text-blue-900">USDT (TRC-20)</h4>
                          <p className="text-sm text-blue-700">دفع سريع وآمن بالعملة المشفرة</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Security Features */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      ضمانات الأمان
                    </h4>
                    <ul className="space-y-1 text-sm text-green-800">
                      <li>• تشفير SSL 256-bit</li>
                      <li>• معاملات آمنة 100%</li>
                      <li>• ضمان استرداد خلال 30 يوم</li>
                    </ul>
                  </div>

                  <Button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 py-3 text-lg"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        جاري المعالجة...
                      </div>
                    ) : (
                      <>
                        متابعة الدفع - ${currentPlan.price} USDT
                        <ArrowLeft className="mr-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}

            {paymentStep === 2 && (
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-blue-600" />
                    إرسال الدفعة
                  </CardTitle>
                  <CardDescription>أرسل ${currentPlan.price} USDT إلى العنوان التالي</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Wallet Address */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <Label className="text-sm font-semibold text-gray-700 mb-2 block">عنوان المحفظة (TRC-20)</Label>
                    <div className="flex items-center gap-2 bg-white border rounded-lg p-3">
                      <code className="flex-1 text-sm font-mono break-all">{walletAddress}</code>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(walletAddress)}
                        className="flex-shrink-0 bg-transparent"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="text-center">
                    <div className="w-48 h-48 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <QrCode className="h-16 w-16 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600">امسح الكود للدفع السريع</p>
                  </div>

                  {/* Amount */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                    <p className="text-sm text-blue-700 mb-1">المبلغ المطلوب</p>
                    <p className="text-2xl font-bold text-blue-900">${currentPlan.price} USDT</p>
                  </div>

                  {/* Transaction Hash Input */}
                  <div>
                    <Label htmlFor="txHash" className="text-sm font-semibold mb-2 block">
                      رقم المعاملة (Transaction Hash)
                    </Label>
                    <Input
                      id="txHash"
                      value={transactionHash}
                      onChange={(e) => setTransactionHash(e.target.value)}
                      placeholder="أدخل رقم المعاملة بعد إرسال الدفعة"
                      className="bg-gray-50"
                    />
                    <p className="text-xs text-gray-500 mt-1">ستجد رقم المعاملة في محفظتك بعد إرسال الدفعة</p>
                  </div>

                  {/* Warning */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-yellow-800">
                        <p className="font-semibold mb-1">تنبيه مهم:</p>
                        <ul className="space-y-1">
                          <li>• أرسل المبلغ الدقيق فقط</li>
                          <li>• استخدم شبكة TRC-20 فقط</li>
                          <li>• التأكيد يستغرق 1-5 دقائق</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={() => setPaymentStep(1)} variant="outline" className="flex-1 bg-transparent">
                      رجوع
                    </Button>
                    <Button
                      onClick={handleConfirmPayment}
                      disabled={isProcessing || !transactionHash.trim()}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      {isProcessing ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          جاري التحقق...
                        </div>
                      ) : (
                        "تأكيد الدفع"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Support */}
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-0">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold text-gray-900 mb-2">تحتاج مساعدة؟</h3>
                <p className="text-gray-600 text-sm mb-4">فريق الدعم متاح 24/7 لمساعدتك</p>
                <div className="flex gap-2 justify-center">
                  <Button size="sm" variant="outline" className="bg-white">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    دردشة مباشرة
                  </Button>
                  <Button size="sm" variant="outline" className="bg-white">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    مركز المساعدة
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
