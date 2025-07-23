"use client"

import { memo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { usePerformanceMonitor } from "@/lib/performance"
import { Activity, Clock, HardDrive } from "lucide-react"

const PerformanceMonitor = memo(function PerformanceMonitor() {
  const metrics = usePerformanceMonitor()

  if (process.env.NODE_ENV !== "development") {
    return null
  }

  return (
    <Card className="fixed bottom-4 left-4 w-80 z-50 bg-black/90 text-white border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Activity className="h-4 w-4" />
          مراقب الأداء
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            وقت الرندر:
          </span>
          <Badge variant={metrics.renderTime > 100 ? "destructive" : "secondary"}>{metrics.renderTime}ms</Badge>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1">
            <HardDrive className="h-3 w-3" />
            استخدام الذاكرة:
          </span>
          <Badge variant={metrics.memoryUsage > 50 ? "destructive" : "secondary"}>{metrics.memoryUsage}MB</Badge>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span>وقت التحميل:</span>
          <Badge variant={metrics.loadTime > 3000 ? "destructive" : "secondary"}>
            {(metrics.loadTime / 1000).toFixed(1)}s
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
})

export default PerformanceMonitor
