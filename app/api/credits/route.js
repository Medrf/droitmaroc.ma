import { ensureDailyCredits } from '@/lib/credits'
import { supabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET(request) {
    try {
        const { currentUser } = await import('@clerk/nextjs/server')
        const user = await currentUser()

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Ensure row exists and is up to date
        await ensureDailyCredits(user.id)

        // Fetch current status
        const { data: creditData } = await supabaseAdmin
            .from('daily_credits')
            .select('*')
            .eq('user_id', user.id)
            .single()

        return Response.json({
            credits_remaining: creditData?.credits_remaining || 0,
            credits_daily_limit: creditData?.credits_daily_limit || 7,
            reset_at: creditData?.reset_at
        })
    } catch (error) {
        console.error('Credits API Error:', error)
        return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
