import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/types/database.types"

export const supabase = createClientComponentClient<Database>()

export interface AuthUser {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  subscription_plan: "free" | "basic" | "advanced" | "pro"
  subscription_status: "active" | "inactive" | "expired"
}

export class AuthService {
  static async signUp(email: string, password: string, fullName?: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) throw error

    // Create user profile
    if (data.user) {
      const { error: profileError } = await supabase.from("users").insert({
        id: data.user.id,
        email: data.user.email!,
        full_name: fullName,
        subscription_plan: "free",
        subscription_status: "inactive",
        total_spent: 0,
      })

      if (profileError) {
        console.error("Error creating user profile:", profileError)
      }
    }

    return data
  }

  static async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return data
  }

  static async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  static async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    if (error) throw error
  }

  static async updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) throw error
  }

  static async getCurrentUser(): Promise<AuthUser | null> {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user) return null

    const { data: profile } = await supabase.from("users").select("*").eq("id", session.user.id).single()

    if (!profile) return null

    return {
      id: profile.id,
      email: profile.email,
      full_name: profile.full_name || undefined,
      avatar_url: profile.avatar_url || undefined,
      subscription_plan: profile.subscription_plan,
      subscription_status: profile.subscription_status,
    }
  }

  static async updateProfile(updates: Partial<AuthUser>) {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user) throw new Error("Not authenticated")

    const { error } = await supabase
      .from("users")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", session.user.id)

    if (error) throw error
  }

  static onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const user = await this.getCurrentUser()
        callback(user)
      } else {
        callback(null)
      }
    })
  }
}
