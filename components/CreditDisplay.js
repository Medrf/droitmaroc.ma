'use client'

import { useEffect } from 'react'
import useSWR from 'swr'
import Link from 'next/link'

const fetcher = async (url) => {
    try {
        const res = await fetch(url)
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}))
            throw new Error(errorData.error || `Error ${res.status}`)
        }
        return res.json()
    } catch (e) {
        console.error("CreditDisplay fetch error:", e)
        return { error: e.message }
    }
}

export default function CreditDisplay() {
    const { data, mutate } = useSWR('/api/credits', fetcher, {
        refreshInterval: 60000,
        revalidateOnFocus: true,
        onSuccess: (data) => console.log("CreditDisplay data:", data),
        onError: (err) => console.error("CreditDisplay SWR error:", err)
    })

    useEffect(() => {
        const handleCreditUpdate = () => {
            mutate()
        }
        window.addEventListener('credit_updated', handleCreditUpdate)
        return () => window.removeEventListener('credit_updated', handleCreditUpdate)
    }, [mutate])

    useEffect(() => {
        console.log('CreditDisplay MOUNTED')
        console.log('CreditDisplay TIME:', new Date().toISOString())
    }, [])

    if (!data) return (
        <div className="mx-4 mb-4 p-3 bg-card rounded-xl border border-border animate-pulse shadow-sm">
            <div className="h-4 bg-muted rounded w-24 mb-2"></div>
            <div className="h-2 bg-muted rounded-full"></div>
        </div>
    )

    if (data.error) {
        return (
            <div className="mx-4 mb-4 p-3 bg-destructive/10 rounded-xl border border-destructive/20 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-destructive">Erreur Crédits</span>
                    <span className="text-xs font-bold text-destructive">!</span>
                </div>
                <div className="text-[10px] text-destructive/80">
                    {typeof data.error === 'string' ? data.error : data.error?.message || 'Configuration manquante'}
                </div>
            </div>
        )
    }

    const percent = Math.min(100, Math.max(0, (data.credits_remaining / data.credits_daily_limit) * 100))
    const isLow = data.credits_remaining <= 2 && data.credits_daily_limit < 50

    return (
        <div className="mx-4 mb-4 p-3 bg-card rounded-xl border border-border shadow-sm">
            <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-muted-foreground">Crédits quotidiens</span>
                <span className={`text-xs font-bold ${isLow ? 'text-destructive' : 'text-primary'}`}>
                    {data.credits_remaining} / {data.credits_daily_limit}
                </span>
            </div>

            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden mb-3">
                <div
                    className={`h-full rounded-full transition-all duration-500 ${isLow ? 'bg-destructive' : 'bg-primary'}`}
                    style={{ width: `${percent}%` }}
                />
            </div>

            <Link
                href="/pricing"
                className="block w-full py-1.5 text-center text-xs font-medium text-primary hover:text-primary-foreground bg-primary/10 hover:bg-primary border border-primary/20 rounded-lg transition-colors"
                onClick={() => { }}
            >
                Augmenter ma limite
            </Link>
        </div>
    )
}
