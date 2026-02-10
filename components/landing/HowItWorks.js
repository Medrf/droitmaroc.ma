'use client'

import { useLanguage, translations } from '@/lib/language'

export default function HowItWorks() {
    const { language } = useLanguage()
    const t = translations[language]
    const isRtl = language === 'ar'

    const steps = [
        {
            number: '01',
            title: t.step1Title,
            desc: t.step1Desc,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
            ),
        },
        {
            number: '02',
            title: t.step2Title,
            desc: t.step2Desc,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            ),
        },
        {
            number: '03',
            title: t.step3Title,
            desc: t.step3Desc,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
    ]

    return (
        <section className="py-20 md:py-28 bg-white" dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-h2 text-text-primary mb-4">{t.howItWorksTitle}</h2>
                    <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
                        {t.howItWorksSubtitle}
                    </p>
                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
                    {steps.map((step, index) => (
                        <div key={index} className="relative text-center">
                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-border" />
                            )}

                            {/* Step Number */}
                            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-accent-primary/5 border-2 border-accent-primary/20 flex items-center justify-center">
                                <span className="text-h2 font-bold text-accent-primary">{step.number}</span>
                            </div>

                            {/* Content */}
                            <h3 className="text-h4 text-text-primary mb-3">{step.title}</h3>
                            <p className="text-body text-text-secondary leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Disclaimer */}
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-center gap-2 p-4 rounded-lg bg-accent-gold/5 border border-accent-gold/20">
                        <svg className="w-5 h-5 text-accent-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-small text-text-secondary">{t.howItWorksDisclaimer}</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
