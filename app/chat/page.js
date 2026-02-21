'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/lib/language'
import Sidebar, { MobileHeader } from '@/components/Sidebar'
import ChatInput from '@/components/ChatInput'
import ChatMessage, { TypingIndicator } from '@/components/ChatMessage'
import PaywallModal from '@/components/PaywallModal'
import { Bot, Scale, Search, FileSignature, MessageSquarePlus, Trash2 } from 'lucide-react'

// Helper to generate IDs
const generateId = () => Math.random().toString(36).substr(2, 9)

export default function ChatPage() {
    const { language } = useLanguage()

    // Navigation sidebar state
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    // Chat state
    const [messages, setMessages] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentChatId, setCurrentChatId] = useState(null)
    const [chats, setChats] = useState([])
    const [error, setError] = useState(null)

    // Paywall State
    const [showPaywall, setShowPaywall] = useState(false)
    const [resetTime, setResetTime] = useState(null)

    // Refs
    const messagesEndRef = useRef(null)

    // Feedback State
    const [correctionModalOpen, setCorrectionModalOpen] = useState(false)
    const [selectedMessageIndex, setSelectedMessageIndex] = useState(null)
    const [correctionText, setCorrectionText] = useState("")

    const handleFeedback = async (index, rating, correction = null) => {
        const message = messages[index]
        const query = messages[index - 1]?.content
        if (!message || !query) return;
        try {
            await fetch('/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query,
                    response: message.content,
                    rating,
                    correction
                })
            })
        } catch (e) {
            console.error("Error submitting feedback:", e)
        }
    }

    const openCorrectionModal = (index) => {
        setSelectedMessageIndex(index)
        setCorrectionText("")
        setCorrectionModalOpen(true)
    }

    const submitCorrection = async () => {
        if (selectedMessageIndex !== null) {
            await handleFeedback(selectedMessageIndex, -1, correctionText)
            setCorrectionModalOpen(false)
        }
    }

    // Load chats from LocalStorage on mount
    useEffect(() => {
        const savedChats = localStorage.getItem('legal_ai_chats')
        if (savedChats) {
            try {
                const parsedChats = JSON.parse(savedChats)
                setChats(parsedChats)
                if (parsedChats.length > 0) {
                    const lastId = localStorage.getItem('legal_ai_last_chat_id')
                    if (lastId) {
                        const chatToLoad = parsedChats.find(c => c.id === lastId)
                        if (chatToLoad) {
                            setCurrentChatId(chatToLoad.id)
                            setMessages(chatToLoad.messages)
                        } else {
                            startNewChat()
                        }
                    } else {
                        startNewChat()
                    }
                } else {
                    startNewChat()
                }
            } catch (e) {
                console.error('Error parsing chats:', e)
                startNewChat()
            }
        } else {
            startNewChat()
        }
    }, [])

    // Save chats whenever they change
    useEffect(() => {
        if (chats.length > 0) {
            localStorage.setItem('legal_ai_chats', JSON.stringify(chats))
        }
    }, [chats])

    // Save current chat ID
    useEffect(() => {
        if (currentChatId) {
            localStorage.setItem('legal_ai_last_chat_id', currentChatId)
        }
    }, [currentChatId])

    // Listen for global chat selection events from Sidebar
    useEffect(() => {
        const handleChatSelected = () => {
            const lastId = localStorage.getItem('legal_ai_last_chat_id')
            if (lastId) {
                loadChat(lastId)
            } else {
                startNewChat()
            }
        }
        window.addEventListener('legal_ai_chat_selected', handleChatSelected)
        return () => window.removeEventListener('legal_ai_chat_selected', handleChatSelected)
    }, [chats])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isLoading])

    const startNewChat = () => {
        const newId = generateId()
        const newChat = {
            id: newId,
            title: language === 'ar' ? 'محادثة جديدة' : 'Nouvelle conversation',
            timestamp: Date.now(),
            messages: []
        }
        setChats(prev => [newChat, ...prev])
        setCurrentChatId(newId)
        setMessages([])
        setIsSidebarOpen(false)
        setError(null)
    }

    const loadChat = (chatId) => {
        const chat = chats.find(c => c.id === chatId)
        if (chat) {
            setCurrentChatId(chatId)
            setMessages(chat.messages)
            setIsSidebarOpen(false)
            setError(null)
        }
    }

    const deleteChat = (e, chatId) => {
        e.stopPropagation()
        if (!window.confirm(language === 'ar' ? 'هل أنت متأكد أنك تريد حذف هذه المحادثة؟' : 'Supprimer cette conversation ?')) return
        const updatedChats = chats.filter(c => c.id !== chatId)
        setChats(updatedChats)
        localStorage.setItem('legal_ai_chats', JSON.stringify(updatedChats))
        if (currentChatId === chatId) {
            if (updatedChats.length > 0) {
                loadChat(updatedChats[0].id)
            } else {
                startNewChat()
            }
        }
    }

    const updateCurrentChat = (newMessages) => {
        setChats(prevChats => prevChats.map(chat => {
            if (chat.id === currentChatId) {
                let title = chat.title
                if (chat.messages.length === 0 && newMessages.length > 0) {
                    const firstMsg = newMessages.find(m => m.role === 'user')
                    if (firstMsg) {
                        title = firstMsg.content.slice(0, 40) + (firstMsg.content.length > 40 ? '...' : '')
                    }
                }
                return {
                    ...chat,
                    messages: newMessages,
                    title: title,
                    timestamp: Date.now()
                }
            }
            return chat
        }))
    }

    const handleSendMessage = async (message) => {
        setError(null)
        const userMsg = { role: 'user', content: message }
        const updatedMessages = [...messages, userMsg]

        setMessages(updatedMessages)
        updateCurrentChat(updatedMessages)
        setIsLoading(true)

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, history: messages }),
            })

            let data
            try {
                data = await response.json()
            } catch (e) {
                throw new Error(language === 'ar' ? "خطأ في الاتصال بالخادم (استجابة غير صالحة)" : "Erreur de communication avec le serveur (Réponse invalide)")
            }

            if (response.status === 402) {
                setResetTime(data.reset_at)
                setShowPaywall(true)
                setIsLoading(false)
                return
            }

            if (!response.ok) {
                throw new Error(data.message || (language === 'ar' ? `خطأ في الخادم: ${response.status}` : `Erreur serveur: ${response.status}`))
            }

            if (data.error) throw new Error(data.error)

            const assistantMsg = { role: 'assistant', content: data.response }
            const finalMessages = [...updatedMessages, assistantMsg]

            setMessages(finalMessages)
            updateCurrentChat(finalMessages)

            // Refresh credits
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new Event('credit_updated'))
            }
        } catch (error) {
            console.error('Error:', error)
            setError(error.message || (language === 'ar' ? 'حدث خطأ' : 'Une erreur est survenue'))
            const errorMsg = {
                role: 'assistant',
                content: `⚠️ ${error.message || (language === 'ar' ? 'حدث خطأ' : 'Une erreur est survenue')}`
            }
            const finalMessages = [...updatedMessages, errorMsg]
            setMessages(finalMessages)
            updateCurrentChat(finalMessages)
        } finally {
            setIsLoading(false)
        }
    }

    const handleNewChat = () => {
        startNewChat()
    }

    const handleClearConversation = () => {
        if (!window.confirm(language === 'ar' ? 'هل أنت متأكد أنك تريد مسح هذه المحادثة؟' : 'Voulez-vous vraiment effacer cette conversation ?')) return
        setMessages([])
        updateCurrentChat([])
    }

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleDateString(language === 'ar' ? 'ar-MA' : 'fr-MA', {
            month: 'short', day: 'numeric'
        })
    }

    return (
        <div className="min-h-screen bg-background flex flex-col lg:flex-row">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Main Content Viewport */}
            <div className="flex-1 flex flex-col min-h-screen lg:pl-[280px] transition-all duration-300">
                {/* Mobile Header wrapper */}
                <div className="lg:hidden shrink-0">
                    <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />
                </div>

                {/* Top Actions Bar (Desktop) */}
                <header className="hidden lg:flex shrink-0 items-center justify-between px-6 py-4 bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-30">
                    <h1 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <Scale className="w-5 h-5 text-primary" />
                        {language === 'ar' ? 'المساعد القانوني' : 'Assistant Juridique'}
                    </h1>
                    <div className="flex gap-2">
                        {messages.length > 1 && (
                            <button
                                onClick={handleClearConversation}
                                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors border border-transparent hover:border-destructive/20"
                            >
                                <Trash2 className="w-4 h-4" />
                                {language === 'ar' ? 'حذف المحادثة' : 'Effacer la conversation'}
                            </button>
                        )}
                        <button
                            onClick={handleNewChat}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg transition-colors shadow-sm"
                        >
                            <MessageSquarePlus className="w-4 h-4" />
                            {language === 'ar' ? 'محادثة جديدة' : 'Nouvelle conversation'}
                        </button>
                    </div>
                </header>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto px-4 py-6">
                    <div className="max-w-3xl mx-auto space-y-4">
                        {messages.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                                    <Scale className="w-8 h-8 text-primary" />
                                </div>
                                <h2 className="text-xl font-semibold text-foreground mb-2">
                                    {language === 'ar' ? 'كيف يمكنني مساعدتك؟' : 'Comment puis-je vous aider ?'}
                                </h2>
                                <p className="text-muted-foreground mb-8 max-w-md mx-auto text-sm">
                                    {language === 'ar'
                                        ? 'اطرح أسئلتك واحصل على معلومات عامة بناءً على الإطار القانوني المغربي.'
                                        : 'Posez vos questions et obtenez des informations générales basées sur le cadre juridique marocain.'}
                                </p>

                                <div className="grid gap-2 max-w-lg mx-auto">
                                    {[
                                        language === 'ar' ? 'ما هي شروط الفصل من العمل في المغرب؟' : 'Quelles sont les conditions de licenciement au Maroc ?',
                                        language === 'ar' ? 'ما هي حقوق المستأجر؟' : 'Quels sont les droits d\'un locataire ?',
                                        language === 'ar' ? 'كيف يعمل الطلاق في المغرب؟' : 'Comment fonctionne le divorce au Maroc ?'
                                    ].map((question, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSendMessage(question)}
                                            className="w-full p-3 text-left rounded-xl border border-border bg-card hover:bg-accent hover:border-primary/30 transition-all text-foreground hover:text-primary text-sm"
                                        >
                                            {question}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <>
                                {messages.map((msg, index) => (
                                    <ChatMessage
                                        key={index}
                                        message={msg.content}
                                        isUser={msg.role === 'user'}
                                        onLike={() => msg.role === 'assistant' && handleFeedback(index, 1)}
                                        onDislike={() => msg.role === 'assistant' && openCorrectionModal(index)}
                                    />
                                ))}
                                {isLoading && <TypingIndicator />}
                                <div ref={messagesEndRef} />
                            </>
                        )}
                    </div>
                </div>

                {/* Input Area */}
                <div className="shrink-0 bg-background border-t border-border">
                    <div className="max-w-4xl mx-auto p-4 w-full">
                        <ChatInput onSend={handleSendMessage} isLoading={isLoading} />

                        {error && (
                            <div className="mt-3 text-sm text-destructive text-center flex items-center justify-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-destructive"></span>
                                {error}
                            </div>
                        )}
                        <p className="text-[11px] text-muted-foreground text-center mt-3 font-medium">
                            {language === 'ar'
                                ? 'Loidumaroc.ma الذكاء الاصطناعي يمكن أن يخطئ. يرجى التحقق من المعلومات المهمة.'
                                : "L'IA de Loidumaroc.ma peut faire des erreurs. Vérifiez les informations importantes."}
                        </p>
                    </div>
                </div>
            </div>

            {/* Paywall Modal */}
            <PaywallModal
                isOpen={showPaywall}
                onClose={() => setShowPaywall(false)}
                resetTime={resetTime}
            />

            {/* Correction Modal */}
            {correctionModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md shadow-2xl">
                        <h3 className="text-xl font-bold text-foreground mb-4">
                            {language === 'ar' ? 'اقتراح تصحيح' : 'Suggérer une correction'}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                            {language === 'ar' ? 'ساعدنا على التحسين. ما هي أفضل إجابة؟' : 'Aidez-nous à nous améliorer. Quelle serait la meilleure réponse ?'}
                        </p>

                        <textarea
                            className="w-full h-32 bg-background border border-border rounded-lg p-3 text-foreground focus:outline-none focus:border-primary mb-4 text-sm"
                            placeholder={language === 'ar' ? 'اكتب تصحيحك هنا...' : 'Écrivez votre correction ici...'}
                            value={correctionText}
                            onChange={(e) => setCorrectionText(e.target.value)}
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setCorrectionModalOpen(false)}
                                className="px-4 py-2 text-muted-foreground hover:text-foreground text-sm"
                            >
                                {language === 'ar' ? 'إلغاء' : 'Annuler'}
                            </button>
                            <button
                                onClick={submitCorrection}
                                className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-medium"
                            >
                                {language === 'ar' ? 'إرسال' : 'Envoyer'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
