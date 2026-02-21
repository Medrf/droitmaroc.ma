'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/lib/language'
import { Search, Loader2, SearchX } from 'lucide-react'

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
        'code_commerce': 'badge-commerce',
        'doc': 'badge-default',
        'code_procedure_penale': 'bg-orange-500/10 text-orange-500 border border-orange-500/20'
    }

    return (
        <div className="container-main">
            {/* Stats */}
            {stats && (
                <div className="flex items-center justify-center gap-6 mb-6 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-primary font-semibold">{stats.totalArticles}</span>
                        <span className="text-muted-foreground">{language === 'ar' ? 'مادة' : 'articles'}</span>
                    </div>
                    <div className="w-px h-4 bg-border"></div>
                    <div className="flex items-center gap-2">
                        <span className="text-foreground font-semibold">{stats.totalCodes}</span>
                        <span className="text-muted-foreground">{language === 'ar' ? 'قانون' : 'codes'}</span>
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
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground rounded-lg transition-colors"
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin h-5 w-5" />
                        ) : (
                            <Search className="w-5 h-5 -ml-0.5" />
                        )}
                    </button>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                    <select
                        value={selectedCode}
                        onChange={(e) => setSelectedCode(e.target.value)}
                        className="px-4 py-2 rounded-lg bg-card border border-border text-sm text-foreground focus:outline-none focus:border-primary"
                    >
                        <option value="all">{language === 'ar' ? 'جميع القوانين' : 'Tous les codes'}</option>
                        {codes.map((code) => (
                            <option key={code.code} value={code.code}>
                                {code.name_fr} ({code.loaded_articles})
                            </option>
                        ))}
                    </select>

                    <div className="flex rounded-lg bg-muted border border-border p-0.5">
                        <button
                            type="button"
                            onClick={() => setSelectedLang('fr')}
                            className={`px-3 py-1.5 rounded text-sm transition-colors ${selectedLang === 'fr'
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            FR
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelectedLang('ar')}
                            className={`px-3 py-1.5 rounded text-sm transition-colors ${selectedLang === 'ar'
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:text-foreground'
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
                            className="px-3 py-1 text-xs bg-muted hover:bg-muted/80 border border-border rounded-full text-muted-foreground hover:text-foreground transition-colors"
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
                        <h3 className="text-sm font-medium text-muted-foreground">
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
                                    <span className="text-xs text-muted-foreground">
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
                                    <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-border">
                                        {result.keywords.slice(0, 4).map((kw, i) => (
                                            <span key={i} className="px-2 py-0.5 text-xs bg-muted rounded text-muted-foreground">
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
                    <div className="w-16 h-16 mx-auto rounded-xl bg-muted flex items-center justify-center mb-4 border border-border shadow-sm">
                        <SearchX className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-1">
                        {language === 'ar' ? 'لا توجد نتائج' : 'Aucun résultat'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {language === 'ar' ? 'جرب كلمات مختلفة' : 'Essayez d\'autres mots-clés'}
                    </p>
                </div>
            )}
        </div>
    )
}
