"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Globe,
  DollarSign,
  TrendingUp,
  MessageCircle,
  Settings,
  BarChart3,
  Activity,
  Clock,
  Shield,
  Star,
  Zap,
  Target,
  Award,
  Eye,
  Upload,
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 8500,
    totalWebsites: 15000,
    monthlyRevenue: 125000,
    activeChats: 245,
    conversionRate: 12.5,
    avgSessionTime: 8.3,
    customerSatisfaction: 98.5,
    serverUptime: 99.9,
  })

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: "website_created", user: "أحمد محمد", time: "منذ 5 دقائق", status: "success" },
    { id: 2, type: "payment_completed", user: "فاطمة السعيد", time: "منذ 12 دقيقة", status: "success" },
    { id: 3, type: "chat_started", user: "خالد العتيبي", time: "منذ 18 دقيقة", status: "active" },
    { id: 4, type: "website_published", user: "سارة أحمد", time: "منذ 25 دقيقة", status: "success" },
    { id: 5, type: "support_ticket", user: "محمد علي", time: "منذ 32 دقيقة", status: "pending" },
  ])

  const [topTemplates, setTopTemplates] = useState([
    { name: "موقع شركة", usage: 2500, growth: "+15%" },
    { name: "متجر إلكتروني", usage: 1800, growth: "+22%" },
    { name: "مدونة شخصية", usage: 1200, growth: "+8%" },
    { name: "صفحة هبوط", usage: 950, growth: "+18%" },
    { name: "معرض أعمال", usage: 750, growth: "+12%" },
  ])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "website_created":
        return <Globe className="h-4 w-4 text-blue-600" />
      case "payment_completed":
        return <DollarSign className="h-4 w-4 text-green-600" />
      case "chat_started":
        return <MessageCircle className="h-4 w-4 text-purple-600" />
      case "website_published":
        return <Upload className="h-4 w-4 text-emerald-600" />
      case "support_ticket":
        return <Settings className="h-4 w-4 text-orange-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800 border-0">مكتمل</Badge>
      case "active":
        return <Badge className="bg-blue-100 text-blue-800 border-0">نشط</Badge>
      case "pending":
        return <Badge className="bg-orange-100 text-orange-800 border-0">معلق</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-0">غير محدد</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">لوحة التحكم الإدارية</h1>
            <p className="text-lg text-gray-600">مرحباً بك في نظام إدارة Chat2Site</p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/settings">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Settings className="h-4 w-4 mr-2" />
                الإعدادات
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                عرض الموقع
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "إجمالي المستخدمين",
              value: stats.totalUsers.toLocaleString(),
              change: "+12.5%",
              icon: <Users className="h-6 w-6" />,
              color: "from-blue-500 to-blue-600",
              bgColor: "from-blue-50 to-blue-100",
            },
            {
              title: "المواقع المنشأة",
              value: stats.totalWebsites.toLocaleString(),
              change: "+18.2%",
              icon: <Globe className="h-6 w-6" />,
              color: "from-green-500 to-green-600",
              bgColor: "from-green-50 to-green-100",
            },
            {
              title: "الإيرادات الشهرية",
              value: `$${stats.monthlyRevenue.toLocaleString()}`,
              change: "+25.8%",
              icon: <DollarSign className="h-6 w-6" />,
              color: "from-purple-500 to-purple-600",
              bgColor: "from-purple-50 to-purple-100",
            },
            {
              title: "المحادثات النشطة",
              value: stats.activeChats.toString(),
              change: "+8.3%",
              icon: <MessageCircle className="h-6 w-6" />,
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

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "معدل التحويل",
              value: `${stats.conversionRate}%`,
              icon: <Target className="h-5 w-5" />,
              color: "text-blue-600",
            },
            {
              title: "متوسط وقت الجلسة",
              value: `${stats.avgSessionTime} دقيقة`,
              icon: <Clock className="h-5 w-5" />,
              color: "text-green-600",
            },
            {
              title: "رضا العملاء",
              value: `${stats.customerSatisfaction}%`,
              icon: <Star className="h-5 w-5" />,
              color: "text-yellow-600",
            },
            {
              title: "وقت التشغيل",
              value: `${stats.serverUptime}%`,
              icon: <Shield className="h-5 w-5" />,
              color: "text-purple-600",
            },
          ].map((metric, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className={`w-10 h-10 ${metric.color} mx-auto mb-3 flex items-center justify-center`}>
                  {metric.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{metric.value}</h3>
                <p className="text-gray-600 text-sm">{metric.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="activity" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-lg">
            <TabsTrigger value="activity" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              النشاط الحديث
            </TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              القوالب الشائعة
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              التحليلات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="activity">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  النشاط الحديث
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-center gap-3">
                        {getActivityIcon(activity.type)}
                        <div>
                          <p className="font-medium text-gray-900">{activity.user}</p>
                          <p className="text-sm text-gray-600">{activity.time}</p>
                        </div>
                      </div>
                      {getStatusBadge(activity.status)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  القوالب الأكثر استخداماً
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topTemplates.map((template, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{template.name}</p>
                          <p className="text-sm text-gray-600">{template.usage.toLocaleString()} استخدام</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-0">{template.growth}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    إحصائيات الأداء
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">معدل النمو الشهري</span>
                      <span className="font-bold text-green-600">+23.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">متوسط قيمة العميل</span>
                      <span className="font-bold text-blue-600">$45</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">معدل الاحتفاظ</span>
                      <span className="font-bold text-purple-600">87.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">متوسط وقت الإنشاء</span>
                      <span className="font-bold text-orange-600">3.5 دقيقة</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-600" />
                    إنجازات المنصة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center">
                        <Award className="h-4 w-4 text-yellow-600" />
                      </div>
                      <span className="text-gray-700">أفضل منصة إنشاء مواقع 2024</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Star className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="text-gray-700">تقييم 4.9/5 من العملاء</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Zap className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-gray-700">أسرع منصة في السوق</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Shield className="h-4 w-4 text-purple-600" />
                      </div>
                      <span className="text-gray-700">أعلى معايير الأمان</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
