'use client'

import { useState } from 'react'
import { CONTRACT_EXAMPLES } from '@/lib/contracts'

export default function ContractForm({ onGenerate, isLoading }) {
    const [language, setLanguage] = useState('fr')
    const [contractRequest, setContractRequest] = useState('')

    const labels = {
        fr: {
            languageLabel: 'Langue du contrat',
            french: 'Français',
            arabic: 'العربية',
            placeholder: 'Décrivez le type de contrat souhaité...\n\nExemple: Contrat de travail CDI pour un développeur web, contrat de location, contrat de prestation de services...',
            examples: 'Exemples',
            generate: 'Générer le contrat',
            generating: 'Génération...',
            warning: 'Ce générateur crée un modèle à titre informatif. Il ne remplace pas une consultation juridique.',
            minLength: 'Décrivez votre contrat (minimum 5 caractères)'
        },
        ar: {
            languageLabel: 'لغة العقد',
            french: 'Français',
            arabic: 'العربية',
            placeholder: 'صف نوع العقد المطلوب...\n\nمثال: عقد شغل غير محدد المدة لمطور ويب، عقد كراء، عقد خدمات...',
            examples: 'أمثلة',
            generate: 'إنشاء العقد',
            generating: 'جاري الإنشاء...',
            warning: 'هذا المولد ينشئ نموذج لأغراض معلوماتية فقط. لا يغني عن استشارة قانونية.',
            minLength: 'صف عقدك (5 أحرف كحد أدنى)'
        }
    }

    const t = labels[language]
    const examples = CONTRACT_EXAMPLES[language]

    const handleSubmit = (e) => {
        e.preventDefault()
        if (contractRequest.trim().length < 5) return

        onGenerate({
            contractRequest: contractRequest.trim(),
            language
        })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Warning */}
            <div className="disclaimer flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-sm text-slate-400">{t.warning}</p>
            </div>

            {/* Language Selection */}
            <div className="card">
                <label className="label">{t.languageLabel}</label>
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => setLanguage('fr')}
                        className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors font-medium ${language === 'fr'
                                ? 'bg-emerald-600/20 border-emerald-500 text-white'
                                : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                            }`}
                    >
                        {t.french}
                    </button>
                    <button
                        type="button"
                        onClick={() => setLanguage('ar')}
                        className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors font-medium ${language === 'ar'
                                ? 'bg-emerald-600/20 border-emerald-500 text-white'
                                : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                            }`}
                    >
                        {t.arabic}
                    </button>
                </div>
            </div>

            {/* Contract Request */}
            <div className="card">
                <label className="label">Description du contrat</label>
                <textarea
                    value={contractRequest}
                    onChange={(e) => setContractRequest(e.target.value)}
                    placeholder={t.placeholder}
                    rows={5}
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                    className="textarea"
                />
                {contractRequest.length > 0 && contractRequest.length < 5 && (
                    <p className="text-amber-400 text-xs mt-2">{t.minLength}</p>
                )}

                {/* Examples */}
                <div className="mt-4">
                    <span className="text-xs text-slate-500 mb-2 block">{t.examples} :</span>
                    <div className="flex flex-wrap gap-2">
                        {examples.map((example, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setContractRequest(example)}
                                className="px-3 py-1 text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full text-slate-400 hover:text-white transition-colors"
                            >
                                {example}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={isLoading || contractRequest.trim().length < 5}
                className="btn-primary w-full flex items-center justify-center gap-2"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        <span>{t.generating}</span>
                    </>
                ) : (
                    <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>{t.generate}</span>
                    </>
                )}
            </button>
        </form>
    )
}
