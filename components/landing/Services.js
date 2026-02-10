'use client'

import Link from 'next/link'
import { useLanguage, translations } from '@/lib/language'

export default function Services() {
    const { language } = useLanguage()
    const t = translations[language]
    const isRtl = language === 'ar'

    const services = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            ),
            title: t.service1Title,
            desc: t.service1Desc,
            href: '/chat',
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            ),
            title: t.service2Title,
            desc: t.service2Desc,
            href: '/search',
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: t.service3Title,
            desc: t.service3Desc,
            href: '/contracts/audit',
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            title: t.service4Title,
            desc: t.service4Desc,
            href: '/contracts',
        },
    ]

    return (
        <section id="services" className="py-20 md:py-28 bg-white" dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-h2 text-text-primary mb-4">{t.servicesTitle}</h2>
                    <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
                        {t.servicesSubtitle}
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {services.map((service, index) => (
                        <Link
                            key={index}
                            href={service.href}
                            className="group p-8 rounded-lg bg-background border border-border hover:border-accent-primary/30 hover:shadow-card-hover transition-all duration-300"
                        >
                            <div className="flex items-start gap-5">
                                <div className="w-12 h-12 rounded-md bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary flex-shrink-0">
                                    {service.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-h4 text-text-primary mb-2 group-hover:text-accent-primary transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-body text-text-secondary mb-4 leading-relaxed">
                                        {service.desc}
                                    </p>
                                    <span className="inline-flex items-center gap-1 text-small font-medium text-accent-primary">
                                        {t.learnMore}
                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
