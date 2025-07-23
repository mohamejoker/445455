import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

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

    // Check if user is admin
    const { data: user } = await supabase.from("users").select("email").eq("id", session.user.id).single()

    const adminEmails = ["admin@chat2site.com", "support@chat2site.com"]

    if (!user || !adminEmails.includes(user.email)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { data: settings, error } = await supabase.from("admin_settings").select("settings").eq("id", 1).single()

    if (error) {
      throw error
    }

    return NextResponse.json(settings?.settings || {})
  } catch (error) {
    console.error("Error fetching admin settings:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user is admin
    const { data: user } = await supabase.from("users").select("email").eq("id", session.user.id).single()

    const adminEmails = ["admin@chat2site.com", "support@chat2site.com"]

    if (!user || !adminEmails.includes(user.email)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()

    const { data: settings, error } = await supabase
      .from("admin_settings")
      .upsert({
        id: 1,
        settings: body,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true, settings: settings.settings })
  } catch (error) {
    console.error("Error updating admin settings:", error)
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}
