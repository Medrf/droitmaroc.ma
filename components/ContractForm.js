'use client'

import { useState } from 'react'
import { CONTRACT_EXAMPLES } from '@/lib/contracts'
import { AlertTriangle, Loader2, FileSignature } from 'lucide-react'

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
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">{t.warning}</p>
            </div>

            {/* Language Selection */}
            <div className="card">
                <label className="label">{t.languageLabel}</label>
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => setLanguage('fr')}
                        className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors font-medium ${language === 'fr'
                            ? 'bg-primary/20 border-primary text-primary'
                            : 'bg-background border-border text-muted-foreground hover:border-primary/50'
                            }`}
                    >
                        {t.french}
                    </button>
                    <button
                        type="button"
                        onClick={() => setLanguage('ar')}
                        className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors font-medium ${language === 'ar'
                            ? 'bg-primary/20 border-primary text-primary'
                            : 'bg-background border-border text-muted-foreground hover:border-primary/50'
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
                    <span className="text-xs text-muted-foreground mb-2 block">{t.examples} :</span>
                    <div className="flex flex-wrap gap-2">
                        {examples.map((example, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setContractRequest(example)}
                                className="px-3 py-1 text-xs bg-muted hover:bg-muted/80 border border-border rounded-full text-muted-foreground hover:text-foreground transition-colors"
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
                        <Loader2 className="animate-spin h-5 w-5" />
                        <span>{t.generating}</span>
                    </>
                ) : (
                    <>
                        <FileSignature className="w-5 h-5" />
                        <span>{t.generate}</span>
                    </>
                )}
            </button>
        </form>
    )
}
