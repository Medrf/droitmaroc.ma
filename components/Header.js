'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/lib/language'

export default function Header() {
    const { language, setLanguage } = useLanguage()
    const pathname = usePathname()

    const navItems = [
        { href: '/', label: 'Accueil', labelAr: 'الرئيسية' },
        { href: '/chat', label: 'Assistant juridique', labelAr: 'المساعد القانوني' },
        { href: '/search', label: 'Guides juridiques', labelAr: 'الأدلة القانونية' },
        { href: '/contracts/audit', label: 'Audit de contrats', labelAr: 'تدقيق العقود' },
        { href: '/contracts', label: 'Rédaction', labelAr: 'صياغة العقود' },
    ]

    const isActive = (href) => {
        if (href === '/') return pathname === '/'
        return pathname.startsWith(href)
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F172A] border-b border-slate-800">
            <div className="container-main">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center py-4">
                        <Image
                            src="/logo.png"
                            alt="droitmaroc"
                            width={200}
                            height={52}
                            className="h-12 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(item.href)
                                    ? 'bg-slate-800 text-white'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                                    }`}
                            >
                                {language === 'ar' ? item.labelAr : item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Side */}
                    <div className="flex items-center gap-3">
                        {/* Language Toggle */}
                        <div className="flex items-center bg-slate-800 rounded-lg p-1">
                            <button
                                onClick={() => setLanguage('fr')}
                                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${language === 'fr'
                                    ? 'bg-slate-700 text-white'
                                    : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                FR
                            </button>
                            <button
                                onClick={() => setLanguage('ar')}
                                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${language === 'ar'
                                    ? 'bg-slate-700 text-white'
                                    : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                ع
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button className="lg:hidden p-2 text-slate-400 hover:text-white">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}
