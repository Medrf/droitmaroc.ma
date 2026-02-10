'use client'

import { useState } from 'react'

export default function SearchResult({ result }) {
    const getCodeBadgeColor = (codeName) => {
        if (codeName.includes('pénal') || codeName.includes('جنائي') || codeName.includes('stupéfiants')) {
            return 'bg-red-500/20 text-red-300 border-red-500/30'
        }
        if (codeName.includes('travail') || codeName.includes('شغل') || codeName.includes('sécurité sociale')) {
            return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
        }
        if (codeName.includes('famille') || codeName.includes('أسرة')) {
            return 'bg-purple-500/20 text-purple-300 border-purple-500/30'
        }
        return 'bg-green-500/20 text-green-300 border-green-500/30'
    }

    const getRelevanceBadge = (relevance) => {
        switch (relevance) {
            case 'exact':
                return <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-300 rounded-full">مطابقة تامة</span>
            case 'high':
                return <span className="px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-300 rounded-full">صلة عالية</span>
            default:
                return null
        }
    }

    return (
        <div className="search-result-card bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden
                        transition-all duration-300 hover:bg-white/8 hover:border-green-500/30">
            {/* Header */}
            <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        {/* Code Badge + Article Number */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className={`px-3 py-1 text-sm font-medium border rounded-full ${getCodeBadgeColor(result.code_name)}`}>
                                {result.code_name}
                            </span>
                            <span className="px-3 py-1 text-sm bg-white/10 text-white rounded-full font-bold">
                                Article {result.article_number}
                            </span>
                            {getRelevanceBadge(result.relevance)}
                        </div>

                        {/* Arabic Code Name */}
                        <div className="text-gray-400 text-sm mb-2">
                            {result.code_name_ar} - المادة {result.article_number}
                        </div>

                        {/* Summary */}
                        <div className="text-gray-200 leading-relaxed">
                            {result.summary_fr}
                        </div>
                        <div className="text-gray-300 text-sm mt-1" dir="rtl">
                            {result.summary_ar}
                        </div>
                    </div>
                </div>
            </div>

            {/* Expanded Content (Always Visible now) */}
            <div className="px-5 pb-5 border-t border-white/10">
                {/* French Text */}
                <div className="mt-4">
                    <h4 className="text-sm font-semibold text-green-400 mb-2">📜 Texte officiel (FR)</h4>
                    <p className="text-gray-200 leading-relaxed bg-white/5 p-4 rounded-xl">
                        {result.article_text}
                    </p>
                </div>

                {/* Arabic Text */}
                <div className="mt-4">
                    <h4 className="text-sm font-semibold text-green-400 mb-2">📜 النص الرسمي (عربي)</h4>
                    <p className="text-gray-200 leading-relaxed bg-white/5 p-4 rounded-xl" dir="rtl">
                        {result.article_text_ar}
                    </p>
                </div>

                {/* Keywords */}
                <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">الكلمات المفتاحية</h4>
                    <div className="flex flex-wrap gap-2">
                        {result.keywords.map((keyword, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 text-xs bg-white/5 text-gray-400 rounded-md"
                            >
                                {keyword}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
