'use client'

import Link from 'next/link'
import Sidebar from '@/components/Sidebar'
import { useState } from 'react'
import { Check } from 'lucide-react'

export default function PricingPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const plans = [
        {
            name: 'Gratuit',
            price: '0 DH',
            period: '/ mois',
            credits: '7 crédits',
            features: [
                'Accès basique à l\'IA',
                'Génération de contrats (limité)',
                'Recherche juridique',
                'Support communautaire'
            ],
            cta: 'Plan actuel',
            current: true,
            color: 'bg-slate-800'
        },
        {
            name: 'Starter',
            price: '99 DH',
            period: '/ mois',
            credits: '50 crédits',
            popular: true,
            features: [
                '50 crédits quotidiens',
                'Génération de contrats illimitée',
                'Audit de contrats',
                'Réponses prioritaires',
                'Support email'
            ],
            cta: 'Choisir Starter',
            color: 'bg-amber-600'
        },
        {
            name: 'Pro',
            price: '299 DH',
            period: '/ mois',
            credits: '200 crédits',
            features: [
                '200 crédits quotidiens',
                'Toutes les fonctionnalités Starter',
                'Accès API (bientôt)',
                'Support dédié 24/7',
                'Formation personnalisée'
            ],
            cta: 'Choisir Pro',
            color: 'bg-slate-800'
        }
    ]

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <div className="flex-1 lg:ml-64 p-4 md:p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="lg:hidden p-2 text-slate-400 hover:text-white"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <div className="text-right w-full lg:w-auto">
                        <Link href="/dashboard" className="text-sm text-slate-400 hover:text-amber-500 transition-colors">
                            Retour au tableau de bord
                        </Link>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-500 mb-4">
                            Nos Offres d'Abonnement
                        </h1>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Choisissez le plan qui correspond à vos besoins juridiques. Changez ou annulez à tout moment.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan) => (
                            <div key={plan.name} className={`relative rounded-2xl p-8 border ${plan.popular ? 'border-amber-500/50 shadow-lg shadow-amber-500/10' : 'border-slate-800 bg-slate-900/50'}`}>
                                {plan.popular && (
                                    <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                                        <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                            Recommandé
                                        </span>
                                    </div>
                                )}

                                <h3 className="text-xl font-bold text-slate-100 mb-2">{plan.name}</h3>
                                <div className="flex items-baseline mb-6">
                                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                                    <span className="text-slate-500 ml-2">{plan.period}</span>
                                </div>
                                <div className="mb-6 font-medium text-amber-400">
                                    {plan.credits} <span className="text-slate-500 text-sm font-normal">/ jour</span>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <Check className="w-5 h-5 text-amber-500 mr-3 shrink-0" />
                                            <span className="text-slate-300 text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    className={`w-full py-3 rounded-xl font-medium transition-all ${plan.current
                                        ? 'bg-slate-800 text-slate-400 cursor-default border border-slate-700'
                                        : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white shadow-lg shadow-amber-500/20'
                                        }`}
                                >
                                    {plan.cta}
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center border-t border-slate-800 pt-10">
                        <p className="text-slate-500 text-sm">
                            Besoin d'une solution sur mesure pour votre cabinet ? <a href="#" className="text-amber-500 hover:underline">Contactez-nous</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
