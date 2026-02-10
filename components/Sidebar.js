'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/lib/language'

// Navigation items configuration
const navItems = [
    {
        href: '/dashboard',
        labelFr: 'Tableau de bord',
        labelAr: 'لوحة التحكم',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        )
    },
    {
        href: '/chat',
        labelFr: 'Assistant juridique',
        labelAr: 'المساعد القانوني',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
        )
    },
    {
        href: '/search',
        labelFr: 'Guides juridiques',
        labelAr: 'الأدلة القانونية',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        )
    },
    {
        href: '/contracts/audit',
        labelFr: 'Audit interactif des contrats',
        labelAr: 'تدقيق العقود التفاعلي',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },
    {
        href: '/contracts',
        labelFr: 'Rédaction de contrats',
        labelAr: 'صياغة العقود',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        )
    }
]

// SidebarItem Component
function SidebarItem({ href, icon, label, isActive, onClick }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`
                group flex items-center gap-3 px-4 py-3 rounded-xl
                transition-all duration-200 ease-out
                focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:ring-offset-2 focus:ring-offset-slate-900
                ${isActive
                    ? 'bg-slate-800 text-white border border-slate-700'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent hover:border-slate-700/50'
                }
            `}
        >
            <span className={`flex-shrink-0 transition-transform duration-200 ${!isActive && 'group-hover:scale-110'}`}>
                {icon}
            </span>
            <span className="font-medium text-sm truncate">
                {label}
            </span>
        </Link>
    )
}

// Main Sidebar Component
export default function Sidebar({ isOpen, onClose }) {
    const pathname = usePathname()
    const { language } = useLanguage()

    const isActive = (href) => {
        if (href === '/') return pathname === '/'
        if (href === '/contracts') return pathname === '/contracts'
        return pathname.startsWith(href)
    }

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed top-0 left-0 z-50 h-full w-[280px]
                    bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950
                    border-r border-slate-800/50
                    flex flex-col
                    transition-transform duration-300 ease-out
                    lg:translate-x-0
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                {/* Logo Section - Dark Navy Background */}
                <div className="flex items-center justify-between px-6 py-6 border-b border-slate-800/50 bg-[#0F172A]">
                    <Link href="/" className="flex items-center" onClick={onClose}>
                        <Image
                            src="/logo.png"
                            alt="droitmaroc"
                            width={220}
                            height={56}
                            className="h-14 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Mobile Close Button */}
                    <button
                        onClick={onClose}
                        className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                        aria-label="Fermer le menu"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <SidebarItem
                            key={item.href}
                            href={item.href}
                            icon={item.icon}
                            label={language === 'ar' ? item.labelAr : item.labelFr}
                            isActive={isActive(item.href)}
                            onClick={onClose}
                        />
                    ))}
                </nav>

                {/* Footer Section */}
                <div className="px-4 py-4 border-t border-slate-800/50">
                    {/* Language Toggle */}
                    <div className="flex items-center justify-center gap-1 mb-4 bg-slate-800/50 rounded-full p-1">
                        <LanguageButton lang="fr" />
                        <LanguageButton lang="ar" />
                    </div>

                    {/* Logout Button */}
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 mb-4 text-sm font-medium text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700 border border-slate-700/50 rounded-lg transition-all"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        {language === 'ar' ? 'تسجيل الخروج' : 'Déconnexion'}
                    </Link>

                    {/* Disclaimer */}
                    <p className="text-xs text-slate-600 text-center leading-relaxed">
                        {language === 'ar'
                            ? 'معلومات عامة فقط'
                            : 'Informations générales uniquement'}
                    </p>
                    <p className="text-xs text-slate-700 text-center mt-1">
                        © droitmaroc.ma
                    </p>
                </div>
            </aside>
        </>
    )
}

// Language Toggle Button
function LanguageButton({ lang }) {
    const { language, setLanguage } = useLanguage()
    const isActive = language === lang

    return (
        <button
            onClick={() => setLanguage(lang)}
            className={`
                px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200
                ${isActive
                    ? 'bg-slate-700 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }
            `}
        >
            {lang === 'fr' ? 'FR' : 'ع'}
        </button>
    )
}

// Mobile Header with Hamburger
export function MobileHeader({ onMenuClick }) {
    return (
        <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-[#0F172A] border-b border-slate-800 lg:hidden">
            <div className="flex items-center justify-between h-full px-4">
                <button
                    onClick={onMenuClick}
                    className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                    aria-label="Ouvrir le menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <Link href="/" className="flex items-center">
                    <Image
                        src="/logo.png"
                        alt="droitmaroc"
                        width={160}
                        height={40}
                        className="h-10 w-auto object-contain"
                        priority
                    />
                </Link>

                <div className="w-10" /> {/* Spacer for centering */}
            </div>
        </header>
    )
}
