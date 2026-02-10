'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/lib/language'

export default function ChatInput({ onSend, isLoading }) {
    const [message, setMessage] = useState('')
    const { language } = useLanguage()
    const textareaRef = useRef(null)

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'inherit'
            const scrollHeight = textareaRef.current.scrollHeight
            textareaRef.current.style.height = `${Math.min(scrollHeight, 200)}px`
        }
    }, [message])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (message.trim() && !isLoading) {
            onSend(message.trim())
            setMessage('')
            // Reset height
            if (textareaRef.current) {
                textareaRef.current.style.height = 'inherit'
            }
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e)
        }
    }

    const placeholder = language === 'ar'
        ? 'اكتب سؤالك القانوني...'
        : 'Posez votre question juridique...'

    return (
        <form onSubmit={handleSubmit} className="relative">
            <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={isLoading}
                rows={1}
                className="w-full px-4 py-3.5 pr-14 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none overflow-y-auto min-h-[52px]"
                style={{ maxHeight: '200px' }}
            />
            <button
                type="submit"
                disabled={!message.trim() || isLoading}
                className="absolute right-2 bottom-2 p-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center justify-center h-9 w-9"
            >
                {isLoading ? (
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                )}
            </button>
        </form>
    )
}
