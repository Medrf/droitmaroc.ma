'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import { ThumbsUp, Pencil } from 'lucide-react'

export default function ChatMessage({ message, isUser, onLike, onDislike }) {
    const [feedback, setFeedback] = React.useState('none'); // 'none', 'liked', 'disliked'

    const handleLike = () => {
        setFeedback('liked');
        if (onLike) onLike();
    };

    const handleDislike = () => {
        setFeedback('disliked');
        if (onDislike) onDislike();
    };

    return (
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} mb-4`}>
            <div className={`max-w-[85%] ${isUser ? 'chat-bubble-user' : 'chat-bubble-assistant'}`}>
                {isUser ? (
                    <p className="text-sm leading-relaxed">{message}</p>
                ) : (
                    <div className="markdown-content text-sm">
                        <ReactMarkdown>{message}</ReactMarkdown>
                    </div>
                )}
            </div>

            {!isUser && (
                <div className="flex items-center gap-2 mt-1 ml-1 opacity-50 hover:opacity-100 transition-opacity">
                    <button
                        onClick={handleLike}
                        className={`p-1.5 rounded-md transition-colors ${feedback === 'liked' ? 'text-green-500 bg-green-500/10' : 'text-muted-foreground hover:bg-muted'}`}
                        title="Bonne réponse"
                    >
                        <ThumbsUp className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handleDislike}
                        className={`p-1.5 rounded-md transition-colors ${feedback === 'disliked' ? 'text-amber-500 bg-amber-500/10' : 'text-muted-foreground hover:bg-muted'}`}
                        title="Corriger la réponse"
                    >
                        <Pencil className="w-4 h-4" />
                    </button>
                </div>
            )}
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
