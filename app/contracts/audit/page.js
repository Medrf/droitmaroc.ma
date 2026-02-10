'use client'

import { useState, useRef, useEffect } from 'react'
import AppLayout from '@/components/AppLayout'
import Footer from '@/components/Footer'
import ChatMessage, { TypingIndicator } from '@/components/ChatMessage'
import { useLanguage } from '@/lib/language'

export default function ContractAuditPage() {
    const { language } = useLanguage()

    // State
    const [step, setStep] = useState(1) // 1: Upload, 2: Chat
    const [contractText, setContractText] = useState('')
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [file, setFile] = useState(null)
    const [isExtracting, setIsExtracting] = useState(false)

    // Refs
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isLoading])

    const handleStartAudit = async () => {
        if (file) {
            setIsExtracting(true)
            try {
                const fd = new FormData()
                fd.append("file", file)

                const res = await fetch("/api/extract-pdf", {
                    method: "POST",
                    body: fd
                })

                const data = await res.json()

                if (!res.ok) {
                    throw new Error(data.error || "Erreur extraction PDF")
                }

                setContractText(data.contractText)
                startChat(data.contractText)
            } catch (e) {
                alert(e.message)
            } finally {
                setIsExtracting(false)
            }
        } else if (contractText.trim()) {
            startChat(contractText)
        }
    }

    const startChat = (text) => {
        setStep(2)
        setMessages([{
            role: 'assistant',
            content: language === 'ar'
                ? "تم تحميل العقد بنجاح. يمكنك الآن طرح أسئلتك حول هذا المستند."
                : "Contrat chargé. Je suis prêt à l'analyser selon le droit marocain. Quelle est votre question ?"
        }])
    }

    const handleSend = async (e) => {
        e.preventDefault()
        if (!input.trim() || isLoading) return

        const userMsg = { role: 'user', content: input }
        const newMessages = [...messages, userMsg]

        setMessages(newMessages)
        setInput('')
        setIsLoading(true)

        try {
            const response = await fetch('/api/contracts/audit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMsg.content,
                    contractText: contractText,
                    history: messages
                })
            })

            if (!response.ok) throw new Error('Erreur réseau')

            const data = await response.json()
            setMessages([...newMessages, { role: 'assistant', content: data.response }])
        } catch (error) {
            console.error(error)
            setMessages([...newMessages, {
                role: 'assistant',
                content: language === 'ar'
                    ? "⚠️ حدث خطأ. يرجى المحاولة مرة أخرى."
                    : "⚠️ Une erreur est survenue. Veuillez réessayer."
            }])
        } finally {
            setIsLoading(false)
        }
    }

    const resetAudit = () => {
        setStep(1)
        setContractText('')
        setFile(null)
        setMessages([])
    }

    return (
        <AppLayout>
            <div className="min-h-screen flex flex-col">
                <main className="flex-1">
                    {/* Page Header */}
                    <section className="py-12">
                        <div className="container-main text-center">
                            <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
                                {language === 'ar' ? 'تدقيق العقود' : 'Audit interactif des contrats'}
                            </h1>
                            <p className="text-slate-400 max-w-xl mx-auto">
                                {language === 'ar'
                                    ? 'قم بتحميل عقدك واطرح أسئلة حول البنود والمخاطر المحتملة'
                                    : 'Chargez votre contrat et posez des questions sur les clauses et points de vigilance'}
                            </p>

                            {/* Step Indicator */}
                            <div className="flex items-center justify-center gap-4 mt-6">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${step >= 1 ? 'bg-amber-500 text-white' : 'bg-slate-700 text-slate-400'}`}>1</div>
                                <div className={`w-12 h-0.5 transition-colors ${step >= 2 ? 'bg-amber-500' : 'bg-slate-700'}`}></div>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${step >= 2 ? 'bg-amber-500 text-white' : 'bg-slate-700 text-slate-400'}`}>2</div>
                            </div>
                            <div className="flex items-center justify-center gap-8 mt-2 text-xs text-slate-500">
                                <span>{language === 'ar' ? 'تحميل' : 'Upload'}</span>
                                <span>{language === 'ar' ? 'تحليل' : 'Analyse'}</span>
                            </div>
                        </div>
                    </section>

                    {/* Step 1: Upload */}
                    {step === 1 && (
                        <section className="pb-12">
                            <div className="container-main max-w-2xl">
                                <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                                    {/* File Upload */}
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            {language === 'ar' ? 'تحميل ملف PDF' : 'Télécharger un PDF'}
                                        </label>
                                        <div
                                            className={`flex justify-center px-6 py-8 border-2 border-dashed rounded-xl transition-colors cursor-pointer ${file
                                                ? 'border-amber-500/50 bg-amber-500/5'
                                                : 'border-slate-700 hover:border-slate-600'
                                                }`}
                                        >
                                            <div className="text-center">
                                                {file ? (
                                                    <div className="flex items-center gap-2 text-amber-400">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span className="font-medium">{file.name}</span>
                                                        <button
                                                            onClick={(e) => { e.preventDefault(); setFile(null) }}
                                                            className="ml-2 text-slate-400 hover:text-red-400"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <svg className="mx-auto h-10 w-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                        </svg>
                                                        <div className="mt-2 text-sm text-slate-400">
                                                            <label htmlFor="file-upload" className="cursor-pointer text-amber-400 hover:text-amber-300">
                                                                {language === 'ar' ? 'اختر ملف' : 'Choisir un fichier'}
                                                            </label>
                                                            <input
                                                                id="file-upload"
                                                                type="file"
                                                                className="sr-only"
                                                                accept="application/pdf"
                                                                onChange={(e) => {
                                                                    setFile(e.target.files?.[0] || null)
                                                                    if (e.target.files?.[0]) setContractText('')
                                                                }}
                                                            />
                                                            <span className="ml-1">{language === 'ar' ? 'أو اسحب وأفلت' : 'ou glisser-déposer'}</span>
                                                        </div>
                                                        <p className="text-xs text-slate-600 mt-1">PDF (texte uniquement)</p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="relative flex py-4 items-center">
                                        <div className="flex-grow border-t border-slate-700"></div>
                                        <span className="flex-shrink mx-4 text-slate-600 text-xs uppercase">
                                            {language === 'ar' ? 'أو' : 'ou'}
                                        </span>
                                        <div className="flex-grow border-t border-slate-700"></div>
                                    </div>

                                    {/* Text Input */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            {language === 'ar' ? 'أو الصق نص العقد' : 'Ou collez le texte'}
                                        </label>
                                        <textarea
                                            value={contractText}
                                            onChange={(e) => {
                                                setContractText(e.target.value)
                                                setFile(null)
                                            }}
                                            disabled={!!file}
                                            className={`w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all min-h-[200px] resize-none ${file ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            placeholder={language === 'ar'
                                                ? 'المادة 1: موضوع العقد...'
                                                : 'Article 1 : Objet du contrat...'}
                                        />
                                    </div>

                                    {/* Submit */}
                                    <div className="mt-6">
                                        <button
                                            onClick={handleStartAudit}
                                            disabled={(!contractText.trim() && !file) || isExtracting}
                                            className="w-full py-3 px-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-full hover:from-amber-400 hover:to-orange-400 transition-all duration-200 shadow-lg shadow-amber-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {isExtracting ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                    </svg>
                                                    <span>{language === 'ar' ? 'جارٍ الاستخراج...' : 'Extraction...'}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>{language === 'ar' ? 'بدء التحليل' : 'Commencer l\'audit'}</span>
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Step 2: Chat */}
                    {step === 2 && (
                        <section className="pb-8">
                            <div className="container-main max-w-3xl">
                                <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden" style={{ height: '60vh', minHeight: '400px' }}>
                                    {/* Chat Header */}
                                    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/50 bg-slate-800/30">
                                        <div className="flex items-center gap-2 text-sm text-slate-400">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <span>
                                                {file
                                                    ? file.name
                                                    : `${contractText.length} ${language === 'ar' ? 'حرف' : 'caractères'}`}
                                            </span>
                                        </div>
                                        <button
                                            onClick={resetAudit}
                                            className="text-xs text-slate-500 hover:text-white transition-colors"
                                        >
                                            {language === 'ar' ? 'عقد جديد' : 'Nouveau contrat'}
                                        </button>
                                    </div>

                                    {/* Messages */}
                                    <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ height: 'calc(100% - 120px)' }}>
                                        {messages.map((msg, idx) => (
                                            <ChatMessage
                                                key={idx}
                                                message={msg.content}
                                                isUser={msg.role === 'user'}
                                            />
                                        ))}
                                        {isLoading && <TypingIndicator />}
                                        <div ref={messagesEndRef} />
                                    </div>

                                    {/* Input */}
                                    <form onSubmit={handleSend} className="p-4 border-t border-slate-700/50 bg-slate-800/30">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={input}
                                                onChange={(e) => setInput(e.target.value)}
                                                placeholder={language === 'ar'
                                                    ? 'اطرح سؤالاً حول العقد...'
                                                    : 'Posez une question sur le contrat...'}
                                                className="flex-1 px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-full text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                                            />
                                            <button
                                                type="submit"
                                                disabled={!input.trim() || isLoading}
                                                className="px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full hover:from-amber-400 hover:to-orange-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                </svg>
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                {/* Disclaimer */}
                                <div className="mt-4 p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 text-center">
                                    <p className="text-sm text-slate-500">
                                        {language === 'ar'
                                            ? 'هذا التحليل على droitmaroc.ma لأغراض إعلامية وعامة. لا يشكل استشارة قانونية شخصية.'
                                            : 'Cette analyse sur droitmaroc.ma est fournie à titre informatif et général. Elle ne constitue pas un conseil juridique personnalisé.'}
                                    </p>
                                </div>
                            </div>
                        </section>
                    )}
                </main>

                <Footer />
            </div>
        </AppLayout>
    )
}
