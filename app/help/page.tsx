"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MessageCircle,
  Search,
  BookOpen,
  Video,
  MessageSquare,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  HelpCircle,
  Zap,
  Globe,
  Palette,
  CreditCard,
} from "lucide-react"
import Link from "next/link"

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const faqs = [
    {
      category: "البداية",
      icon: <Zap className="h-5 w-5" />,
      questions: [
        {
          q: "كيف أبدأ في إنشاء موقعي الأول؟",
          a: "ببساطة اضغط على 'ابدأ الآن' وابدأ المحادثة مع الذكاء الاصطناعي. أخبره عن نوع الموقع الذي تريده وسيقوم بإرشادك خطوة بخطوة.",
        },
        {
          q: "كم من الوقت يستغرق إنشاء الموقع؟",
          a: "معظم المواقع تكون جاهزة خلال 5-10 دقائق من بدء المحادثة، حسب تعقيد المتطلبات.",
        },
        {
          q: "هل أحتاج لخبرة تقنية؟",
          a: "لا على الإطلاق! المنصة مصممة للجميع. فقط تحدث مع الذكاء الاصطناعي بلغة طبيعية.",
        },
      ],
    },
    {
      category: "التصميم",
      icon: <Palette className="h-5 w-5" />,
      questions: [
        {
          q: "هل يمكنني تخصيص تصميم موقعي؟",
          a: "نعم، يمكنك تعديل الألوان والخطوط والتخطيط من خلال المحادثة مع الذكاء الاصطناعي أو من لوحة التحكم.",
        },
        {
          q: "كم عدد القوالب المتاحة؟",
          a: "لدينا أكثر من 50 قالب احترافي يغطي جميع أنواع المواقع، مع إضافة قوالب جديدة شهرياً.",
        },
        {
          q: "هل المواقع متجاوبة مع الهواتف؟",
          a: "نعم، جميع المواقع مصممة لتعمل بشكل مثالي على جميع الأجهزة والشاشات.",
        },
      ],
    },
    {
      category: "النطاقات",
      icon: <Globe className="h-5 w-5" />,
      questions: [
        {
          q: "هل أحصل على نطاق مجاني؟",
          a: "نعم، تحصل على نطاق فرعي مجاني مثل yoursite.chat2site.com مع جميع الخطط.",
        },
        {
          q: "كيف أربط نطاقي الخاص؟",
          a: "من لوحة التحكم، اذهب إلى 'النطاقات' واتبع التعليمات لربط نطاقك المخصص.",
        },
        {
          q: "هل يمكنني تغيير النطاق لاحقاً؟",
          a: "نعم، يمكنك تغيير النطاق الفرعي مرة واحدة مجاناً، والتغييرات الإضافية برسوم رمزية.",
        },
      ],
    },
    {
      category: "الدفع",
      icon: <CreditCard className="h-5 w-5" />,
      questions: [
        {
          q: "لماذا USDT فقط؟",
          a: "نستخدم USDT لضمان الأمان والسرعة في المعاملات، وتجنب رسوم البنوك التقليدية.",
        },
        {
          q: "هل هناك ضمان استرداد؟",
          a: "نعم، نوفر ضمان استرداد كامل خلال 30 يوم من تاريخ الشراء إذا لم تكن راضياً.",
        },
        {
          q: "متى يتم تجديد الاشتراك؟",
          a: "يتم التجديد تلقائياً كل شهر، ويمكنك إلغاء التجديد التلقائي في أي وقت.",
        },
      ],
    },
  ]

  const tutorials = [
    {
      title: "إنشاء موقعك الأول",
      description: "دليل شامل لإنشاء موقع احترافي في دقائق",
      duration: "8 دقائق",
      type: "فيديو",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "تخصيص التصميم",
      description: "كيفية تعديل الألوان والخطوط والتخطيط",
      duration: "5 دقائق",
      type: "فيديو",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "ربط النطاق المخصص",
      description: "خطوات ربط نطاقك الشخصي بموقعك",
      duration: "3 دقائق",
      type: "مقال",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "إعداد متجر إلكتروني",
      description: "دليل إنشاء متجر إلكتروني متكامل",
      duration: "12 دقيقة",
      type: "فيديو",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
  ]

  const filteredFaqs = faqs
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (faq) =>
          faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.a.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="border-b bg-white">
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

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">مركز المساعدة</h1>
          <p className="text-xl text-gray-600 mb-8">كل ما تحتاج لمعرفته عن Chat2Site</p>

          {/* Search */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="ابحث عن إجابة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-12 py-3 text-lg"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">دردشة مباشرة</h3>
              <p className="text-gray-600 mb-4">تحدث مع فريق الدعم مباشرة</p>
              <Badge className="bg-green-100 text-green-800">متاح الآن</Badge>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">البريد الإلكتروني</h3>
              <p className="text-gray-600 mb-4">أرسل استفسارك عبر البريد</p>
              <Badge variant="secondary">الرد خلال 24 ساعة</Badge>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">الهاتف</h3>
              <p className="text-gray-600 mb-4">اتصل بنا للدعم العاجل</p>
              <Badge variant="outline">للعملاء المميزين</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="faq" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              الأسئلة الشائعة
            </TabsTrigger>
            <TabsTrigger value="tutorials" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              الدروس التعليمية
            </TabsTrigger>
            <TabsTrigger value="guides" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              الأدلة
            </TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="space-y-8">
            {filteredFaqs.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                    {category.icon}
                  </div>
                  <h2 className="text-2xl font-bold">{category.category}</h2>
                </div>

                <div className="space-y-4">
                  {category.questions.map((faq, faqIndex) => (
                    <Card key={faqIndex} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          {faq.q}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="tutorials" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {tutorials.map((tutorial, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative">
                    <img
                      src={tutorial.thumbnail || "/placeholder.svg"}
                      alt={tutorial.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className={tutorial.type === "فيديو" ? "bg-red-500" : "bg-blue-500"}>
                        {tutorial.type === "فيديو" ? "📹" : "📖"} {tutorial.type}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <Badge variant="secondary" className="bg-black/70 text-white">
                        <Clock className="h-3 w-3 mr-1" />
                        {tutorial.duration}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{tutorial.title}</h3>
                    <p className="text-gray-600">{tutorial.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="guides" className="space-y-6">
            <div className="grid gap-6">
              {[
                {
                  title: "دليل البداية السريعة",
                  description: "كل ما تحتاج لمعرفته للبدء مع Chat2Site",
                  sections: ["إنشاء الحساب", "الموقع الأول", "النشر", "الإدارة"],
                  readTime: "10 دقائق",
                },
                {
                  title: "دليل التصميم المتقدم",
                  description: "تعلم كيفية إنشاء تصاميم احترافية ومخصصة",
                  sections: ["الألوان والخطوط", "التخطيط", "الصور", "التفاعل"],
                  readTime: "15 دقيقة",
                },
                {
                  title: "دليل التجارة الإلكترونية",
                  description: "إنشاء وإدارة متجرك الإلكتروني بنجاح",
                  sections: ["إعداد المتجر", "المنتجات", "الدفع", "الشحن"],
                  readTime: "20 دقيقة",
                },
              ].map((guide, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">{guide.title}</CardTitle>
                        <CardDescription className="mt-2">{guide.description}</CardDescription>
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {guide.readTime}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {guide.sections.map((section, sectionIndex) => (
                        <Badge key={sectionIndex} variant="secondary" className="text-xs">
                          {section}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">لم تجد ما تبحث عنه؟</h2>
          <p className="text-xl mb-8 opacity-90">فريق الدعم جاهز لمساعدتك في أي وقت</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              <MessageSquare className="h-5 w-5 mr-2" />
              دردشة مباشرة
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <Mail className="h-5 w-5 mr-2" />
              إرسال بريد
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
