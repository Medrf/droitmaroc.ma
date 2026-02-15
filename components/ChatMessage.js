'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'

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
                <div className="flex items-center gap-2 mt-1 ml-1">
                    <button
                        onClick={handleLike}
                        className={`p-1 rounded hover:bg-slate-800 transition-colors ${feedback === 'liked' ? 'text-green-500' : 'text-slate-500'}`}
                        title="Bonne réponse"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                    </button>
                    <button
                        onClick={handleDislike}
                        className={`p-1 rounded hover:bg-slate-800 transition-colors ${feedback === 'disliked' ? 'text-red-500' : 'text-slate-500'}`}
                        title="Mauvaise réponse / Corriger"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                        </svg>
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
