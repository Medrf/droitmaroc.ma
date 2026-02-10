'use client'

import { useLanguage, translations } from '@/lib/language'

export default function LegalDisclaimer() {
    const { language } = useLanguage()
    const t = translations[language]

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 text-slate-400 mt-0.5">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <p className="text-slate-300 text-sm leading-relaxed" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                            {t.disclaimer}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
