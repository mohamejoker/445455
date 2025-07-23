import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { z } from "zod"

const createWebsiteSchema = z.object({
  title: z.string().min(1, "العنوان مطلوب"),
  description: z.string().optional(),
  template_id: z.string().min(1, "القالب مطلوب"),
  domain: z.string().min(1, "النطاق مطلوب"),
  content: z.any().optional(),
  settings: z.any().optional(),
})

export async function GET() {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: websites, error } = await supabase
      .from("websites")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json({ websites })
  } catch (error) {
    console.error("Error fetching websites:", error)
    return NextResponse.json({ error: "Failed to fetch websites" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = createWebsiteSchema.parse(body)

    // Check user's plan limits
    const { data: user } = await supabase.from("users").select("subscription_plan").eq("id", session.user.id).single()

    const { count: websiteCount } = await supabase
      .from("websites")
      .select("*", { count: "exact", head: true })
      .eq("user_id", session.user.id)

    const planLimits = {
      free: 1,
      basic: 1,
      advanced: 3,
      pro: Number.POSITIVE_INFINITY,
    }

    const limit = planLimits[user?.subscription_plan as keyof typeof planLimits] || 1

    if (websiteCount && websiteCount >= limit) {
      return NextResponse.json({ error: "Website limit reached for your plan" }, { status: 403 })
    }

    const { data: website, error } = await supabase
      .from("websites")
      .insert({
        ...validatedData,
        user_id: session.user.id,
        status: "draft",
        total_visits: 0,
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({ website }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation error", details: error.errors }, { status: 400 })
    }

    console.error("Error creating website:", error)
    return NextResponse.json({ error: "Failed to create website" }, { status: 500 })
  }
}
