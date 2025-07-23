"use client"

import { createClient } from "@supabase/supabase-js"

// إعداد Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "your-supabase-url"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-supabase-anon-key"

export const supabase = createClient(supabaseUrl, supabaseKey)

// أنواع البيانات
export interface User {
  id: string
  email: string
  phone?: string
  full_name?: string
  avatar_url?: string
  subscription_plan: "free" | "basic" | "advanced" | "pro"
  subscription_status: "active" | "inactive" | "expired"
  subscription_expires_at?: string
  total_spent: number
  created_at: string
  updated_at: string
}

export interface Website {
  id: string
  user_id: string
  title: string
  description?: string
  domain: string
  custom_domain?: string
  template_id: string
  status: "draft" | "published" | "suspended"
  content: any
  settings: any
  analytics: any
  total_visits: number
  last_published_at?: string
  created_at: string
  updated_at: string
}

export interface Template {
  id: string
  name: string
  description?: string
  category: string
  preview_image?: string
  template_data: any
  is_featured: boolean
  is_active: boolean
  usage_count: number
  rating: number
  created_at: string
  updated_at: string
}

// دوال قاعدة البيانات
export class DatabaseService {
  // المستخدمين
  static async createUser(userData: Partial<User>) {
    const { data, error } = await supabase.from("users").insert(userData).select().single()

    if (error) throw error
    return data
  }

  static async getUserByEmail(email: string) {
    const { data, error } = await supabase.from("users").select("*").eq("email", email).single()

    if (error && error.code !== "PGRST116") throw error
    return data
  }

  static async updateUser(id: string, updates: Partial<User>) {
    const { data, error } = await supabase
      .from("users")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // المواقع
  static async createWebsite(websiteData: Partial<Website>) {
    const { data, error } = await supabase.from("websites").insert(websiteData).select().single()

    if (error) throw error
    return data
  }

  static async getUserWebsites(userId: string) {
    const { data, error } = await supabase
      .from("websites")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  static async updateWebsite(id: string, updates: Partial<Website>) {
    const { data, error } = await supabase
      .from("websites")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async deleteWebsite(id: string) {
    const { error } = await supabase.from("websites").delete().eq("id", id)

    if (error) throw error
  }

  // القوالب
  static async getTemplates(category?: string) {
    let query = supabase
      .from("templates")
      .select("*")
      .eq("is_active", true)
      .order("is_featured", { ascending: false })
      .order("usage_count", { ascending: false })

    if (category && category !== "الكل") {
      query = query.eq("category", category)
    }

    const { data, error } = await query
    if (error) throw error
    return data
  }

  static async getFeaturedTemplates() {
    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .eq("is_featured", true)
      .eq("is_active", true)
      .order("usage_count", { ascending: false })

    if (error) throw error
    return data
  }

  // المدفوعات
  static async createPayment(paymentData: any) {
    const { data, error } = await supabase.from("payments").insert(paymentData).select().single()

    if (error) throw error
    return data
  }

  static async updatePaymentStatus(id: string, status: string, transactionHash?: string) {
    const updates: any = {
      status,
      updated_at: new Date().toISOString(),
    }

    if (transactionHash) {
      updates.transaction_hash = transactionHash
    }

    const { data, error } = await supabase.from("payments").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data
  }

  // التحليلات
  static async recordVisit(websiteId: string, visitorData: any) {
    const { error } = await supabase.from("analytics").insert({
      website_id: websiteId,
      ...visitorData,
    })

    if (error) throw error

    // تحديث عداد الزيارات
    await supabase.rpc("increment_visits", { website_id: websiteId })
  }

  static async getWebsiteAnalytics(websiteId: string, days = 30) {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const { data, error } = await supabase
      .from("analytics")
      .select("*")
      .eq("website_id", websiteId)
      .gte("created_at", startDate.toISOString())
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  // الإعدادات
  static async getSetting(key: string) {
    const { data, error } = await supabase.from("settings").select("value").eq("key", key).single()

    if (error && error.code !== "PGRST116") throw error
    return data?.value
  }

  static async updateSetting(key: string, value: any) {
    const { data, error } = await supabase
      .from("settings")
      .upsert({
        key,
        value,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error
    return data
  }
}
