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
        amber: 'bg-amber-900/30 border-amber-700/50 text-amber-400',
        red: 'bg-red-900/30 border-red-700/50 text-red-400',
        blue: 'bg-blue-900/30 border-blue-700/50 text-blue-400',
        purple: 'bg-purple-900/30 border-purple-700/50 text-purple-400',
        orange: 'bg-orange-900/30 border-orange-700/50 text-orange-400',
        slate: 'bg-slate-800 border-slate-700 text-slate-400'
    }

    return (
        <AppLayout>
            <div className="min-h-screen flex flex-col">
                <main className="flex-1">
                    {/* Page Header */}
                    <section className="py-12">
                        <div className="container-main text-center">
                            <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
                                {language === 'ar' ? 'الأدلة القانونية' : 'Guides juridiques'}
                            </h1>
                            <p className="text-slate-400 max-w-xl mx-auto">
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
                            <h2 className="text-lg font-medium text-slate-300 mb-4">
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
                                <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 text-center">
                                    <p className="text-sm text-slate-500">
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
