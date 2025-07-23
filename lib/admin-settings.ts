export interface AdminSettings {
  general: {
    siteName: string
    siteDescription: string
    contactEmail: string
    supportEmail: string
    language: string
    timezone: string
  }
  design: {
    primaryColor: string
    secondaryColor: string
    accentColor: string
    backgroundColor: string
    fontFamily: string
    logoUrl: string
  }
  pricing: {
    basicPrice: number
    basicOriginalPrice: number
    proPrice: number
    proOriginalPrice: number
    enterprisePrice: number
    enterpriseOriginalPrice: number
    currency: string
    discountEnabled: boolean
  }
  stats: {
    totalWebsites: number
    totalUsers: number
    uptime: number
    avgCreationTime: number
    satisfaction: number
    countries: number
  }
  bot: {
    welcomeMessage: string
    helpMessage: string
    errorMessage: string
    responseDelay: number
    enableTyping: boolean
  }
  notifications: {
    emailNotifications: boolean
    smsNotifications: boolean
    pushNotifications: boolean
    marketingEmails: boolean
  }
}

export interface PricingPlan {
  id: number
  name: string
  price: number
  originalPrice: number
  features: string[]
  popular: boolean
  enabled: boolean
}

export class AdminSettingsService {
  private static instance: AdminSettingsService
  private settings: AdminSettings | null = null

  private constructor() {}

  static getInstance(): AdminSettingsService {
    if (!AdminSettingsService.instance) {
      AdminSettingsService.instance = new AdminSettingsService()
    }
    return AdminSettingsService.instance
  }

  async getSettings(): Promise<AdminSettings> {
    if (this.settings) {
      return this.settings
    }

    try {
      const response = await fetch("/api/admin/settings")
      if (!response.ok) {
        throw new Error("Failed to fetch settings")
      }
      this.settings = await response.json()
      return this.settings!
    } catch (error) {
      console.error("Error fetching settings:", error)
      return this.getDefaultSettings()
    }
  }

  async updateSettings(newSettings: AdminSettings): Promise<void> {
    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSettings),
      })

      if (!response.ok) {
        throw new Error("Failed to update settings")
      }

      this.settings = newSettings
    } catch (error) {
      console.error("Error updating settings:", error)
      throw error
    }
  }

  async getPricingPlans(): Promise<PricingPlan[]> {
    try {
      const response = await fetch("/api/admin/pricing")
      if (!response.ok) {
        throw new Error("Failed to fetch pricing plans")
      }
      return await response.json()
    } catch (error) {
      console.error("Error fetching pricing plans:", error)
      return this.getDefaultPricingPlans()
    }
  }

  async updatePricingPlans(plans: PricingPlan[]): Promise<void> {
    try {
      const response = await fetch("/api/admin/pricing", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(plans),
      })

      if (!response.ok) {
        throw new Error("Failed to update pricing plans")
      }
    } catch (error) {
      console.error("Error updating pricing plans:", error)
      throw error
    }
  }

  private getDefaultSettings(): AdminSettings {
    return {
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
    }
  }

  private getDefaultPricingPlans(): PricingPlan[] {
    return [
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
    ]
  }

  exportSettings(): string {
    if (!this.settings) {
      throw new Error("No settings to export")
    }
    return JSON.stringify(this.settings, null, 2)
  }

  importSettings(settingsJson: string): AdminSettings {
    try {
      const importedSettings = JSON.parse(settingsJson)
      this.validateSettings(importedSettings)
      return importedSettings
    } catch (error) {
      throw new Error("Invalid settings format")
    }
  }

  private validateSettings(settings: any): void {
    const requiredKeys = ["general", "design", "pricing", "stats", "bot", "notifications"]
    for (const key of requiredKeys) {
      if (!settings[key]) {
        throw new Error(`Missing required settings section: ${key}`)
      }
    }
  }
}
