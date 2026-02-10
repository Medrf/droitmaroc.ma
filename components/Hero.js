'use client'

import Link from 'next/link'
import { useLanguage, translations } from '@/lib/language'

export default function Hero() {
    const { language } = useLanguage()
    const t = translations[language]
    const isRtl = language === 'ar'

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24" dir={isRtl ? 'rtl' : 'ltr'}>
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-slate-700/15 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-slate-600/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-800/50 border border-slate-700/50 mb-8">
                    <span className="w-2 h-2 bg-slate-400 rounded-full" />
                    <span className="text-sm text-slate-300 font-medium">{t.badge}</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 text-white">
                    {t.heroTitle1}
                    <br />
                    <span className="text-slate-400">{t.heroTitle2}</span>
                </h1>

                {/* Subtext */}
                <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto mb-4 leading-relaxed">
                    {t.heroSubtext}
                </p>

                {/* Supporting Line */}
                <p className="text-sm text-slate-500 mb-10">
                    {t.supportingLine}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                    <Link
                        href="/chat"
                        className="w-full sm:w-auto px-8 py-4 bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white font-semibold text-lg rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        {t.askNow}
                    </Link>
                    <Link
                        href="/search"
                        className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-slate-800/50 border border-slate-700 text-slate-300 hover:text-white font-medium text-lg rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        {t.searchLaws}
                    </Link>
                </div>

                {/* Features Grid - 4 Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
                    {/* Assistant juridique */}
                    <Link
                        href="/chat"
                        className="group p-5 bg-slate-800/40 border border-slate-700/50 rounded-xl hover:bg-slate-800/60 hover:border-slate-600/50 transition-all duration-300 text-left"
                    >
                        <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-white mb-2">{t.feature1Title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{t.feature1Desc}</p>
                    </Link>

                    {/* Recherche de lois */}
                    <Link
                        href="/search"
                        className="group p-5 bg-slate-800/40 border border-slate-700/50 rounded-xl hover:bg-slate-800/60 hover:border-slate-600/50 transition-all duration-300 text-left"
                    >
                        <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-white mb-2">{t.feature2Title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{t.feature2Desc}</p>
                    </Link>

                    {/* Rédaction de contrats */}
                    <Link
                        href="/contracts"
                        className="group p-5 bg-slate-800/40 border border-slate-700/50 rounded-xl hover:bg-slate-800/60 hover:border-slate-600/50 transition-all duration-300 text-left"
                    >
                        <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-white mb-2">{t.feature3Title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{t.feature3Desc}</p>
                    </Link>

                    {/* Audit de contrats */}
                    <Link
                        href="/contracts/audit"
                        className="group p-5 bg-slate-800/40 border border-slate-700/50 rounded-xl hover:bg-slate-800/60 hover:border-slate-600/50 transition-all duration-300 text-left"
                    >
                        <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-white mb-2">{t.feature4Title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{t.feature4Desc}</p>
                    </Link>
                </div>

                {/* Target Users Section */}
                <div className="max-w-3xl mx-auto mb-16">
                    <h2 className="text-2xl font-semibold text-white mb-8">{t.targetTitle}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
                            <svg className="w-5 h-5 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="text-slate-300 text-sm">{t.target1}</span>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
                            <svg className="w-5 h-5 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <span className="text-slate-300 text-sm">{t.target2}</span>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
                            <svg className="w-5 h-5 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                            </svg>
                            <span className="text-slate-300 text-sm">{t.target3}</span>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
                            <svg className="w-5 h-5 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span className="text-slate-300 text-sm">{t.target4}</span>
                        </div>
                    </div>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500 mb-8">
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{t.officialSources}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{t.structuredAnswers}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-amber-500/70" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <span>{t.notLegalAdvice}</span>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="max-w-2xl mx-auto p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
                    <p className="text-xs text-slate-500 leading-relaxed">
                        {t.disclaimer}
                    </p>
                </div>
            </div>
        </section>
    )
}
