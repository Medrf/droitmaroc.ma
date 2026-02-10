'use client'

import { useState } from 'react'

export default function SearchBar({ onSearch, isLoading }) {
    const [query, setQuery] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (query.trim()) {
            onSearch(query.trim())
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e)
        }
    }

    return (
        <div className="w-full max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="relative">
                <div className="relative">
                    {/* Search Icon */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>

                    {/* Search Input */}
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="ابحث في القوانين المغربية... | Rechercher dans les lois marocaines..."
                        className="w-full py-4 px-6 pr-14 pl-32 rounded-2xl bg-white/5 border border-white/10 
                                   text-white placeholder-gray-400 text-lg
                                   focus:outline-none focus:border-green-500/50 focus:bg-white/10
                                   transition-all duration-300"
                        dir="auto"
                    />

                    {/* Search Button */}
                    <button
                        type="submit"
                        disabled={isLoading || !query.trim()}
                        className="absolute left-2 top-1/2 -translate-y-1/2
                                   px-6 py-2 bg-gradient-to-r from-green-600 to-green-500 
                                   text-white font-bold rounded-xl
                                   transition-all duration-300 
                                   hover:from-green-500 hover:to-green-400
                                   disabled:opacity-50 disabled:cursor-not-allowed
                                   flex items-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                <span>جاري البحث...</span>
                            </>
                        ) : (
                            <span>بحث</span>
                        )}
                    </button>
                </div>
            </form>

            {/* Search hints */}
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
                <span className="text-gray-500 text-sm">أمثلة:</span>
                {['article 505 code pénal', 'licenciement abusif', 'الطلاق', 'سرقة', 'حضانة الأطفال'].map((example) => (
                    <button
                        key={example}
                        onClick={() => {
                            setQuery(example)
                            onSearch(example)
                        }}
                        className="px-3 py-1 text-sm bg-white/5 hover:bg-white/10 
                                   border border-white/10 rounded-full text-gray-300
                                   transition-all duration-200"
                    >
                        {example}
                    </button>
                ))}
            </div>
        </div>
    )
}
