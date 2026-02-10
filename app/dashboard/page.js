'use client'

import AppLayout from '@/components/AppLayout'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useLanguage, translations } from '@/lib/language'
import { UserButton } from '@clerk/nextjs'

export default function Dashboard() {
    const { language } = useLanguage()
    const t = translations[language]

    const services = [
        {
            href: '/chat',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            ),
            title: t.feature1Title,
            description: t.feature1Desc
        },
        {
            href: '/search',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            ),
            title: t.feature2Title,
            description: t.feature2Desc
        },
        {
            href: '/contracts/audit',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: t.feature4Title,
            description: t.feature4Desc
        },
        {
            href: '/contracts',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            title: t.feature3Title,
            description: t.feature3Desc
        }
    ]

    return (
        <AppLayout>
            <div className="min-h-screen flex flex-col">
                <main className="flex-1">
                    {/* Hero Section */}
                    <section className="py-12 lg:py-16">
                        <div className="container-main text-center">
                            <div className="max-w-2xl mx-auto">
                                {/* User Button for logout */}
                                <div className="flex justify-end mb-6">
                                    <UserButton
                                        afterSignOutUrl="/"
                                        appearance={{
                                            elements: {
                                                avatarBox: 'w-10 h-10',
                                            }
                                        }}
                                    />
                                </div>
                                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
                                    {language === 'ar' ? 'مرحباً بك في droitmaroc' : 'Bienvenue sur droitmaroc'}
                                </h1>
                                <p className="text-base text-slate-400 mb-8 max-w-xl mx-auto">
                                    {t.heroSubtext}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Services Grid */}
                    <section className="pb-12">
                        <div className="container-main">
                            <h2 className="text-lg font-semibold text-slate-300 mb-6 text-center">
                                {t.featuresTitle}
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                                {services.map((service, index) => (
                                    <Link
                                        key={index}
                                        href={service.href}
                                        className="group p-5 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 hover:bg-slate-800 transition-all duration-200"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-slate-700/50 border border-slate-600/50 flex items-center justify-center text-slate-400 group-hover:border-slate-500 group-hover:text-white transition-all duration-200">
                                                {service.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-slate-200 transition-colors">
                                                    {service.title}
                                                </h3>
                                                <p className="text-sm text-slate-400">
                                                    {service.description}
                                                </p>
                                            </div>
                                            <svg className="w-5 h-5 text-slate-600 group-hover:text-slate-400 transition-colors mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Disclaimer */}
                    <section className="pb-12">
                        <div className="container-main">
                            <div className="max-w-2xl mx-auto">
                                <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 text-center">
                                    <p className="text-sm text-slate-500">
                                        {t.disclaimer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </AppLayout>
    )
}
