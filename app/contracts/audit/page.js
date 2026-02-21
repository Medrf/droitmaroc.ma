'use client'

import { useState, useRef, useEffect } from 'react'
import AppLayout from '@/components/AppLayout'
import Footer from '@/components/Footer'
import ChatMessage, { TypingIndicator } from '@/components/ChatMessage'
import { useLanguage } from '@/lib/language'
import { Send, Loader2, UploadCloud, FileText, CheckCircle2, ArrowRight, X } from 'lucide-react'

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
                            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                                {language === 'ar' ? 'تدقيق العقود' : 'Audit interactif des contrats'}
                            </h1>
                            <p className="text-muted-foreground max-w-xl mx-auto">
                                {language === 'ar'
                                    ? 'قم بتحميل عقدك واطرح أسئلة حول البنود والمخاطر المحتملة'
                                    : 'Chargez votre contrat et posez des questions sur les clauses et points de vigilance'}
                            </p>

                            {/* Step Indicator */}
                            <div className="flex items-center justify-center gap-4 mt-6">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>1</div>
                                <div className={`w-12 h-0.5 transition-colors ${step >= 2 ? 'bg-primary' : 'bg-border'}`}></div>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>2</div>
                            </div>
                            <div className="flex items-center justify-center gap-8 mt-2 text-xs text-muted-foreground">
                                <span className={step >= 1 ? 'text-primary' : ''}>{language === 'ar' ? 'تحميل' : 'Upload'}</span>
                                <span className={step >= 2 ? 'text-primary' : ''}>{language === 'ar' ? 'تحليل' : 'Analyse'}</span>
                            </div>
                        </div>
                    </section>

                    {/* Step 1: Upload */}
                    {step === 1 && (
                        <section className="pb-12">
                            <div className="container-main max-w-2xl">
                                <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                                    {/* File Upload */}
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            {language === 'ar' ? 'تحميل ملف PDF' : 'Télécharger un PDF'}
                                        </label>
                                        <div
                                            className={`flex justify-center px-6 py-8 border-2 border-dashed rounded-xl transition-colors cursor-pointer ${file
                                                ? 'border-primary/50 bg-primary/5'
                                                : 'border-border hover:border-primary/50 hover:bg-muted/50'
                                                }`}
                                        >
                                            <div className="text-center">
                                                {file ? (
                                                    <div className="flex items-center gap-2 text-primary">
                                                        <CheckCircle2 className="w-5 h-5" />
                                                        <span className="font-medium">{file.name}</span>
                                                        <button
                                                            onClick={(e) => { e.preventDefault(); setFile(null) }}
                                                            className="ml-2 text-muted-foreground hover:text-destructive"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground" />
                                                        <div className="mt-2 text-sm text-muted-foreground">
                                                            <label htmlFor="file-upload" className="cursor-pointer font-semibold text-primary hover:text-primary/80">
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
                                                        <p className="text-xs text-muted-foreground/80 mt-1">PDF (texte uniquement)</p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="relative flex py-4 items-center">
                                        <div className="flex-grow border-t border-border"></div>
                                        <span className="flex-shrink mx-4 text-muted-foreground text-xs uppercase">
                                            {language === 'ar' ? 'أو' : 'ou'}
                                        </span>
                                        <div className="flex-grow border-t border-border"></div>
                                    </div>

                                    {/* Text Input */}
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            {language === 'ar' ? 'أو الصق نص العقد' : 'Ou collez le texte'}
                                        </label>
                                        <textarea
                                            value={contractText}
                                            onChange={(e) => {
                                                setContractText(e.target.value)
                                                setFile(null)
                                            }}
                                            disabled={!!file}
                                            className={`w-full px-4 py-3 bg-muted/50 border border-border rounded-xl text-foreground placeholder:-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all min-h-[200px] resize-none ${file ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                                            className="w-full py-3 px-6 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {isExtracting ? (
                                                <>
                                                    <Loader2 className="animate-spin h-5 w-5" />
                                                    <span>{language === 'ar' ? 'جارٍ الاستخراج...' : 'Extraction...'}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>{language === 'ar' ? 'بدء التحليل' : 'Commencer l\'audit'}</span>
                                                    <ArrowRight className="w-4 h-4" />
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
                                <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-sm" style={{ height: '60vh', minHeight: '400px' }}>
                                    {/* Chat Header */}
                                    <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <FileText className="w-4 h-4 text-primary" />
                                            <span>
                                                {file
                                                    ? file.name
                                                    : `${contractText.length} ${language === 'ar' ? 'حرف' : 'caractères'}`}
                                            </span>
                                        </div>
                                        <button
                                            onClick={resetAudit}
                                            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
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
                                    <form onSubmit={handleSend} className="p-4 border-t border-border bg-muted/10">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={input}
                                                onChange={(e) => setInput(e.target.value)}
                                                placeholder={language === 'ar'
                                                    ? 'اطرح سؤالاً حول العقد...'
                                                    : 'Posez une question sur le contrat...'}
                                                className="flex-1 px-4 py-3 bg-background border border-border rounded-full text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                                            />
                                            <button
                                                type="submit"
                                                disabled={!input.trim() || isLoading}
                                                className="px-5 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                            >
                                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 -ml-0.5" />}
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                {/* Disclaimer */}
                                <div className="mt-4 p-4 rounded-xl bg-card border border-border text-center shadow-sm">
                                    <p className="text-sm text-muted-foreground">
                                        {language === 'ar'
                                            ? 'هذا التحليل على Loidumaroc.ma لأغراض إعلامية وعامة. لا يشكل استشارة قانونية شخصية.'
                                            : 'Cette analyse sur Loidumaroc.ma est fournie à titre informatif et général. Elle ne constitue pas un conseil juridique personnalisé.'}
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
