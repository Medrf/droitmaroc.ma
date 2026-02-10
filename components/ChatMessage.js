'use client'

import ReactMarkdown from 'react-markdown'

export default function ChatMessage({ message, isUser }) {
    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] ${isUser ? 'chat-bubble-user' : 'chat-bubble-assistant'}`}>
                {isUser ? (
                    <p className="text-sm leading-relaxed">{message}</p>
                ) : (
                    <div className="markdown-content text-sm">
                        <ReactMarkdown>{message}</ReactMarkdown>
                    </div>
                )}
            </div>
        </div>
    )
}

export function TypingIndicator() {
    return (
        <div className="flex justify-start">
            <div className="chat-bubble-assistant">
                <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    )
}
