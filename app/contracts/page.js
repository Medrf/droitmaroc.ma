'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/language'
import AppLayout from '@/components/AppLayout'
import Footer from '@/components/Footer'
import ContractForm from '@/components/ContractForm'
import PaywallModal from '@/components/PaywallModal'

export default function ContractsPage() {
    const { language } = useLanguage()
    const [generatedContract, setGeneratedContract] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [currentLanguage, setCurrentLanguage] = useState('fr')

    // Paywall State
    const [showPaywall, setShowPaywall] = useState(false)

    const handleGenerate = async (formData) => {
        setIsLoading(true)
        setError('')
        setCurrentLanguage(formData.language)

        try {
            const response = await fetch('/api/contracts/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            if (response.status === 402) {
                setShowPaywall(true)
                setIsLoading(false)
                return
            }

            if (!response.ok) {
                throw new Error(data.error || 'Erreur lors de la génération')
            }

            setGeneratedContract(data)

            // Refresh credits
            window.dispatchEvent(new Event('credit_updated'))
        } catch (err) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    const handleReset = () => {
        setGeneratedContract(null)
        setError('')
    }

    return (
        <AppLayout>
            <div className="min-h-screen flex flex-col">
                <main className="flex-1">
                    {/* Page Header */}
                    {!generatedContract && (
                        <section className="py-12">
                            <div className="container-main text-center">
                                <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
                                    {language === 'ar' ? 'صياغة العقود' : 'Rédaction de contrats'}
                                </h1>
                                <p className="text-slate-400 max-w-xl mx-auto">
                                    {language === 'ar'
                                        ? 'أنشئ نماذج عقود متوافقة مع الإطار القانوني المغربي'
                                        : 'Générez des modèles de contrats conformes au cadre juridique marocain'}
                                </p>
                            </div>
                        </section>
                    )}

                    {/* Content */}
                    <section className="pb-12">
                        <div className="container-main max-w-3xl">
                            {/* Error Display */}
                            {error && (
                                <div className="mb-6 bg-red-900/20 border border-red-800/50 rounded-xl p-4 flex items-center gap-3">
                                    <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-red-300 text-sm">{error}</p>
                                </div>
                            )}

                            {/* Form or Output */}
                            {!generatedContract ? (
                                <ContractForm onGenerate={handleGenerate} isLoading={isLoading} />
                            ) : (
                                <div className="space-y-4">
                                    {/* Back Button */}
                                    <button
                                        onClick={handleReset}
                                        className="inline-flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white rounded-full border border-slate-700 hover:border-slate-600 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                        <span>{currentLanguage === 'ar' ? 'عقد جديد' : 'Nouveau contrat'}</span>
                                    </button>

                                    <ContractOutput
                                        contract={generatedContract.contract}
                                        disclaimer={generatedContract.disclaimer}
                                        watermark={generatedContract.watermark}
                                        language={currentLanguage}
                                    />
                                </div>
                            )}
                        </div>
                    </section>
                </main>

                <Footer />

                {/* Paywall Modal */}
                <PaywallModal
                    isOpen={showPaywall}
                    onClose={() => setShowPaywall(false)}
                />
            </div>
        </AppLayout>
    )
}
