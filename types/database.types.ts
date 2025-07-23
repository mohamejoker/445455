export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          phone: string | null
          full_name: string | null
          avatar_url: string | null
          subscription_plan: "free" | "basic" | "advanced" | "pro"
          subscription_status: "active" | "inactive" | "expired"
          subscription_expires_at: string | null
          total_spent: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          phone?: string | null
          full_name?: string | null
          avatar_url?: string | null
          subscription_plan?: "free" | "basic" | "advanced" | "pro"
          subscription_status?: "active" | "inactive" | "expired"
          subscription_expires_at?: string | null
          total_spent?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          phone?: string | null
          full_name?: string | null
          avatar_url?: string | null
          subscription_plan?: "free" | "basic" | "advanced" | "pro"
          subscription_status?: "active" | "inactive" | "expired"
          subscription_expires_at?: string | null
          total_spent?: number
          created_at?: string
          updated_at?: string
        }
      }
      websites: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          domain: string
          custom_domain: string | null
          template_id: string
          status: "draft" | "published" | "suspended"
          content: any
          settings: any
          analytics: any
          total_visits: number
          last_published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          domain: string
          custom_domain?: string | null
          template_id: string
          status?: "draft" | "published" | "suspended"
          content?: any
          settings?: any
          analytics?: any
          total_visits?: number
          last_published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          domain?: string
          custom_domain?: string | null
          template_id?: string
          status?: "draft" | "published" | "suspended"
          content?: any
          settings?: any
          analytics?: any
          total_visits?: number
          last_published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      templates: {
        Row: {
          id: string
          name: string
          description: string | null
          category: string
          preview_image: string | null
          template_data: any
          is_featured: boolean
          is_active: boolean
          usage_count: number
          rating: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          description?: string | null
          category: string
          preview_image?: string | null
          template_data?: any
          is_featured?: boolean
          is_active?: boolean
          usage_count?: number
          rating?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          category?: string
          preview_image?: string | null
          template_data?: any
          is_featured?: boolean
          is_active?: boolean
          usage_count?: number
          rating?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_visits: {
        Args: {
          website_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
