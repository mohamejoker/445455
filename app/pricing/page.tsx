"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { MessageCircle, Check, Zap, Crown, Rocket } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)

  const plans = [
    {
      name: "المبتدئ",
      icon: <Zap className="h-6 w-6" />,
      monthlyPrice: 10,
      yearlyPrice: 100,
      description: "مثالي للمشاريع الصغيرة والشخصية",
      features: [
        "موقع واحد",
        "نطاق فرعي مجاني",
        "5 صفحات",
        "دعم أساسي",
        "قوالب محدودة",
        "SSL مجاني",
        "نسخ احتياطي أسبوعي",
      ],
      limitations: ["بدون نطاق مخصص", "بدون تحليلات متقدمة"],
    },
    {
      name: "المتقدم",
      icon: <Crown className="h-6 w-6" />,
      monthlyPrice: 25,
      yearlyPrice: 250,
      description: "الأفضل للشركات الصغيرة والمتوسطة",
      popular: true,
      features: [
        "3 مواقع",
        "نطاق مخصص",
        "صفحات غير محدودة",
        "دعم متقدم",
        "جميع القوالب",
        "تحليلات مفصلة",
        "نسخ احتياطي يومي",
        "إزالة العلامة المائية",
        "دعم التجارة الإلكترونية",
      ],
      limitations: [],
    },
    {
      name: "الاحترافي",
      icon: <Rocket className="h-6 w-6" />,
      monthlyPrice: 50,
      yearlyPrice: 500,
      description: "للشركات الكبيرة والوكالات",
      features: [
        "مواقع غير محدودة",
        "نطاقات متعددة",
        "صفحات غير محدودة",
        "دعم أولوية 24/7",
        "قوالب مخصصة",
        "تحليلات متقدمة",
        "نسخ احتياطي فوري",
        "API مخصص",
        "تكامل متقدم",
        "مدير حساب مخصص",
      ],
      limitations: [],
    },
  ]

  const faqs = [
    {
      question: "كيف يتم الدفع؟",
      answer: "نقبل الدفع بعملة USDT فقط لضمان الأمان والسرعة في المعاملات.",
    },
    {
      question: "هل يمكنني تغيير الخطة لاحقاً؟",
      answer: "نعم، يمكنك ترقية أو تخفيض خطتك في أي وقت من لوحة التحكم.",
    },
    {
      question: "ما هي مدة إنشاء الموقع؟",
      answer: "معظم المواقع تكون جاهزة خلال 5-10 دقائق من بدء المحادثة.",
    },
    {
      question: "هل هناك ضمان استرداد؟",
      answer: "نعم، نوفر ضمان استرداد كامل خلال 30 يوم من تاريخ الشراء.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50" dir="rtl">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
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
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost">تسجيل الدخول</Button>
              </Link>
              <Link href="/chat">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600">ابدأ الآن</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-100">💰 أسعار شفافة بدون رسوم خفية</Badge>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            خطط تناسب جميع الاحتياجات
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            اختر الخطة المثالية لمشروعك. جميع الخطط تشمل الميزات الأساسية مع إمكانية الترقية في أي وقت
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-lg ${!isYearly ? "font-bold text-blue-600" : "text-gray-500"}`}>شهري</span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} className="data-[state=checked]:bg-blue-600" />
            <span className={`text-lg ${isYearly ? "font-bold text-blue-600" : "text-gray-500"}`}>سنوي</span>
            <Badge className="bg-green-100 text-green-800 mr-2">وفر 17%</Badge>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative transform hover:scale-105 transition-all duration-300 ${
                plan.popular
                  ? "border-2 border-blue-500 shadow-2xl bg-gradient-to-b from-blue-50 to-white"
                  : "border shadow-lg hover:shadow-xl"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2">
                    ⭐ الأكثر شعبية
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-blue-600">{plan.icon}</div>
                </div>
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="text-5xl font-bold text-blue-600 mb-2">
                  ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  <span className="text-lg text-gray-500 font-normal">/{isYearly ? "سنة" : "شهر"}</span>
                </div>
                {isYearly && (
                  <p className="text-sm text-green-600 font-medium">
                    وفر ${plan.monthlyPrice * 12 - plan.yearlyPrice} سنوياً
                  </p>
                )}
              </CardHeader>

              <CardContent>
                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-gray-900 border-b pb-2">الميزات المتضمنة:</h4>
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}

                  {plan.limitations.length > 0 && (
                    <>
                      <h4 className="font-semibold text-gray-900 border-b pb-2 mt-6">غير متضمن:</h4>
                      {plan.limitations.map((limitation, limitIndex) => (
                        <div key={limitIndex} className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-red-600 text-xs">✕</span>
                          </div>
                          <span className="text-gray-500">{limitation}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>

                <Link href="/chat">
                  <Button
                    className={`w-full py-3 text-lg font-medium transition-all duration-300 ${
                      plan.popular
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                        : "bg-gray-900 hover:bg-gray-800"
                    }`}
                  >
                    {plan.popular ? "ابدأ الآن" : "اختر هذه الخطة"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">مقارنة مفصلة للميزات</h2>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-right p-4 font-semibold">الميزة</th>
                    <th className="text-center p-4 font-semibold">المبتدئ</th>
                    <th className="text-center p-4 font-semibold">المتقدم</th>
                    <th className="text-center p-4 font-semibold">الاحترافي</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["عدد المواقع", "1", "3", "غير محدود"],
                    ["النطاقات المخصصة", "✕", "✓", "✓"],
                    ["عدد الصفحات", "5", "غير محدود", "غير محدود"],
                    ["التحليلات", "أساسية", "متقدمة", "احترافية"],
                    ["الدعم الفني", "بريد إلكتروني", "دردشة مباشرة", "24/7 أولوية"],
                    ["النسخ الاحتياطي", "أسبوعي", "يومي", "فوري"],
                    ["API مخصص", "✕", "✕", "✓"],
                    ["مدير حساب", "✕", "✕", "✓"],
                  ].map((row, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-4 font-medium">{row[0]}</td>
                      <td className="p-4 text-center">{row[1]}</td>
                      <td className="p-4 text-center">{row[2]}</td>
                      <td className="p-4 text-center">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">الأسئلة الشائعة</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">جاهز للبدء؟</h2>
          <p className="text-xl mb-8 opacity-90">ابدأ بإنشاء موقعك الآن ولا تدفع شيئاً حتى تكون راضياً تماماً</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/chat">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                ابدأ مجاناً
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                تحدث مع المبيعات
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
