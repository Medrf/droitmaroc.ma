import Link from 'next/link'
import path from 'path'
import { promises as fs } from 'fs'

// Helper to load law data
async function getLawData(code) {
    try {
        const filePath = path.join(process.cwd(), 'data/laws', `${code}.json`)
        const fileContent = await fs.readFile(filePath, 'utf8')
        return JSON.parse(fileContent)
    } catch (error) {
        return null
    }
}

export default async function ArticlePage({ params }) {
    const { code, number } = params
    const lawData = await getLawData(code)

    if (!lawData) {
        return <div className="p-10 text-center">Loi introuvable</div>
    }

    const article = lawData.articles.find(a => a.number.toString() === number)

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
                    <p className="text-gray-400 mb-6">Article non trouvé</p>
                    <Link href={`/laws/${code}`} className="px-6 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                        Retour au code
                    </Link>
                </div>
            </div>
        )
    }

    // Find prev/next articles
    const currentIndex = lawData.articles.indexOf(article)
    const prevArticle = currentIndex > 0 ? lawData.articles[currentIndex - 1] : null
    const nextArticle = currentIndex < lawData.articles.length - 1 ? lawData.articles[currentIndex + 1] : null

    return (
        <div className="min-h-screen pb-20">
            {/* Header */}
            <header className="glass border-b border-white/10 sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
                    <Link href="/search" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span>Recherche</span>
                    </Link>
                    <Link href={`/laws/${code}`} className="text-lg font-bold truncate hover:text-green-400 transition-colors">
                        {lawData.code_name_fr}
                    </Link>
                    <div className="w-8"></div>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-3xl mx-auto px-4 py-16">

                {/* Article Card */}
                <div className="relative p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 shadow-2xl">
                    {/* Badge */}
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-gradient-to-r from-green-500 to-green-600 shadow-lg shadow-green-500/20 text-white font-bold text-lg">
                        Article {article.number}
                    </div>

                    {/* Content */}
                    <div className="mt-6 space-y-12">
                        {/* French */}
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-serif leading-relaxed text-gray-100">
                                {article.text_fr}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="flex items-center justify-center gap-4 opacity-50">
                            <div className="h-px w-20 bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
                            <div className="text-xl">⚖️</div>
                            <div className="h-px w-20 bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
                        </div>

                        {/* Arabic */}
                        <div className="text-center" dir="rtl">
                            <div className="text-2xl md:text-3xl font-arabic leading-relaxed text-gray-100">
                                {article.text_ar}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Footer */}
                <div className="mt-12 flex items-center justify-between">
                    {prevArticle ? (
                        <Link
                            href={`/laws/${code}/article/${prevArticle.number}`}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <div className="text-left">
                                <div className="text-xs opacity-50">Précédent</div>
                                <div className="font-bold">Art. {prevArticle.number}</div>
                            </div>
                        </Link>
                    ) : <div></div>}

                    <Link
                        href={`/laws/${code}#article-${article.number}`}
                        className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        Voir dans le code complet
                    </Link>

                    {nextArticle ? (
                        <Link
                            href={`/laws/${code}/article/${nextArticle.number}`}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                        >
                            <div className="text-right">
                                <div className="text-xs opacity-50">Suivant</div>
                                <div className="font-bold">Art. {nextArticle.number}</div>
                            </div>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    ) : <div></div>}
                </div>
            </main>
        </div>
    )
}
