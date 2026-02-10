'use client'

import { useState } from 'react'
import { useLanguage, translations } from '@/lib/language'

export default function FAQ() {
    const { language } = useLanguage()
    const t = translations[language]
    const isRtl = language === 'ar'

    const faqs = [
        { q: t.faq1Q, a: t.faq1A },
        { q: t.faq2Q, a: t.faq2A },
        { q: t.faq3Q, a: t.faq3A },
        { q: t.faq4Q, a: t.faq4A },
        { q: t.faq5Q, a: t.faq5A },
        { q: t.faq6Q, a: t.faq6A },
    ]

    const [openIndex, setOpenIndex] = useState(null)

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section className="py-20 md:py-28 bg-white" dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-h2 text-text-primary mb-4">{t.faqTitle}</h2>
                </div>

                {/* FAQ Items */}
                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-border rounded-lg overflow-hidden bg-background"
                        >
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full flex items-center justify-between p-5 text-left hover:bg-white transition-colors"
                            >
                                <span className="text-body font-medium text-text-primary pr-4">{faq.q}</span>
                                <svg
                                    className={`w-5 h-5 text-text-muted flex-shrink-0 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {openIndex === index && (
                                <div className="px-5 pb-5">
                                    <p className="text-body text-text-secondary leading-relaxed">{faq.a}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
