'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Sidebar, { MobileHeader } from '@/components/Sidebar'
import ChatInput from '@/components/ChatInput'
import ChatMessage, { TypingIndicator } from '@/components/ChatMessage'

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
    const [isChatHistoryOpen, setIsChatHistoryOpen] = useState(false)

    // Refs
    const messagesEndRef = useRef(null)

    // Load chats from LocalStorage on mount
    useEffect(() => {
        const savedChats = localStorage.getItem('legal_ai_chats')
        if (savedChats) {
            try {
                const parsedChats = JSON.parse(savedChats)
                setChats(parsedChats)

                if (parsedChats.length > 0) {
                    const lastId = localStorage.getItem('legal_ai_last_chat_id')
                    const chatToLoad = parsedChats.find(c => c.id === lastId) || parsedChats[0]
                    setCurrentChatId(chatToLoad.id)
                    setMessages(chatToLoad.messages)
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
        setIsChatHistoryOpen(false)
    }

    const loadChat = (chatId) => {
        const chat = chats.find(c => c.id === chatId)
        if (chat) {
            setCurrentChatId(chatId)
            setMessages(chat.messages)
            setIsChatHistoryOpen(false)
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

            if (!response.ok) throw new Error('Failed to get response')

            const data = await response.json()
            const assistantMsg = { role: 'assistant', content: data.response }
            const finalMessages = [...updatedMessages, assistantMsg]

            setMessages(finalMessages)
            updateCurrentChat(finalMessages)
        } catch (error) {
            console.error('Error:', error)
            const errorMsg = {
                role: 'assistant',
                content: '⚠️ Une erreur est survenue. Veuillez réessayer.'
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
            {/* Main Navigation Sidebar */}
            <Sidebar isOpen={isNavSidebarOpen} onClose={() => setIsNavSidebarOpen(false)} />

            {/* Mobile Header for main navigation */}
            <div className="lg:hidden">
                <MobileHeader onMenuClick={() => setIsNavSidebarOpen(true)} />
            </div>

            {/* Main Content Area */}
            <div className="lg:pl-[280px] min-h-screen flex">
                {/* Chat History Sidebar */}
                <aside className={`
                    fixed inset-y-0 left-0 z-30 w-64 bg-slate-800/95 backdrop-blur-sm border-r border-slate-700 transform transition-transform duration-200 ease-out
                    ${isChatHistoryOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:relative lg:translate-x-0 flex flex-col
                    pt-14 lg:pt-0
                `}>
                    <div className="p-4 border-b border-slate-700">
                        <button
                            onClick={startNewChat}
                            className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white rounded-full flex items-center justify-center gap-2 transition-all text-sm font-medium shadow-lg shadow-amber-500/20"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span>Nouvelle conversation</span>
                        </button>
                    </div>

                    {/* Chat List */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-1">
                        {chats.map(chat => (
                            <div
                                key={chat.id}
                                onClick={() => loadChat(chat.id)}
                                className={`
                                    group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all text-sm
                                    ${currentChatId === chat.id
                                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                        : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200 border border-transparent'}
                                `}
                            >
                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <div className="flex-1 min-w-0">
                                    <p className="truncate">{chat.title}</p>
                                    <p className="text-xs text-slate-500 mt-0.5">{formatTime(chat.timestamp)}</p>
                                </div>
                                <button
                                    onClick={(e) => deleteChat(e, chat.id)}
                                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 rounded transition-all"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))}

                        {chats.length === 0 && (
                            <div className="text-center text-slate-500 py-8 text-sm">
                                Aucune conversation
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t border-slate-700">
                        <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span>Retour à l'accueil</span>
                        </Link>
                    </div>
                </aside>

                {/* Chat History Overlay (Mobile) */}
                {isChatHistoryOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                        onClick={() => setIsChatHistoryOpen(false)}
                    />
                )}

                {/* Main Chat Content */}
                <main className="flex-1 flex flex-col min-w-0 pt-14 lg:pt-0">
                    {/* Header */}
                    <header className="h-14 border-b border-slate-800 flex items-center justify-between px-4 bg-slate-900/95 backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsChatHistoryOpen(!isChatHistoryOpen)}
                                className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
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
                                        />
                                    ))}
                                    {isLoading && <TypingIndicator />}
                                    <div ref={messagesEndRef} />
                                </>
                            )}
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-slate-800 bg-slate-900">
                        <div className="max-w-3xl mx-auto">
                            <ChatInput onSend={handleSend} isLoading={isLoading} />
                            <p className="text-xs text-slate-500 text-center mt-2">
                                Les informations fournies sur droitmaroc.ma sont à titre informatif et général.
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
