'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/lib/language'
import { Send, Loader2 } from 'lucide-react'

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
                className="w-full px-4 py-3.5 pr-14 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none overflow-y-auto min-h-[52px]"
                style={{ maxHeight: '200px' }}
            />
            <button
                type="submit"
                disabled={!message.trim() || isLoading}
                className="absolute right-2 bottom-2 p-2 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:hover:bg-primary text-primary-foreground rounded-lg transition-colors flex items-center justify-center h-9 w-9"
            >
                {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <Send className="w-5 h-5 -ml-0.5" />
                )}
            </button>
        </form>
    )
}
