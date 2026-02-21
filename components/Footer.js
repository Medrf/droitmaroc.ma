'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage, translations } from '@/lib/language'

export default function Footer() {
    const { language } = useLanguage()
    const t = translations[language]

    return (
        <footer className="border-t border-slate-800/50 bg-[#0F172A]">
            <div className="container-main py-8">
                <div className="flex flex-col gap-4">
                    {/* Main Footer Content */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Logo & Copyright */}
                        <div className="flex items-center gap-3">
                            <Image
                                src="/logo.png"
                                alt="Loidumaroc"
                                width={160}
                                height={40}
                                className="h-9 w-auto object-contain"
                            />
                        </div>

                        {/* Links */}
                        <div className="flex items-center gap-6 text-sm text-slate-500">
                            <Link href="/" className="hover:text-white transition-colors">
                                {t.home}
                            </Link>
                            <Link href="/chat" className="hover:text-white transition-colors">
                                {t.feature1Title}
                            </Link>
                            <Link href="/search" className="hover:text-white transition-colors">
                                {t.feature2Title}
                            </Link>
                            <span className="text-slate-700">|</span>
                            <Link href="#" className="hover:text-white transition-colors">
                                {language === 'ar' ? 'إشعارات قانونية' : 'Mentions légales'}
                            </Link>
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="pt-3 border-t border-slate-800/50">
                        <p className="text-xs text-slate-600 text-center">
                            {t.disclaimer}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
