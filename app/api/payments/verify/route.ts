import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { z } from "zod"

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
    const { payment_id, transaction_hash, wallet_address } = verifyPaymentSchema.parse(body)

    // Here you would integrate with blockchain API to verify the transaction
    // For now, we'll simulate verification
    const isValid = await verifyTransactionOnBlockchain(transaction_hash)

    if (!isValid) {
      return NextResponse.json({ error: "Transaction verification failed" }, { status: 400 })
    }

    // Update payment status
    const { data: payment, error } = await supabase
      .from("payments")
      .update({
        status: "completed",
        transaction_hash,
        wallet_address,
        updated_at: new Date().toISOString(),
      })
      .eq("id", payment_id)
      .eq("user_id", session.user.id)
      .select()
      .single()

    if (error) {
      throw error
    }

    // Update user subscription if it's a subscription payment
    if (payment.payment_type === "subscription") {
      const expiryDate = new Date()
      expiryDate.setMonth(expiryDate.getMonth() + 1)

      await supabase
        .from("users")
        .update({
          subscription_plan: payment.metadata?.plan || "basic",
          subscription_status: "active",
          subscription_expires_at: expiryDate.toISOString(),
          total_spent: payment.amount,
        })
        .eq("id", session.user.id)
    }

    return NextResponse.json({
      success: true,
      payment,
      message: "Payment verified successfully",
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation error", details: error.errors }, { status: 400 })
    }

    console.error("Error verifying payment:", error)
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 })
  }
}

// Mock function - replace with actual blockchain verification
async function verifyTransactionOnBlockchain(txHash: string): Promise<boolean> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Mock verification - in production, integrate with TronGrid API or similar
  return txHash.length > 10 // Simple validation
}
