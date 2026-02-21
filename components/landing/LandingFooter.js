'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage, translations } from '@/lib/language'

export default function LandingFooter() {
    const { language } = useLanguage()
    const t = translations[language]
    const isRtl = language === 'ar'

    return (
        <footer className="py-12 bg-white border-t border-border" dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    {/* Logo & Tagline */}
                    <div className="md:col-span-2">
                        <Link href="/" className="inline-block mb-4">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/logo.png"
                                alt="Loidumaroc"
                                className="h-28 md:h-40 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-small text-text-secondary max-w-sm leading-relaxed">
                            {t.footerTagline}
                        </p>
                    </div>

                    {/* Links Column 1 */}
                    <div>
                        <h4 className="text-small font-semibold text-text-primary mb-4">
                            {language === 'ar' ? 'الخدمات' : 'Services'}
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/chat" className="text-small text-text-secondary hover:text-accent-primary transition-colors">
                                    {t.service1Title}
                                </Link>
                            </li>
                            <li>
                                <Link href="/search" className="text-small text-text-secondary hover:text-accent-primary transition-colors">
                                    {t.service2Title}
                                </Link>
                            </li>
                            <li>
                                <Link href="/contracts" className="text-small text-text-secondary hover:text-accent-primary transition-colors">
                                    {t.service4Title}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div>
                        <h4 className="text-small font-semibold text-text-primary mb-4">
                            {language === 'ar' ? 'قانوني' : 'Légal'}
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/legal" className="text-small text-text-secondary hover:text-accent-primary transition-colors">
                                    {t.legalNotice}
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-small text-text-secondary hover:text-accent-primary transition-colors">
                                    {t.privacyPolicy}
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-small text-text-secondary hover:text-accent-primary transition-colors">
                                    {t.terms}
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-small text-text-secondary hover:text-accent-primary transition-colors">
                                    {t.contact}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-small text-text-muted">{t.copyright}</p>
                        <p className="text-xs text-text-muted text-center md:text-right max-w-lg">
                            {t.footerDisclaimer}
                        </p>
                    </div>
                </div>
            </div>
        </footer >
    )
}
