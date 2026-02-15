'use client'

import { useEffect } from 'react'
import useSWR from 'swr'
import Link from 'next/link'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function CreditDisplay() {
    const { data, mutate } = useSWR('/api/credits', fetcher, {
        refreshInterval: 60000, // Refresh every minute
        revalidateOnFocus: true
    })

    useEffect(() => {
        const handleCreditUpdate = () => {
            mutate()
        }
        window.addEventListener('credit_updated', handleCreditUpdate)
        return () => window.removeEventListener('credit_updated', handleCreditUpdate)
    }, [mutate])

    if (!data || data.error) return null

    const percent = Math.min(100, Math.max(0, (data.credits_remaining / data.credits_daily_limit) * 100))
    const isLow = data.credits_remaining <= 2 && data.credits_daily_limit < 50 // Only warn free users really

    return (
        <div className="mx-4 mb-4 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
            <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-slate-300">Crédits quotidiens</span>
                <span className={`text-xs font-bold ${isLow ? 'text-red-400' : 'text-amber-500'}`}>
                    {data.credits_remaining} / {data.credits_daily_limit}
                </span>
            </div>

            <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden mb-3">
                <div
                    className={`h-full rounded-full transition-all duration-500 ${isLow ? 'bg-red-500' : 'bg-amber-500'}`}
                    style={{ width: `${percent}%` }}
                />
            </div>

            <Link
                href="/pricing"
                className="block w-full py-1.5 text-center text-xs font-medium text-amber-500 hover:text-white bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 rounded-lg transition-colors"
                onClick={() => {
                    // Close sidebar if open (mobile)? 
                    // Sidebar handles this via link click usually if passed
                }}
            >
                Augmenter ma limite
            </Link>
        </div>
    )
}
