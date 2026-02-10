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

export default async function LawPage({ params }) {
    const { code } = params
    const lawData = await getLawData(code)

    if (!lawData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
                    <p className="text-gray-400 mb-6">القانون غير موجود | Loi introuvable</p>
                    <Link href="/search" className="px-6 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                        Retouner à la recherche
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen pb-20">
            {/* Header */}
            <header className="glass border-b border-white/10 sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
                    <Link href="/search" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span>Retour</span>
                    </Link>
                    <h1 className="text-lg font-bold truncate max-w-[200px] md:max-w-none">
                        {lawData.code_name_fr}
                    </h1>
                    <div className="w-8"></div> {/* Spacer for centering */}
                </div>
            </header>

            {/* Content */}
            <main className="max-w-4xl mx-auto px-4 py-10">
                {/* Title Card */}
                <div className="mb-10 p-8 rounded-3xl bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-white/10 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                        {lawData.code_name_fr}
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-green-400 font-arabic">
                        {lawData.code_name_ar}
                    </h2>

                    <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                            {lawData.total_articles} Articles
                        </span>
                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                            Source: {lawData.source}
                        </span>
                    </div>
                </div>

                {/* Articles List */}
                <div className="space-y-6">
                    {lawData.articles.map((article) => (
                        <div
                            key={article.number}
                            id={`article-${article.number}`}
                            className="scroll-mt-24 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-green-500/30 transition-all duration-300 group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="px-3 py-1 rounded-lg bg-green-500/20 text-green-400 font-bold text-sm border border-green-500/20">
                                    Article {article.number} | المادة {article.number}
                                </span>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* French */}
                                <div className="text-gray-300 leading-relaxed text-lg">
                                    {article.text_fr}
                                </div>

                                {/* Arabic */}
                                <div className="text-gray-300 leading-relaxed text-lg text-right font-arabic" dir="rtl">
                                    {article.text_ar}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}
