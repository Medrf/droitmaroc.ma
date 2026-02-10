'use client'

import { useLanguage, translations } from '@/lib/language'

export default function TrustCompliance() {
    const { language } = useLanguage()
    const t = translations[language]
    const isRtl = language === 'ar'

    return (
        <section className="py-20 md:py-28 bg-background" dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-h2 text-text-primary mb-4">{t.trustTitle}</h2>
                </div>

                {/* Trust Cards */}
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {/* Disclaimer Card */}
                    <div className="p-6 rounded-lg bg-white border border-border">
                        <div className="w-10 h-10 rounded-md bg-red-50 flex items-center justify-center mb-4">
                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h3 className="text-h4 text-text-primary mb-3">{t.disclaimerTitle}</h3>
                        <p className="text-small text-text-secondary leading-relaxed">{t.disclaimerText}</p>
                    </div>

                    {/* Privacy Card */}
                    <div className="p-6 rounded-lg bg-white border border-border">
                        <div className="w-10 h-10 rounded-md bg-green-50 flex items-center justify-center mb-4">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h3 className="text-h4 text-text-primary mb-3">{t.privacyTitle}</h3>
                        <p className="text-small text-text-secondary leading-relaxed">{t.privacyText}</p>
                    </div>

                    {/* Limits Card */}
                    <div className="p-6 rounded-lg bg-white border border-border">
                        <div className="w-10 h-10 rounded-md bg-blue-50 flex items-center justify-center mb-4">
                            <svg className="w-5 h-5 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-h4 text-text-primary mb-3">{t.limitsTitle}</h3>
                        <ul className="space-y-2">
                            <li className="text-small text-text-secondary flex items-start gap-2">
                                <span className="text-text-muted mt-1">•</span>
                                {t.limit1}
                            </li>
                            <li className="text-small text-text-secondary flex items-start gap-2">
                                <span className="text-text-muted mt-1">•</span>
                                {t.limit2}
                            </li>
                            <li className="text-small text-text-secondary flex items-start gap-2">
                                <span className="text-text-muted mt-1">•</span>
                                {t.limit3}
                            </li>
                            <li className="text-small text-text-secondary flex items-start gap-2">
                                <span className="text-text-muted mt-1">•</span>
                                {t.limit4}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
