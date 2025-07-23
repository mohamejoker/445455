"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Settings,
  Palette,
  DollarSign,
  MessageCircle,
  Save,
  Upload,
  Download,
  Trash2,
  Plus,
  BarChart3,
  Bell,
  Mail,
  Zap,
} from "lucide-react"

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    general: {
      siteName: "Chat2Site",
      siteDescription: "منصة إنشاء المواقع بالذكاء الاصطناعي",
      contactEmail: "admin@chat2site.com",
      supportEmail: "support@chat2site.com",
      language: "ar",
      timezone: "Asia/Riyadh",
    },
    design: {
      primaryColor: "#3B82F6",
      secondaryColor: "#8B5CF6",
      accentColor: "#10B981",
      backgroundColor: "#F8FAFC",
      fontFamily: "Cairo",
      logoUrl: "/logo.png",
    },
    pricing: {
      basicPrice: 10,
      basicOriginalPrice: 15,
      proPrice: 25,
      proOriginalPrice: 35,
      enterprisePrice: 50,
      enterpriseOriginalPrice: 70,
      currency: "USD",
      discountEnabled: true,
    },
    stats: {
      totalWebsites: 15000,
      totalUsers: 8500,
      uptime: 99.9,
      avgCreationTime: 3.5,
      satisfaction: 98.5,
      countries: 45,
    },
    bot: {
      welcomeMessage: "مرحباً! كيف يمكنني مساعدتك في إنشاء موقعك؟",
      helpMessage: "يمكنني مساعدتك في إنشاء موقع احترافي في دقائق",
      errorMessage: "عذراً، حدث خطأ. يرجى المحاولة مرة أخرى",
      responseDelay: 1000,
      enableTyping: true,
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      marketingEmails: true,
    },
  })

  const [plans, setPlans] = useState([
    {
      id: 1,
      name: "الأساسي",
      price: 10,
      originalPrice: 15,
      features: ["موقع واحد", "نطاق فرعي", "دعم أساسي", "SSL مجاني"],
      popular: false,
      enabled: true,
    },
    {
      id: 2,
      name: "المتقدم",
      price: 25,
      originalPrice: 35,
      features: ["3 مواقع", "نطاق مخصص", "دعم متقدم", "تحليلات", "نسخ احتياطي"],
      popular: true,
      enabled: true,
    },
    {
      id: 3,
      name: "الاحترافي",
      price: 50,
      originalPrice: 70,
      features: ["مواقع غير محدودة", "نطاقات متعددة", "دعم أولوية", "API", "تخصيص كامل"],
      popular: false,
      enabled: true,
    },
  ])

  const [newFeature, setNewFeature] = useState("")
  const [editingPlan, setEditingPlan] = useState<number | null>(null)

  const handleSaveSettings = () => {
    // Save settings logic here
    console.log("Settings saved:", settings)
    alert("تم حفظ الإعدادات بنجاح!")
  }

  const handleExportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = "chat2site-settings.json"

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const handleImportSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target?.result as string)
          setSettings(importedSettings)
          alert("تم استيراد الإعدادات بنجاح!")
        } catch (error) {
          alert("خطأ في استيراد الإعدادات!")
        }
      }
      reader.readAsText(file)
    }
  }

  const addFeatureToPlan = (planId: number) => {
    if (newFeature.trim()) {
      setPlans(
        plans.map((plan) => (plan.id === planId ? { ...plan, features: [...plan.features, newFeature.trim()] } : plan)),
      )
      setNewFeature("")
    }
  }

  const removeFeatureFromPlan = (planId: number, featureIndex: number) => {
    setPlans(
      plans.map((plan) =>
        plan.id === planId ? { ...plan, features: plan.features.filter((_, index) => index !== featureIndex) } : plan,
      ),
    )
  }

  const togglePlanPopular = (planId: number) => {
    setPlans(
      plans.map((plan) => ({
        ...plan,
        popular: plan.id === planId ? !plan.popular : false,
      })),
    )
  }

  const updatePlanPrice = (planId: number, field: string, value: number) => {
    setPlans(plans.map((plan) => (plan.id === planId ? { ...plan, [field]: value } : plan)))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">إعدادات النظام</h1>
            <p className="text-lg text-gray-600">تحكم كامل في جميع جوانب المنصة</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleExportSettings} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              تصدير الإعدادات
            </Button>
            <label htmlFor="import-settings">
              <Button variant="outline" className="cursor-pointer bg-transparent">
                <Upload className="h-4 w-4 mr-2" />
                استيراد الإعدادات
              </Button>
              <input
                id="import-settings"
                type="file"
                accept=".json"
                onChange={handleImportSettings}
                className="hidden"
              />
            </label>
            <Button onClick={handleSaveSettings} className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Save className="h-4 w-4 mr-2" />
              حفظ التغييرات
            </Button>
          </div>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white shadow-lg">
            <TabsTrigger value="general" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Settings className="h-4 w-4 mr-2" />
              عام
            </TabsTrigger>
            <TabsTrigger value="design" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Palette className="h-4 w-4 mr-2" />
              التصميم
            </TabsTrigger>
            <TabsTrigger value="pricing" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <DollarSign className="h-4 w-4 mr-2" />
              الأسعار
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <BarChart3 className="h-4 w-4 mr-2" />
              الإحصائيات
            </TabsTrigger>
            <TabsTrigger value="bot" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <MessageCircle className="h-4 w-4 mr-2" />
              البوت
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Bell className="h-4 w-4 mr-2" />
              الإشعارات
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-blue-600" />
                  الإعدادات العامة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">اسم الموقع</Label>
                    <Input
                      id="siteName"
                      value={settings.general.siteName}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          general: { ...settings.general, siteName: e.target.value },
                        })
                      }
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">البريد الإلكتروني</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={settings.general.contactEmail}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          general: { ...settings.general, contactEmail: e.target.value },
                        })
                      }
                      className="bg-gray-50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">وصف الموقع</Label>
                  <Textarea
                    id="siteDescription"
                    value={settings.general.siteDescription}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        general: { ...settings.general, siteDescription: e.target.value },
                      })
                    }
                    className="bg-gray-50"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="language">اللغة</Label>
                    <Select
                      value={settings.general.language}
                      onValueChange={(value) =>
                        setSettings({
                          ...settings,
                          general: { ...settings.general, language: value },
                        })
                      }
                    >
                      <SelectTrigger className="bg-gray-50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ar">العربية</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">المنطقة الزمنية</Label>
                    <Select
                      value={settings.general.timezone}
                      onValueChange={(value) =>
                        setSettings({
                          ...settings,
                          general: { ...settings.general, timezone: value },
                        })
                      }
                    >
                      <SelectTrigger className="bg-gray-50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Riyadh">الرياض</SelectItem>
                        <SelectItem value="Asia/Dubai">دبي</SelectItem>
                        <SelectItem value="Africa/Cairo">القاهرة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Design Settings */}
          <TabsContent value="design">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-purple-600" />
                  إعدادات التصميم
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">اللون الأساسي</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={settings.design.primaryColor}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            design: { ...settings.design, primaryColor: e.target.value },
                          })
                        }
                        className="w-16 h-10 p-1 bg-gray-50"
                      />
                      <Input
                        value={settings.design.primaryColor}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            design: { ...settings.design, primaryColor: e.target.value },
                          })
                        }
                        className="flex-1 bg-gray-50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">اللون الثانوي</Label>
                    <div className="flex gap-2">
                      <Input
                        id="secondaryColor"
                        type="color"
                        value={settings.design.secondaryColor}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            design: { ...settings.design, secondaryColor: e.target.value },
                          })
                        }
                        className="w-16 h-10 p-1 bg-gray-50"
                      />
                      <Input
                        value={settings.design.secondaryColor}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            design: { ...settings.design, secondaryColor: e.target.value },
                          })
                        }
                        className="flex-1 bg-gray-50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accentColor">لون التمييز</Label>
                    <div className="flex gap-2">
                      <Input
                        id="accentColor"
                        type="color"
                        value={settings.design.accentColor}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            design: { ...settings.design, accentColor: e.target.value },
                          })
                        }
                        className="w-16 h-10 p-1 bg-gray-50"
                      />
                      <Input
                        value={settings.design.accentColor}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            design: { ...settings.design, accentColor: e.target.value },
                          })
                        }
                        className="flex-1 bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fontFamily">نوع الخط</Label>
                    <Select
                      value={settings.design.fontFamily}
                      onValueChange={(value) =>
                        setSettings({
                          ...settings,
                          design: { ...settings.design, fontFamily: value },
                        })
                      }
                    >
                      <SelectTrigger className="bg-gray-50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cairo">Cairo</SelectItem>
                        <SelectItem value="Tajawal">Tajawal</SelectItem>
                        <SelectItem value="Amiri">Amiri</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logoUrl">رابط الشعار</Label>
                    <Input
                      id="logoUrl"
                      value={settings.design.logoUrl}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          design: { ...settings.design, logoUrl: e.target.value },
                        })
                      }
                      className="bg-gray-50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pricing Settings */}
          <TabsContent value="pricing">
            <div className="space-y-6">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    إدارة خطط الأسعار
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((plan) => (
                      <Card
                        key={plan.id}
                        className={`border-2 ${plan.popular ? "border-purple-500 bg-purple-50" : "border-gray-200"}`}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold">{plan.name}</h3>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant={plan.popular ? "default" : "outline"}
                                onClick={() => togglePlanPopular(plan.id)}
                              >
                                {plan.popular ? "شعبي" : "عادي"}
                              </Button>
                              <Switch
                                checked={plan.enabled}
                                onCheckedChange={(checked) =>
                                  setPlans(plans.map((p) => (p.id === plan.id ? { ...p, enabled: checked } : p)))
                                }
                              />
                            </div>
                          </div>

                          <div className="space-y-3 mb-4">
                            <div className="flex gap-2">
                              <Input
                                type="number"
                                value={plan.price}
                                onChange={(e) => updatePlanPrice(plan.id, "price", Number(e.target.value))}
                                className="bg-gray-50"
                                placeholder="السعر"
                              />
                              <Input
                                type="number"
                                value={plan.originalPrice}
                                onChange={(e) => updatePlanPrice(plan.id, "originalPrice", Number(e.target.value))}
                                className="bg-gray-50"
                                placeholder="السعر الأصلي"
                              />
                            </div>
                          </div>

                          <div className="space-y-2 mb-4">
                            <Label>الميزات:</Label>
                            {plan.features.map((feature, index) => (
                              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                <span className="text-sm">{feature}</span>
                                <Button size="sm" variant="ghost" onClick={() => removeFeatureFromPlan(plan.id, index)}>
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>

                          <div className="flex gap-2">
                            <Input
                              value={newFeature}
                              onChange={(e) => setNewFeature(e.target.value)}
                              placeholder="ميزة جديدة"
                              className="bg-gray-50"
                            />
                            <Button size="sm" onClick={() => addFeatureToPlan(plan.id)}>
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Stats Settings */}
          <TabsContent value="stats">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  إعدادات الإحصائيات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="totalWebsites">إجمالي المواقع</Label>
                    <Input
                      id="totalWebsites"
                      type="number"
                      value={settings.stats.totalWebsites}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          stats: { ...settings.stats, totalWebsites: Number(e.target.value) },
                        })
                      }
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalUsers">إجمالي المستخدمين</Label>
                    <Input
                      id="totalUsers"
                      type="number"
                      value={settings.stats.totalUsers}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          stats: { ...settings.stats, totalUsers: Number(e.target.value) },
                        })
                      }
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="uptime">وقت التشغيل (%)</Label>
                    <Input
                      id="uptime"
                      type="number"
                      step="0.1"
                      value={settings.stats.uptime}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          stats: { ...settings.stats, uptime: Number(e.target.value) },
                        })
                      }
                      className="bg-gray-50"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="avgCreationTime">متوسط وقت الإنشاء (دقائق)</Label>
                    <Input
                      id="avgCreationTime"
                      type="number"
                      step="0.1"
                      value={settings.stats.avgCreationTime}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          stats: { ...settings.stats, avgCreationTime: Number(e.target.value) },
                        })
                      }
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="satisfaction">رضا العملاء (%)</Label>
                    <Input
                      id="satisfaction"
                      type="number"
                      step="0.1"
                      value={settings.stats.satisfaction}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          stats: { ...settings.stats, satisfaction: Number(e.target.value) },
                        })
                      }
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="countries">عدد الدول</Label>
                    <Input
                      id="countries"
                      type="number"
                      value={settings.stats.countries}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          stats: { ...settings.stats, countries: Number(e.target.value) },
                        })
                      }
                      className="bg-gray-50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bot Settings */}
          <TabsContent value="bot">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-purple-600" />
                  إعدادات البوت
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="welcomeMessage">رسالة الترحيب</Label>
                    <Textarea
                      id="welcomeMessage"
                      value={settings.bot.welcomeMessage}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          bot: { ...settings.bot, welcomeMessage: e.target.value },
                        })
                      }
                      className="bg-gray-50"
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="helpMessage">رسالة المساعدة</Label>
                    <Textarea
                      id="helpMessage"
                      value={settings.bot.helpMessage}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          bot: { ...settings.bot, helpMessage: e.target.value },
                        })
                      }
                      className="bg-gray-50"
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="errorMessage">رسالة الخطأ</Label>
                    <Textarea
                      id="errorMessage"
                      value={settings.bot.errorMessage}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          bot: { ...settings.bot, errorMessage: e.target.value },
                        })
                      }
                      className="bg-gray-50"
                      rows={2}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="responseDelay">تأخير الرد (مللي ثانية)</Label>
                    <Input
                      id="responseDelay"
                      type="number"
                      value={settings.bot.responseDelay}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          bot: { ...settings.bot, responseDelay: Number(e.target.value) },
                        })
                      }
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="enableTyping"
                      checked={settings.bot.enableTyping}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          bot: { ...settings.bot, enableTyping: checked },
                        })
                      }
                    />
                    <Label htmlFor="enableTyping">تفعيل مؤشر الكتابة</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-orange-600" />
                  إعدادات الإشعارات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <div>
                        <h4 className="font-medium">إشعارات البريد الإلكتروني</h4>
                        <p className="text-sm text-gray-600">تلقي إشعارات عبر البريد الإلكتروني</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.notifications.emailNotifications}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, emailNotifications: checked },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <MessageCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <h4 className="font-medium">إشعارات SMS</h4>
                        <p className="text-sm text-gray-600">تلقي إشعارات عبر الرسائل النصية</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.notifications.smsNotifications}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, smsNotifications: checked },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-purple-600" />
                      <div>
                        <h4 className="font-medium">الإشعارات الفورية</h4>
                        <p className="text-sm text-gray-600">تلقي إشعارات فورية في المتصفح</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.notifications.pushNotifications}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, pushNotifications: checked },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-yellow-600" />
                      <div>
                        <h4 className="font-medium">رسائل التسويق</h4>
                        <p className="text-sm text-gray-600">تلقي رسائل تسويقية وعروض خاصة</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.notifications.marketingEmails}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, marketingEmails: checked },
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
