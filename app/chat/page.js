'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Sidebar, { MobileHeader } from '@/components/Sidebar'
import ChatInput from '@/components/ChatInput'
import ChatMessage, { TypingIndicator } from '@/components/ChatMessage'
import PaywallModal from '@/components/PaywallModal'

// Helper to generate IDs
const generateId = () => Math.random().toString(36).substr(2, 9)

export default function ChatPage() {
    const router = useRouter()

    // Navigation sidebar state
    const [isNavSidebarOpen, setIsNavSidebarOpen] = useState(false)

    // Chat state
    const [messages, setMessages] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentChatId, setCurrentChatId] = useState(null)
    const [chats, setChats] = useState([])

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
            title: 'Nouvelle conversation',
            timestamp: Date.now(),
            messages: []
        }
        setChats(prev => [newChat, ...prev])
        setCurrentChatId(newId)
        setMessages([])
        setIsNavSidebarOpen(false)
    }

    const loadChat = (chatId) => {
        const chat = chats.find(c => c.id === chatId)
        if (chat) {
            setCurrentChatId(chatId)
            setMessages(chat.messages)
            setIsNavSidebarOpen(false)
        }
    }

    const deleteChat = (e, chatId) => {
        e.stopPropagation()
        if (!window.confirm('Supprimer cette conversation ?')) return
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

    const handleSend = async (message) => {
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
                throw new Error("Erreur de communication avec le serveur (Réponse invalide)")
            }

            if (response.status === 402) {
                setResetTime(data.reset_at)
                setShowPaywall(true)
                setIsLoading(false)
                return
            }

            if (!response.ok) {
                throw new Error(data.message || `Erreur serveur: ${response.status}`)
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
            const errorMsg = {
                role: 'assistant',
                content: `⚠️ ${error.message || 'Une erreur est survenue'}`
            }
            const finalMessages = [...updatedMessages, errorMsg]
            setMessages(finalMessages)
            updateCurrentChat(finalMessages)
        } finally {
            setIsLoading(false)
        }
    }

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleDateString('fr-MA', {
            month: 'short', day: 'numeric'
        })
    }

    return (
        <div className="min-h-screen bg-slate-900">
            <div className="bg-red-600 text-white text-center p-2 font-bold z-[100] relative">
                DEBUG: CHAT PAGE ACTIVE
            </div>
            {/* Main Navigation Sidebar */}
            <Sidebar isOpen={isNavSidebarOpen} onClose={() => setIsNavSidebarOpen(false)} />

            {/* Mobile Header for main navigation */}
            <div className="lg:hidden">
                <MobileHeader onMenuClick={() => setIsNavSidebarOpen(true)} />
            </div>

            {/* Main Content Area */}
            <main className="lg:pl-[280px] min-h-screen flex flex-col pt-14 lg:pt-0 transition-all duration-300">
                {/* Header */}
                <header className="h-14 border-b border-slate-800 flex items-center justify-between px-4 bg-slate-900/95 backdrop-blur-sm sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <h1 className="text-base font-medium text-white">Assistant juridique</h1>
                    </div>
                    <Link href="/" className="text-slate-400 hover:text-white text-sm hidden lg:block">
                        Accueil
                    </Link>
                </header>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto px-4 py-6">
                    <div className="max-w-3xl mx-auto space-y-4">
                        {messages.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-semibold text-white mb-2">Comment puis-je vous aider ?</h2>
                                <p className="text-slate-400 mb-8 max-w-md mx-auto text-sm">
                                    Posez vos questions et obtenez des informations générales basées sur le cadre juridique marocain.
                                </p>

                                <div className="grid gap-2 max-w-lg mx-auto">
                                    {[
                                        'Quelles sont les conditions de licenciement au Maroc ?',
                                        'Quels sont les droits d\'un locataire ?',
                                        'Comment fonctionne le divorce au Maroc ?'
                                    ].map((question, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSend(question)}
                                            className="w-full p-3 text-left rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-amber-500/30 transition-all text-slate-300 hover:text-white text-sm"
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
                                        onLike={() => !msg.role === 'user' && handleFeedback(index, 1)}
                                        onDislike={() => !msg.role === 'user' && openCorrectionModal(index)}
                                    />
                                ))}
                                {isLoading && <TypingIndicator />}
                                <div ref={messagesEndRef} />
                            </>
                        )}
                    </div>
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-slate-800 bg-slate-900 sticky bottom-0 z-10">
                    <div className="max-w-3xl mx-auto">
                        <ChatInput onSend={handleSend} isLoading={isLoading} />
                        <p className="text-xs text-slate-500 text-center mt-2">
                            Les informations fournies sur droitmaroc.ma sont à titre informatif et général.
                        </p>
                    </div>
                </div>
            </main>

            {/* Paywall Modal */}
            <PaywallModal
                isOpen={showPaywall}
                onClose={() => setShowPaywall(false)}
                resetTime={resetTime}
            />

            {/* Correction Modal */}
            {correctionModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md shadow-2xl">
                        <h3 className="text-xl font-bold text-white mb-4">Suggérer une correction</h3>
                        <p className="text-slate-400 text-sm mb-4">
                            Aidez-nous à nous améliorer. Quelle serait la meilleure réponse ?
                        </p>

                        <textarea
                            className="w-full h-32 bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 focus:outline-none focus:border-amber-500 mb-4 text-sm"
                            placeholder="Écrivez votre correction ici..."
                            value={correctionText}
                            onChange={(e) => setCorrectionText(e.target.value)}
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setCorrectionModalOpen(false)}
                                className="px-4 py-2 text-slate-400 hover:text-white text-sm"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={submitCorrection}
                                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-sm font-medium"
                            >
                                Envoyer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
