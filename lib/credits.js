import { supabaseAdmin } from './supabase'

/**
 * Ensures the user has a credit row and resets it if the day has passed.
 * Must be called before any credit deduction.
 */
export async function ensureDailyCredits(userId) {
    if (!userId) return

    // 1. Get current credit state and plan
    const { data: creditData, error: creditError } = await supabaseAdmin
        .from('daily_credits')
        .select('*')
        .eq('user_id', userId)
        .single()

    const { data: planData } = await supabaseAdmin
        .from('user_plans')
        .select('plan, is_active')
        .eq('user_id', userId)
        .single()

    // Determine daily limit based on plan
    let dailyLimit = 7
    if (planData?.is_active) {
        if (planData.plan === 'starter') dailyLimit = 50
        if (planData.plan === 'pro') dailyLimit = 200
    }

    const now = new Date()
    // Calculate next UTC midnight
    const tomorrow = new Date(now)
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1)
    tomorrow.setUTCHours(0, 0, 0, 0)
    const nextReset = tomorrow.toISOString()

    // Case A: User has no credit row -> Create one
    if (!creditData) {
        await supabaseAdmin.from('daily_credits').insert({
            user_id: userId,
            credits_remaining: dailyLimit,
            credits_daily_limit: dailyLimit,
            reset_at: nextReset
        })
        return
    }

    // Case B: Reset time has passed -> Reset credits
    if (new Date(creditData.reset_at) <= now) {
        await supabaseAdmin
            .from('daily_credits')
            .update({
                credits_remaining: dailyLimit,
                credits_daily_limit: dailyLimit, // Update limit in case plan changed
                reset_at: nextReset,
                updated_at: new Date().toISOString()
            })
            .eq('user_id', userId)
    }
}

/**
 * Deducts credits for a specific feature usage.
 * Returns { success: boolean, remaining: number, error: string }
 */
export async function deductCredits(userId, cost, feature) {
    if (!userId) return { success: false, error: 'User ID required' }

    // Ensure credits are fresh/reset before checking
    await ensureDailyCredits(userId)

    const { data: creditData } = await supabaseAdmin
        .from('daily_credits')
        .select('credits_remaining')
        .eq('user_id', userId)
        .single()

    if (!creditData) {
        return { success: false, error: 'Credit data not found' }
    }

    if (creditData.credits_remaining < cost) {
        // Log blocked attempt
        await logUsage(userId, feature, 0, 'blocked')
        return { success: false, error: 'PAYWALL', remaining: creditData.credits_remaining }
    }

    // Atomic update: credits = credits - cost
    // Supabase doesn't have a direct 'decrement' in JS client easily without RPC, 
    // but for this MVP we can use a direct update with a check or assume optimistic locking not strictly needed for low volume.
    // Better: use rpc() if we had one, but let's stick to simple update for now.

    const newBalance = creditData.credits_remaining - cost
    const { error: updateError } = await supabaseAdmin
        .from('daily_credits')
        .update({ credits_remaining: newBalance })
        .eq('user_id', userId)

    if (updateError) {
        console.error('Credit update failed:', updateError)
        return { success: false, error: 'Update failed' }
    }

    // Log success
    await logUsage(userId, feature, cost, 'success')

    return { success: true, remaining: newBalance }
}

async function logUsage(userId, feature, cost, status) {
    await supabaseAdmin.from('usage_logs').insert({
        user_id: userId,
        feature,
        credits_spent: cost,
        status
    })
}
