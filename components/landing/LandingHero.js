'use client'

import Link from 'next/link'
import { useLanguage, translations } from '@/lib/language'

export default function LandingHero() {
    const { language } = useLanguage()
    const t = translations[language]
    const isRtl = language === 'ar'

    const scrollToServices = () => {
        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section className="pt-10 pb-20 md:pt-16 md:pb-28 bg-background" dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/5 border border-accent-primary/20 mb-8">
                        <span className="w-2 h-2 bg-accent-primary rounded-full"></span>
                        <span className="text-small font-medium text-accent-primary">droitmaroc.ma</span>
                    </div>
                    <div className="bg-red-600 text-white font-bold p-2 mb-4 mx-auto max-w-sm rounded">DEBUG: LANDING PAGE ACTIVE</div>

                    {/* Headline */}
                    <h1 className="text-h1 md:text-display text-text-primary mb-6">
                        {t.heroTitle}
                    </h1>

                    {/* Subheadline */}
                    <p className="text-body-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
                        {t.heroSubtitle}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <Link
                            href="/sign-up"
                            className="w-full sm:w-auto px-8 py-4 bg-accent-primary hover:bg-accent-primary-hover text-white font-semibold text-body rounded-md transition-all shadow-soft hover:shadow-medium"
                        >
                            {t.heroCta}
                        </Link>
                        <button
                            onClick={scrollToServices}
                            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-background border border-border text-text-primary font-medium text-body rounded-md transition-all"
                        >
                            {t.heroCtaSecondary}
                        </button>
                    </div>

                    {/* Trust Strip */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
                        <TrustItem icon="morocco" text={t.trustMoroccanLaw} />
                        <TrustItem icon="source" text={t.trustOfficialSources} />
                        <TrustItem icon="lock" text={t.trustPrivacy} />
                        <TrustItem icon="info" text={t.trustDisclaimer} />
                    </div>
                </div>
            </div>
        </section>
    )
}

function TrustItem({ icon, text }) {
    const icons = {
        morocco: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
            </svg>
        ),
        source: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
        lock: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
        ),
        info: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    }

    return (
        <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white border border-border-light">
            <span className="text-text-muted">{icons[icon]}</span>
            <span className="text-xs text-text-secondary text-center leading-snug">{text}</span>
        </div>
    )
}
