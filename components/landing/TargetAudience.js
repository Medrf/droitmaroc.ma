'use client'

import { useLanguage, translations } from '@/lib/language'

export default function TargetAudience() {
    const { language } = useLanguage()
    const t = translations[language]
    const isRtl = language === 'ar'

    return (
        <section className="py-20 md:py-28 bg-background" dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-h2 text-text-primary mb-4">{t.audienceTitle}</h2>
                    <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
                        {t.audienceSubtitle}
                    </p>
                </div>

                {/* Two Columns */}
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Individuals */}
                    <div className="p-8 rounded-lg bg-white border border-border">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-md bg-accent-primary/10 flex items-center justify-center">
                                <svg className="w-6 h-6 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-h4 text-text-primary">{t.individualsTitle}</h3>
                                <p className="text-small text-text-secondary">{t.individualsDesc}</p>
                            </div>
                        </div>
                        <ul className="space-y-3">
                            <ListItem text={t.individual1} />
                            <ListItem text={t.individual2} />
                            <ListItem text={t.individual3} />
                            <ListItem text={t.individual4} />
                        </ul>
                    </div>

                    {/* Professionals */}
                    <div className="p-8 rounded-lg bg-white border border-border">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-md bg-accent-gold/10 flex items-center justify-center">
                                <svg className="w-6 h-6 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-h4 text-text-primary">{t.professionalsTitle}</h3>
                                <p className="text-small text-text-secondary">{t.professionalsDesc}</p>
                            </div>
                        </div>
                        <ul className="space-y-3">
                            <ListItem text={t.professional1} variant="gold" />
                            <ListItem text={t.professional2} variant="gold" />
                            <ListItem text={t.professional3} variant="gold" />
                            <ListItem text={t.professional4} variant="gold" />
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

function ListItem({ text, variant = 'blue' }) {
    const colors = {
        blue: 'text-accent-primary',
        gold: 'text-accent-gold',
    }

    return (
        <li className="flex items-center gap-3">
            <svg className={`w-5 h-5 ${colors[variant]} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-body text-text-secondary">{text}</span>
        </li>
    )
}
