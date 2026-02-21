'use client'

import AppLayout from '@/components/AppLayout'
import Footer from '@/components/Footer'
import LawSearch from '@/components/LawSearch'
import { useLanguage } from '@/lib/language'

export default function SearchPage() {
    const { language } = useLanguage()

    const codes = [
        {
            id: 'constitution',
            name: language === 'ar' ? 'الدستور' : 'Constitution',
            count: '80+',
            color: 'amber'
        },
        {
            id: 'code_penal',
            name: language === 'ar' ? 'القانون الجنائي' : 'Code Pénal',
            count: '100+',
            color: 'red'
        },
        {
            id: 'code_travail',
            name: language === 'ar' ? 'مدونة الشغل' : 'Code du Travail',
            count: '50+',
            color: 'blue'
        },
        {
            id: 'code_famille',
            name: language === 'ar' ? 'مدونة الأسرة' : 'Code de la Famille',
            count: '60+',
            color: 'purple'
        },
        {
            id: 'code_commerce',
            name: language === 'ar' ? 'مدونة التجارة' : 'Code de Commerce',
            count: '35+',
            color: 'orange'
        },
        {
            id: 'doc',
            name: language === 'ar' ? 'قانون الالتزامات' : 'Code des Obligations',
            count: '50+',
            color: 'slate'
        }
    ]

    const colorClasses = {
        amber: 'bg-amber-500/10 border-amber-500/20 text-amber-500',
        red: 'bg-destructive/10 border-destructive/20 text-destructive',
        blue: 'bg-primary/10 border-primary/20 text-primary',
        purple: 'bg-purple-500/10 border-purple-500/20 text-purple-500',
        orange: 'bg-orange-500/10 border-orange-500/20 text-orange-500',
        slate: 'bg-muted border-border text-foreground'
    }

    return (
        <AppLayout>
            <div className="min-h-screen flex flex-col">
                <main className="flex-1">
                    {/* Page Header */}
                    <section className="py-12">
                        <div className="container-main text-center">
                            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                                {language === 'ar' ? 'الأدلة القانونية' : 'Guides juridiques'}
                            </h1>
                            <p className="text-muted-foreground max-w-xl mx-auto">
                                {language === 'ar'
                                    ? 'تصفح القوانين المغربية بالعربية والفرنسية'
                                    : 'Consultez les textes juridiques marocains en arabe et en français'}
                            </p>
                        </div>
                    </section>

                    {/* Search Component */}
                    <section className="pb-12">
                        <LawSearch />
                    </section>

                    {/* Codes Overview */}
                    <section className="pb-12">
                        <div className="container-main">
                            <h2 className="text-lg font-medium text-muted-foreground mb-4">
                                {language === 'ar' ? 'النصوص المتاحة' : 'Textes disponibles'}
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                                {codes.map((code) => (
                                    <div
                                        key={code.id}
                                        className={`p-4 rounded-xl border ${colorClasses[code.color]} transition-colors`}
                                    >
                                        <div className="text-2xl font-bold mb-1">{code.count}</div>
                                        <div className="text-xs opacity-80">{code.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Disclaimer */}
                    <section className="pb-12">
                        <div className="container-main">
                            <div className="max-w-2xl mx-auto">
                                <div className="p-4 rounded-xl bg-card border border-border text-center shadow-sm">
                                    <p className="text-sm text-muted-foreground">
                                        {language === 'ar'
                                            ? 'المعلومات المقدمة على Loidumaroc.ma هي لأغراض إعلامية وعامة. لا تشكل استشارة قانونية شخصية.'
                                            : 'Les informations fournies sur Loidumaroc.ma sont à titre informatif et général. Elles ne constituent pas un conseil juridique personnalisé.'}
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
