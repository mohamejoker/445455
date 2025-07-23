"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, Bot, User, Eye, Code, Palette, Globe, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  websitePreview?: {
    title: string
    description: string
    template: string
    colors: string[]
  }
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "مرحباً! أنا مساعدك الذكي لإنشاء المواقع. دعني أساعدك في بناء موقع رائع. ما نوع الموقع الذي تريد إنشاءه؟",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [websiteData, setWebsiteData] = useState({
    type: "",
    title: "",
    description: "",
    colors: ["#3B82F6", "#8B5CF6"],
    template: "modern",
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      let botResponse = ""
      let preview = null

      if (currentStep === 1) {
        botResponse = "رائع! أفهم أنك تريد إنشاء " + inputValue + ". الآن، ما اسم موقعك أو شركتك؟"
        setWebsiteData((prev) => ({ ...prev, type: inputValue }))
        setCurrentStep(2)
      } else if (currentStep === 2) {
        botResponse = "ممتاز! " + inputValue + " اسم جميل. الآن أخبرني بوصف مختصر عن موقعك أو خدماتك؟"
        setWebsiteData((prev) => ({ ...prev, title: inputValue }))
        setCurrentStep(3)
      } else if (currentStep === 3) {
        botResponse = "رائع! الآن سأبدأ في إنشاء موقعك. يمكنك مشاهدة المعاينة على اليمين."
        setWebsiteData((prev) => ({ ...prev, description: inputValue }))
        preview = {
          title: websiteData.title,
          description: inputValue,
          template: "modern",
          colors: ["#3B82F6", "#8B5CF6"],
        }
        setCurrentStep(4)
      } else {
        botResponse = "يمكنني مساعدتك في تعديل التصميم أو المحتوى. ما الذي تريد تغييره؟"
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: botResponse,
        timestamp: new Date(),
        websitePreview: preview,
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickActions = ["موقع شركة", "متجر إلكتروني", "مدونة شخصية", "موقع مطعم", "معرض أعمال", "موقع خدمات"]

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold">Chat2Site</h1>
            </Link>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                متصل
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-120px)]">
          {/* Chat Section */}
          <Card className="flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-blue-600" />
                مساعد إنشاء المواقع
              </CardTitle>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                ></div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  الخطوة {currentStep} من 4
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex gap-3 max-w-[80%] ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.type === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                          }`}
                        >
                          {message.type === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                        </div>
                        <div
                          className={`rounded-2xl px-4 py-3 ${
                            message.type === "user" ? "bg-blue-600 text-white" : "bg-white border shadow-sm"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          {message.websitePreview && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg border">
                              <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="h-4 w-4 text-purple-600" />
                                <span className="text-sm font-medium">معاينة الموقع</span>
                              </div>
                              <div className="text-xs text-gray-600">
                                تم إنشاء معاينة أولية لموقعك - يمكنك مشاهدتها في القسم المجاور
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-white border rounded-2xl px-4 py-3 shadow-sm">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>

              {/* Quick Actions */}
              {currentStep === 1 && (
                <div className="p-4 border-t bg-gray-50">
                  <p className="text-sm text-gray-600 mb-3">أو اختر من الخيارات السريعة:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setInputValue(action)}
                        className="text-xs justify-start"
                      >
                        {action}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="p-4 border-t bg-gray-50">
                  <p className="text-sm text-gray-600 mb-3">أمثلة على أسماء المواقع:</p>
                  <div className="flex flex-wrap gap-2">
                    {["شركة النجاح", "متجر الأناقة", "مطعم الذوق", "عيادة الصحة"].map((name, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setInputValue(name)}
                        className="text-xs"
                      >
                        {name}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="p-4 border-t bg-blue-50">
                  <p className="text-sm text-blue-600 mb-3">يمكنك الآن:</p>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" className="text-xs bg-transparent">
                      تغيير الألوان
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs bg-transparent">
                      إضافة صفحة
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs bg-transparent">
                      تعديل المحتوى
                    </Button>
                    <Button size="sm" className="text-xs bg-green-600 hover:bg-green-700">
                      نشر الموقع
                    </Button>
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="اكتب رسالتك هنا..."
                    className="flex-1"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card className="flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-green-600" />
                معاينة الموقع المباشرة
              </CardTitle>
              <div className="flex items-center gap-2 text-sm">
                <Button variant="outline" size="sm" className="flex items-center gap-1 bg-transparent">
                  <Code className="h-4 w-4" />
                  HTML/CSS
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1 bg-transparent">
                  <Palette className="h-4 w-4" />
                  تخصيص
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1 bg-transparent">
                  <Globe className="h-4 w-4" />
                  نشر
                </Button>
                <div className="mr-auto flex items-center gap-2">
                  <div className="flex border rounded-md">
                    <Button variant="ghost" size="sm" className="px-2">
                      📱
                    </Button>
                    <Button variant="ghost" size="sm" className="px-2 bg-blue-100">
                      💻
                    </Button>
                    <Button variant="ghost" size="sm" className="px-2">
                      🖥️
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 p-0">
              {currentStep >= 4 ? (
                <div className="h-full bg-white">
                  {/* Website Preview */}
                  <div className="h-full overflow-auto">
                    <div className="min-h-full bg-gradient-to-br from-blue-50 to-purple-50">
                      {/* Preview Header */}
                      <div className="bg-white shadow-sm p-4">
                        <div className="flex items-center justify-between max-w-6xl mx-auto">
                          <h1 className="text-2xl font-bold text-gray-800">{websiteData.title || "موقعي"}</h1>
                          <nav className="flex gap-6">
                            <a href="#" className="text-gray-600 hover:text-blue-600">
                              الرئيسية
                            </a>
                            <a href="#" className="text-gray-600 hover:text-blue-600">
                              من نحن
                            </a>
                            <a href="#" className="text-gray-600 hover:text-blue-600">
                              الخدمات
                            </a>
                            <a href="#" className="text-gray-600 hover:text-blue-600">
                              اتصل بنا
                            </a>
                          </nav>
                        </div>
                      </div>

                      {/* Preview Hero */}
                      <div className="py-20 px-4 text-center">
                        <div className="max-w-4xl mx-auto">
                          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {websiteData.title || "عنوان موقعك"}
                          </h1>
                          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            {websiteData.description || "وصف موقعك سيظهر هنا"}
                          </p>
                          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
                            ابدأ الآن
                            <ArrowRight className="mr-2 h-5 w-5" />
                          </Button>
                        </div>
                      </div>

                      {/* Preview Features */}
                      <div className="py-16 px-4 bg-white">
                        <div className="max-w-6xl mx-auto">
                          <h2 className="text-3xl font-bold text-center mb-12">خدماتنا</h2>
                          <div className="grid md:grid-cols-3 gap-8">
                            {[1, 2, 3].map((item) => (
                              <div key={item} className="text-center p-6 rounded-lg border shadow-sm">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mx-auto mb-4"></div>
                                <h3 className="text-xl font-bold mb-2">خدمة {item}</h3>
                                <p className="text-gray-600">وصف الخدمة يظهر هنا</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Eye className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">معاينة الموقع</h3>
                    <p className="text-gray-500 max-w-sm">أكمل المحادثة مع المساعد الذكي لرؤية معاينة موقعك هنا</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
