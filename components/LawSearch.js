'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/lib/language'

export default function LawSearch() {
    const { language } = useLanguage()
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [codes, setCodes] = useState([])
    const [selectedCode, setSelectedCode] = useState('all')
    const [selectedLang, setSelectedLang] = useState('fr')
    const [isLoading, setIsLoading] = useState(false)
    const [stats, setStats] = useState(null)

    // Load codes and stats on mount
    useEffect(() => {
        loadCodesAndStats()
    }, [])

    const loadCodesAndStats = async () => {
        try {
            const [codesRes, statsRes] = await Promise.all([
                fetch('/api/search?codes=true'),
                fetch('/api/search?stats=true')
            ])
            const codesData = await codesRes.json()
            const statsData = await statsRes.json()
            setCodes(codesData.codes || [])
            setStats(statsData)
        } catch (error) {
            console.error('Failed to load codes:', error)
        }
    }

    const handleSearch = async (searchQuery = query) => {
        if (!searchQuery.trim()) return

        setIsLoading(true)
        try {
            const params = new URLSearchParams({
                q: searchQuery,
                code: selectedCode,
                lang: selectedLang
            })
            const response = await fetch(`/api/search?${params}`)
            const data = await response.json()
            setResults(data.results || [])
        } catch (error) {
            console.error('Search error:', error)
            setResults([])
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleSearch()
    }

    const codeBadgeColors = {
        'code_penal': 'badge-penal',
        'code_travail': 'badge-travail',
        'code_famille': 'badge-famille',
        'constitution': 'badge-default',
        'code_commerce': 'bg-amber-900/50 text-amber-300 border border-amber-800/50',
        'doc': 'badge-default',
        'code_procedure_penale': 'bg-orange-900/50 text-orange-300 border border-orange-800/50'
    }

    return (
        <div className="container-main">
            {/* Stats */}
            {stats && (
                <div className="flex items-center justify-center gap-6 mb-6 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-emerald-400 font-semibold">{stats.totalArticles}</span>
                        <span className="text-slate-500">{language === 'ar' ? 'مادة' : 'articles'}</span>
                    </div>
                    <div className="w-px h-4 bg-slate-700"></div>
                    <div className="flex items-center gap-2">
                        <span className="text-slate-400 font-semibold">{stats.totalCodes}</span>
                        <span className="text-slate-500">{language === 'ar' ? 'قانون' : 'codes'}</span>
                    </div>
                </div>
            )}

            {/* Search Form */}
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                <div className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={language === 'ar'
                            ? 'ابحث: رقم المادة، كلمة مفتاحية...'
                            : 'Rechercher : numéro d\'article, mot-clé...'}
                        className="input-lg pr-12"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !query.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg transition-colors"
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                    <select
                        value={selectedCode}
                        onChange={(e) => setSelectedCode(e.target.value)}
                        className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-300 focus:outline-none focus:border-emerald-500"
                    >
                        <option value="all">{language === 'ar' ? 'جميع القوانين' : 'Tous les codes'}</option>
                        {codes.map((code) => (
                            <option key={code.code} value={code.code}>
                                {code.name_fr} ({code.loaded_articles})
                            </option>
                        ))}
                    </select>

                    <div className="flex rounded-lg bg-slate-800 border border-slate-700 p-0.5">
                        <button
                            type="button"
                            onClick={() => setSelectedLang('fr')}
                            className={`px-3 py-1.5 rounded text-sm transition-colors ${selectedLang === 'fr'
                                    ? 'bg-emerald-600 text-white'
                                    : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            FR
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelectedLang('ar')}
                            className={`px-3 py-1.5 rounded text-sm transition-colors ${selectedLang === 'ar'
                                    ? 'bg-emerald-600 text-white'
                                    : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            ع
                        </button>
                    </div>
                </div>

                {/* Quick Examples */}
                <div className="flex flex-wrap gap-2 justify-center mt-4">
                    {[
                        'Article 392',
                        'licenciement',
                        'divorce',
                        'chèque sans provision'
                    ].map((example) => (
                        <button
                            key={example}
                            type="button"
                            onClick={() => {
                                setQuery(example)
                                handleSearch(example)
                            }}
                            className="px-3 py-1 text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full text-slate-400 hover:text-white transition-colors"
                        >
                            {example}
                        </button>
                    ))}
                </div>
            </form>

            {/* Results */}
            {results.length > 0 && (
                <div className="mt-10 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-slate-400">
                            {results.length} {language === 'ar' ? 'نتيجة' : 'résultats'}
                        </h3>
                    </div>

                    <div className="space-y-3">
                        {results.map((result, index) => (
                            <div
                                key={result.id || index}
                                className={`card ${result.relevance === 'exact' ? 'relevance-exact' :
                                        result.relevance === 'high' ? 'relevance-high' :
                                            result.relevance === 'medium' ? 'relevance-medium' : ''
                                    }`}
                            >
                                {/* Header */}
                                <div className="flex items-center gap-3 mb-3">
                                    <span className={`badge ${codeBadgeColors[result.code_id] || 'badge-default'}`}>
                                        Article {result.article_number}
                                    </span>
                                    <span className="text-xs text-slate-500">
                                        {result.code_name}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="space-y-3">
                                    {/* French */}
                                    <div className="article-text">
                                        <p className="text-sm leading-relaxed" dir="ltr">
                                            {result.article_text}
                                        </p>
                                    </div>

                                    {/* Arabic */}
                                    {result.article_text_ar && (
                                        <div className="article-text">
                                            <p className="text-sm leading-relaxed text-right" dir="rtl">
                                                {result.article_text_ar}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Keywords */}
                                {result.keywords && result.keywords.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-slate-700/50">
                                        {result.keywords.slice(0, 4).map((kw, i) => (
                                            <span key={i} className="px-2 py-0.5 text-xs bg-slate-800 rounded text-slate-500">
                                                {kw}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* No Results */}
            {query && !isLoading && results.length === 0 && (
                <div className="mt-12 text-center py-12">
                    <div className="w-16 h-16 mx-auto rounded-xl bg-slate-800 flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-slate-300 mb-1">
                        {language === 'ar' ? 'لا توجد نتائج' : 'Aucun résultat'}
                    </h3>
                    <p className="text-sm text-slate-500">
                        {language === 'ar' ? 'جرب كلمات مختلفة' : 'Essayez d\'autres mots-clés'}
                    </p>
                </div>
            )}
        </div>
    )
}
