'use client'

import Link from 'next/link'
import { useLanguage, translations } from '@/lib/language'

export default function FinalCTA() {
    const { language } = useLanguage()
    const t = translations[language]
    const isRtl = language === 'ar'

    return (
        <section className="py-20 md:py-28 bg-accent-primary" dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-h2 md:text-h1 text-white mb-4">{t.finalCtaTitle}</h2>
                    <p className="text-body-lg text-white/80 mb-10">
                        {t.finalCtaSubtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/sign-up"
                            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-background text-accent-primary font-semibold text-body rounded-md transition-all shadow-soft hover:shadow-medium"
                        >
                            {t.signup}
                        </Link>
                        <Link
                            href="/sign-in"
                            className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/10 border border-white/30 text-white font-medium text-body rounded-md transition-all"
                        >
                            {t.login}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
