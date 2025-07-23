import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { z } from "zod"

const createPaymentSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().default("USDT"),
  payment_type: z.enum(["subscription", "website_creation", "domain"]),
  plan: z.string().optional(),
  metadata: z.any().optional(),
})

const verifyPaymentSchema = z.object({
  payment_id: z.string(),
  transaction_hash: z.string(),
  wallet_address: z.string().optional(),
})

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
    const validatedData = createPaymentSchema.parse(body)

    const { data: payment, error } = await supabase
      .from("payments")
      .insert({
        user_id: session.user.id,
        ...validatedData,
        status: "pending",
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({ payment }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation error", details: error.errors }, { status: 400 })
    }

    console.error("Error creating payment:", error)
    return NextResponse.json({ error: "Failed to create payment" }, { status: 500 })
  }
}
