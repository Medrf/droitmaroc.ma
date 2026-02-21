'use client'

import AppLayout from '@/components/AppLayout'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useLanguage, translations } from '@/lib/language'
import { UserButton, useUser } from '@clerk/nextjs'
import { MessageSquareText, BookOpen, SearchCheck, FileSignature, ArrowRight, Zap } from 'lucide-react'

export default function Dashboard() {
    const { language } = useLanguage()
    const t = translations[language]
    const { user, isLoaded } = useUser()

    const services = [
        {
            href: '/chat',
            icon: <MessageSquareText className="w-8 h-8 text-primary mb-4" />,
            title: t.feature1Title,
            description: t.feature1Desc
        },
        {
            href: '/search',
            icon: <BookOpen className="w-8 h-8 text-primary mb-4" />,
            title: t.feature2Title,
            description: t.feature2Desc
        },
        {
            href: '/contracts/audit',
            icon: <SearchCheck className="w-8 h-8 text-primary mb-4" />,
            title: t.feature4Title,
            description: t.feature4Desc
        },
        {
            href: '/contracts',
            icon: <FileSignature className="w-8 h-8 text-primary mb-4" />,
            title: t.feature3Title,
            description: t.feature3Desc
        }
    ]

    const firstName = isLoaded && user && user.firstName ? ` ${user.firstName}` : ''
    const greeting = language === 'ar'
        ? `مرحباً${firstName}، كيف يمكننا مساعدتك اليوم؟`
        : `Bonjour${firstName}, comment pouvons-nous vous aider aujourd'hui ?`

    return (
        <AppLayout>
            <div className="min-h-screen flex flex-col bg-background text-foreground">
                <main className="flex-1">
                    {/* Header Section */}
                    <div className="border-b border-border bg-card/50">
                        <div className="max-w-6xl mx-auto px-6 py-8 md:py-12">
                            <div className="flex justify-between items-start md:items-center mb-2">
                                <div>
                                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-3 text-card-foreground">
                                        {greeting}
                                    </h1>
                                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                                        {t.heroSubtext}
                                    </p>
                                </div>
                                <div className="hidden md:block">
                                    <UserButton
                                        afterSignOutUrl="/"
                                        appearance={{
                                            elements: {
                                                avatarBox: 'w-12 h-12 border-2 border-border shadow-sm',
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="max-w-6xl mx-auto px-6 py-12">
                        <div className="flex items-center gap-2 mb-8">
                            <Zap className="w-5 h-5 text-primary" />
                            <h2 className="text-xl font-semibold tracking-tight">
                                {t.featuresTitle}
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {services.map((service, index) => (
                                <Link
                                    key={index}
                                    href={service.href}
                                    className="group relative flex flex-col p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300 overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-150" />

                                    <div className="relative z-10 flex flex-col h-full">
                                        {service.icon}
                                        <h3 className="text-xl font-semibold mb-3 text-card-foreground group-hover:text-primary transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed mb-8 flex-1">
                                            {service.description}
                                        </p>

                                        <div className="mt-auto flex items-center text-sm font-semibold text-primary opacity-80 group-hover:opacity-100 transition-opacity">
                                            {language === 'ar' ? 'ابدأ الاستخدام' : 'Commencer'}
                                            <ArrowRight className={`w-4 h-4 ${language === 'ar' ? 'mr-2 rotate-180' : 'ml-2'} group-hover:translate-x-1 transition-transform`} />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Disclaimer */}
                        <div className="mt-16 p-6 rounded-2xl bg-muted/30 border border-border text-center">
                            <p className="text-sm text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                                {t.disclaimer}
                            </p>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </AppLayout>
    )
}
