"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Eye, Heart, Star, Filter } from "lucide-react"
import Link from "next/link"
import LazyImage from "@/components/optimized/LazyImage"
import SearchWithDebounce from "@/components/optimized/SearchWithDebounce"

export default function TemplatesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("الكل")

  const categories = ["الكل", "أعمال", "تجارة إلكترونية", "مطاعم", "شخصي", "تعليمي", "صحي", "تقني"]

  const templates = [
    {
      id: 1,
      name: "شركة حديثة",
      category: "أعمال",
      description: "قالب احترافي للشركات والمؤسسات",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.9,
      uses: 1250,
      tags: ["احترافي", "نظيف", "متجاوب"],
      featured: true,
    },
    {
      id: 2,
      name: "متجر أنيق",
      category: "تجارة إلكترونية",
      description: "قالب متجر إلكتروني بتصميم عصري",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.8,
      uses: 890,
      tags: ["تجارة", "أنيق", "سهل الاستخدام"],
    },
    {
      id: 3,
      name: "مطعم فاخر",
      category: "مطاعم",
      description: "قالب مثالي للمطاعم والكافيهات",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.7,
      uses: 650,
      tags: ["طعام", "فاخر", "جذاب"],
    },
    {
      id: 4,
      name: "معرض إبداعي",
      category: "شخصي",
      description: "قالب لعرض الأعمال الفنية والإبداعية",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.9,
      uses: 420,
      tags: ["إبداعي", "معرض", "فني"],
    },
    {
      id: 5,
      name: "منصة تعليمية",
      category: "تعليمي",
      description: "قالب للمؤسسات التعليمية والدورات",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.6,
      uses: 380,
      tags: ["تعليم", "دورات", "تفاعلي"],
    },
    {
      id: 6,
      name: "عيادة طبية",
      category: "صحي",
      description: "قالب للعيادات والمراكز الطبية",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.8,
      uses: 290,
      tags: ["طبي", "نظيف", "موثوق"],
    },
    {
      id: 7,
      name: "شركة تقنية",
      category: "تقني",
      description: "قالب للشركات التقنية والبرمجية",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.9,
      uses: 520,
      tags: ["تقني", "حديث", "مبتكر"],
      featured: true,
    },
    {
      id: 8,
      name: "مدونة شخصية",
      category: "شخصي",
      description: "قالب بسيط وأنيق للمدونات الشخصية",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.5,
      uses: 750,
      tags: ["مدونة", "بسيط", "شخصي"],
    },
    {
      id: 9,
      name: "وكالة إعلانية",
      category: "أعمال",
      description: "قالب للوكالات الإعلانية والتسويقية",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.7,
      uses: 340,
      tags: ["إعلان", "إبداعي", "تسويق"],
    },
  ]

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "الكل" || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
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
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            قوالب احترافية جاهزة
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            اختر من مجموعة واسعة من القوالب المصممة بعناية لجميع أنواع المواقع
          </p>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto mb-8">
            <div className="relative flex-1">
              <SearchWithDebounce onSearch={setSearchTerm} placeholder="ابحث عن قالب..." className="flex-1" />
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Templates */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-500" />
            القوالب المميزة
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {templates
              .filter((t) => t.featured)
              .map((template) => (
                <Card key={template.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="relative">
                    <LazyImage
                      src={template.image || "/placeholder.svg?height=300&width=400"}
                      alt={template.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-yellow-500 text-white">⭐ مميز</Badge>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                        <Button size="sm" variant="secondary">
                          <Eye className="h-4 w-4 mr-2" />
                          معاينة
                        </Button>
                        <Button size="sm">استخدم هذا القالب</Button>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold">{template.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{template.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{template.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {template.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">{template.uses.toLocaleString()} استخدام</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* All Templates */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">جميع القوالب</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Filter className="h-4 w-4" />
              {filteredTemplates.length} قالب
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <div className="relative">
                  <LazyImage
                    src={template.image || "/placeholder.svg?height=300&width=400"}
                    alt={template.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-white/90">
                      {template.category}
                    </Badge>
                  </div>
                  <div className="absolute top-3 left-3">
                    <Button size="sm" variant="ghost" className="bg-white/90 hover:bg-white p-2">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                      <Button size="sm" variant="secondary">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Link href="/chat">
                        <Button size="sm">استخدم</Button>
                      </Link>
                    </div>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold">{template.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs">{template.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{template.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {template.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">{template.uses} استخدام</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">لم تجد القالب المناسب؟</h2>
          <p className="text-xl mb-8 opacity-90">تحدث مع الذكاء الاصطناعي لإنشاء قالب مخصص يناسب احتياجاتك تماماً</p>
          <Link href="/chat">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              إنشاء قالب مخصص
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
