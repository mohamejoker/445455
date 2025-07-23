import type React from "react"
import type { Metadata } from "next"
import { Cairo } from "next/font/google"
import "./globals.css"
import ServiceWorkerRegistration from "@/components/optimized/ServiceWorkerRegistration"
import PerformanceMonitor from "@/components/optimized/PerformanceMonitor"

const cairo = Cairo({ subsets: ["arabic", "latin"], weight: ["200", "300", "400", "500", "600", "700", "800", "900"] })

export const metadata: Metadata = {
  title: "Chat2Site - إنشاء المواقع بالذكاء الاصطناعي",
  description: "منصة ذكية لإنشاء المواقع الإلكترونية من خلال المحادثة التفاعلية",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className={cairo.className}>
        {children}
        <ServiceWorkerRegistration />
        <PerformanceMonitor />
      </body>
    </html>
  )
}
