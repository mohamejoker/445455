"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  MessageCircle,
  Plus,
  Globe,
  Eye,
  Edit,
  Settings,
  BarChart3,
  Users,
  Clock,
  Copy,
  Zap,
  Crown,
  TrendingUp,
  Bell,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [user] = useState({
    name: "أحمد محمد",
    email: "ahmed@example.com",
    plan: "المتقدم",
    planExpiry: "2024-03-15",
    websitesUsed: 2,
    websitesLimit: 3,
    avatar: "/placeholder.svg?height=60&width=60&text=أحمد",
  })

  const [websites] = useState([
    {
      id: 1,
      title: "شركة النجاح للتكنولوجيا",
      domain: "najah-tech.chat2site.com",
      customDomain: "najah-tech.com",
      status: "published",
      visits: 1250,
      lastUpdated: "2024-01-20",
      template: "business",
      thumbnail: "/placeholder.svg?height=200&width=300&text=موقع+شركة",
    },
    {
      id: 2,
      title: "متجر الأناقة",
      domain: "elegance-store.chat2site.com",
      customDomain: null,
      status: "draft",
      visits: 0,
      lastUpdated: "2024-01-22",
      template: "ecommerce",
      thumbnail: "/placeholder.svg?height=200&width=300&text=متجر+إلكتروني",
    },
  ])

  const [stats] = useState({
    totalVisits: 1250,
    monthlyVisits: 450,
    conversionRate: 3.2,
    avgSessionTime: 2.5,
  })

  const [recentActivity] = useState([
    { id: 1, action: "تم نشر موقع شركة النجاح", time: "منذ ساعتين", type: "publish" },
    { id: 2, action: "تم تحديث متجر الأناقة", time: "منذ 5 ساعات", type: "update" },
    { id: 3, action: "زيارة جديدة لموقع شركة النجاح", time: "منذ يوم", type: "visit" },
    { id: 4, action: "تم إنشاء موقع جديد", time: "منذ يومين", type: "create" },
  ])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800 border-0">منشور</Badge>
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-800 border-0">مسودة</Badge>
      case "suspended":
        return <Badge className="bg-red-100 text-red-800 border-0">معلق</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-0">غير محدد</Badge>
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "publish":
        return <Globe className="h-4 w-4 text-green-600" />
      case "update":
        return <Edit className="h-4 w-4 text-blue-600" />
      case "visit":
        return <Eye className="h-4 w-4 text-purple-600" />
      case "create":
        return <Plus className="h-4 w-4 text-orange-600" />
      default:
        return <Bell className="h-4 w-4 text-gray-600" />
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("تم نسخ الرابط!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50" dir="rtl">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
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
              <Badge className="bg-purple-100 text-purple-800 border-0 px-3 py-1">
                <Crown className="h-3 w-3 mr-1" />
                {user.plan}
              </Badge>
              <div className="flex items-center gap-2">
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-medium text-gray-700">{user.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">مرحباً، {user.name}!</h2>
          <p className="text-gray-600">إليك نظرة عامة على مواقعك وإحصائياتك</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "إجمالي الزيارات",
              value: stats.totalVisits.toLocaleString(),
              change: "+12%",
              icon: <Eye className="h-6 w-6" />,
              color: "from-blue-500 to-blue-600",
              bgColor: "from-blue-50 to-blue-100",
            },
            {
              title: "الزيارات الشهرية",
              value: stats.monthlyVisits.toLocaleString(),
              change: "+8%",
              icon: <TrendingUp className="h-6 w-6" />,
              color: "from-green-500 to-green-600",
              bgColor: "from-green-50 to-green-100",
            },
            {
              title: "معدل التحويل",
              value: `${stats.conversionRate}%`,
              change: "+0.5%",
              icon: <BarChart3 className="h-6 w-6" />,
              color: "from-purple-500 to-purple-600",
              bgColor: "from-purple-50 to-purple-100",
            },
            {
              title: "متوسط الجلسة",
              value: `${stats.avgSessionTime} دقيقة`,
              change: "+15%",
              icon: <Clock className="h-6 w-6" />,
              color: "from-orange-500 to-orange-600",
              bgColor: "from-orange-50 to-orange-100",
            },
          ].map((stat, index) => (
            <Card
              key={index}
              className={`bg-gradient-to-br ${stat.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-white shadow-lg`}
                  >
                    {stat.icon}
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-0 font-bold">{stat.change}</Badge>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600 font-medium">{stat.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Plan Usage */}
        <Card className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">استخدام الخطة</h3>
                <p className="text-gray-600">
                  {user.websitesUsed} من {user.websitesLimit} مواقع مستخدمة
                </p>
              </div>
              <Badge className="bg-purple-100 text-purple-800 border-0 px-3 py-1">
                <Crown className="h-3 w-3 mr-1" />
                {user.plan}
              </Badge>
            </div>
            <Progress value={(user.websitesUsed / user.websitesLimit) * 100} className="mb-4" />
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">تنتهي في: {user.planExpiry}</p>
              <Link href="/pricing">
                <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
                  ترقية الخطة
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="websites" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-lg">
            <TabsTrigger value="websites" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              مواقعي
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              التحليلات
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              النشاط الأخير
            </TabsTrigger>
          </TabsList>

          {/* Websites Tab */}
          <TabsContent value="websites">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Mvcواقعي</h3>
              <Link href="/chat">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <Plus className="h-4 w-4 mr-2" />
                  إنشاء موقع جديد
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {websites.map((website) => (
                <Card
                  key={website.id}
                  className="group hover:shadow-xl transition-all duration-300 border-0 bg-white shadow-lg"
                >
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={website.thumbnail || "/placeholder.svg"}
                      alt={website.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">{getStatusBadge(website.status)}</div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                        <Button size="sm" variant="secondary">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="secondary">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-1">{website.title}</h4>
                        <p className="text-sm text-gray-600">آخر تحديث: {website.lastUpdated}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">النطاق:</span>
                          <div className="flex items-center gap-1">
                            <span className="font-mono text-xs">{website.domain}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(`https://${website.domain}`)}
                              className="p-1 h-auto"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        {website.customDomain && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">النطاق المخصص:</span>
                            <div className="flex items-center gap-1">
                              <span className="font-mono text-xs text-blue-600">{website.customDomain}</span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyToClipboard(`https://${website.customDomain}`)}
                                className="p-1 h-auto"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">الزيارات:</span>
                          <span className="font-bold text-blue-600">{website.visits.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Eye className="h-4 w-4 mr-2" />
                          معاينة
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Edit className="h-4 w-4 mr-2" />
                          تحرير
                        </Button>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Add New Website Card */}
              {user.websitesUsed < user.websitesLimit && (
                <Card className="border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors duration-300 bg-gray-50 hover:bg-blue-50">
                  <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[300px] text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4">
                      <Plus className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">إنشاء موقع جديد</h4>
                    <p className="text-gray-600 mb-4">ابدأ في إنشاء موقعك التالي بالذكاء الاصطناعي</p>
                    <Link href="/chat">
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                        ابدأ الآن
                        <Zap className="h-4 w-4 mr-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    إحصائيات الزيارات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">اليوم</span>
                      <span className="font-bold text-blue-600">45 زيارة</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">هذا الأسبوع</span>
                      <span className="font-bold text-green-600">320 زيارة</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">هذا الشهر</span>
                      <span className="font-bold text-purple-600">1,250 زيارة</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">إجمالي</span>
                      <span className="font-bold text-orange-600">5,430 زيارة</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    مصادر الزيارات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">البحث المباشر</span>
                      <span className="font-bold">45%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">وسائل التواصل</span>
                      <span className="font-bold">30%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">محركات البحث</span>
                      <span className="font-bold">20%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">مواقع أخرى</span>
                      <span className="font-bold">5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg border-0 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    أداء المواقع
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {websites.map((website) => (
                      <div key={website.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <img
                            src={website.thumbnail || "/placeholder.svg"}
                            alt={website.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">{website.title}</h4>
                            <p className="text-sm text-gray-600">{website.domain}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-blue-600">{website.visits.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">زيارة</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-orange-600" />
                  النشاط الأخير
                </CardTitle>
                <CardDescription>آخر الأنشطة على حسابك ومواقعك</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
