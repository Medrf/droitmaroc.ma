'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage, translations } from '@/lib/language'
import { SignedIn, SignedOut } from '@clerk/nextjs'

export default function LandingHeader() {
    const { language, setLanguage } = useLanguage()
    const t = translations[language]
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="relative z-50 bg-white border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between py-4">
                    <Link href="/" className="flex items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/logo.png"
                            alt="droitmaroc"
                            className="h-32 md:h-48 w-auto object-contain"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Language Toggle */}
                        <div className="flex items-center border border-border rounded-md p-0.5 mr-2">
                            <button
                                onClick={() => setLanguage('fr')}
                                className={`px-3 py-1.5 text-small font-medium rounded transition-colors ${language === 'fr'
                                    ? 'bg-text-primary text-white'
                                    : 'text-text-secondary hover:text-text-primary'
                                    }`}
                            >
                                FR
                            </button>
                            <button
                                onClick={() => setLanguage('ar')}
                                className={`px-3 py-1.5 text-small font-medium rounded transition-colors ${language === 'ar'
                                    ? 'bg-text-primary text-white'
                                    : 'text-text-secondary hover:text-text-primary'
                                    }`}
                            >
                                عربي
                            </button>
                        </div>

                        {/* Auth Buttons - Auth Aware */}
                        <SignedOut>
                            <Link
                                href="/sign-in"
                                className="px-4 py-2 text-small font-medium text-text-primary hover:text-accent-primary transition-colors"
                            >
                                {language === 'ar' ? 'تسجيل الدخول' : 'Connexion'}
                            </Link>
                            <Link
                                href="/sign-up"
                                className="px-5 py-2.5 text-small font-semibold bg-accent-primary hover:bg-accent-primary-hover text-white rounded-md transition-all"
                            >
                                {language === 'ar' ? 'إنشاء حساب' : 'Créer un compte'}
                            </Link>
                        </SignedOut>
                        <SignedIn>
                            <Link
                                href="/dashboard"
                                className="px-5 py-2.5 text-small font-semibold bg-accent-primary hover:bg-accent-primary-hover text-white rounded-md transition-all"
                            >
                                {language === 'ar' ? 'الوصول إلى لوحة التحكم' : 'Accéder au tableau de bord'}
                            </Link>
                        </SignedIn>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-text-secondary hover:text-text-primary"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border">
                        <div className="flex flex-col gap-3">
                            {/* Language Toggle */}
                            <div className="flex items-center gap-2 px-1">
                                <button
                                    onClick={() => setLanguage('fr')}
                                    className={`flex-1 py-2 text-small font-medium rounded border transition-colors ${language === 'fr'
                                        ? 'bg-text-primary text-white border-text-primary'
                                        : 'text-text-secondary border-border hover:border-text-muted'
                                        }`}
                                >
                                    Français
                                </button>
                                <button
                                    onClick={() => setLanguage('ar')}
                                    className={`flex-1 py-2 text-small font-medium rounded border transition-colors ${language === 'ar'
                                        ? 'bg-text-primary text-white border-text-primary'
                                        : 'text-text-secondary border-border hover:border-text-muted'
                                        }`}
                                >
                                    العربية
                                </button>
                            </div>

                            {/* Auth Links - Auth Aware */}
                            <SignedOut>
                                <Link
                                    href="/sign-in"
                                    className="py-2.5 text-center text-body font-medium text-text-primary border border-border rounded-md hover:bg-background transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {language === 'ar' ? 'تسجيل الدخول' : 'Connexion'}
                                </Link>
                                <Link
                                    href="/sign-up"
                                    className="py-2.5 text-center text-body font-semibold bg-accent-primary hover:bg-accent-primary-hover text-white rounded-md transition-all"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {language === 'ar' ? 'إنشاء حساب' : 'Créer un compte'}
                                </Link>
                            </SignedOut>
                            <SignedIn>
                                <Link
                                    href="/dashboard"
                                    className="py-2.5 text-center text-body font-semibold bg-accent-primary hover:bg-accent-primary-hover text-white rounded-md transition-all"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {language === 'ar' ? 'الوصول إلى لوحة التحكم' : 'Accéder au tableau de bord'}
                                </Link>
                            </SignedIn>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}

