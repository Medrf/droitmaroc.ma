import { loadAllLaws, getAllCodes, getStats } from '@/lib/laws'

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')?.trim() || ''
    const code = searchParams.get('code') || 'all'
    const lang = searchParams.get('lang') || 'fr'

    // If requesting stats
    if (searchParams.get('stats') === 'true') {
        return Response.json(getStats())
    }

    // If requesting codes list
    if (searchParams.get('codes') === 'true') {
        return Response.json({ codes: getAllCodes() })
    }

    if (!query) {
        return Response.json({
            results: [],
            query: '',
            total: 0,
            message: lang === 'ar'
                ? 'أدخل كلمة للبحث'
                : 'Entrez un terme de recherche'
        })
    }

    const results = searchLaws(query, lang, code)

    return Response.json({
        results,
        query,
        total: results.length,
        codes: getAllCodes()
    })
}

/**
 * Search laws with relevance scoring
 */
function searchLaws(query, lang = 'fr', selectedCode = 'all') {
    const { laws } = loadAllLaws()
    const normalizedQuery = normalizeText(query)
    const queryWords = normalizedQuery.split(/\s+/).filter(w => w.length > 1)

    // Extract article number if present
    const articleMatch = query.match(/(?:article|فصل|المادة|art\.?)\s*(\d+)/i)
    const articleNumber = articleMatch ? parseInt(articleMatch[1]) : null

    // Detect code hint from query
    const codeHint = detectCodeHint(normalizedQuery)

    // Filter by selected code
    let filteredLaws = laws
    if (selectedCode && selectedCode !== 'all') {
        filteredLaws = laws.filter(law => law.code_id === selectedCode)
    }

    const scoredResults = filteredLaws.map(law => {
        let score = 0
        const matchedKeywords = []

        // 1. Exact article number match (+150 points)
        if (articleNumber && law.article_number === articleNumber) {
            score += 150
        }

        // 2. Code hint match (+40 points)
        if (codeHint && law.code_id.includes(codeHint)) {
            score += 40
        }

        // 3. Keyword matching (+20 points each)
        for (const keyword of law.keywords) {
            const normalizedKeyword = normalizeText(keyword)
            if (normalizedQuery.includes(normalizedKeyword) || normalizedKeyword.includes(normalizedQuery)) {
                score += 20
                matchedKeywords.push(keyword)
            }
            for (const word of queryWords) {
                if (normalizedKeyword.includes(word) || word.includes(normalizedKeyword)) {
                    score += 10
                }
            }
        }

        // 4. Text content match (+5 points per occurrence)
        const textToSearch = lang === 'ar'
            ? `${law.article_text_ar}`
            : `${law.article_text}`
        const normalizedText = normalizeText(textToSearch)

        for (const word of queryWords) {
            if (normalizedText.includes(word)) {
                score += 5
            }
        }

        // 5. Exact phrase match in text (+50)
        if (normalizedText.includes(normalizedQuery)) {
            score += 50
        }

        // 6. Code name matching
        const codeNameMatches = [
            { terms: ['penal', 'جنائي', 'crime', 'vol', 'سرقة', 'meurtre', 'قتل'], code_id: 'code_penal' },
            { terms: ['travail', 'شغل', 'licenciement', 'فصل', 'salaire', 'أجر', 'cdi', 'cdd'], code_id: 'code_travail' },
            { terms: ['famille', 'أسرة', 'divorce', 'طلاق', 'mariage', 'زواج', 'garde', 'حضانة', 'moudawana'], code_id: 'code_famille' },
            { terms: ['commerce', 'تجارة', 'cheque', 'شيك', 'societe', 'شركة', 'fonds'], code_id: 'code_commerce' },
            { terms: ['constitution', 'دستور', 'roi', 'ملك', 'parlement', 'برلمان'], code_id: 'constitution' },
            { terms: ['procedure', 'مسطرة', 'garde a vue', 'حراسة', 'appel', 'استئناف'], code_id: 'code_procedure_penale' },
            { terms: ['obligation', 'التزام', 'contrat', 'عقد', 'responsabilite', 'مسؤولية', 'vente', 'بيع'], code_id: 'doc' }
        ]

        for (const matcher of codeNameMatches) {
            if (matcher.terms.some(t => normalizedQuery.includes(t)) && law.code_id === matcher.code_id) {
                score += 25
            }
        }

        return {
            ...law,
            score,
            matchedKeywords
        }
    })

    return scoredResults
        .filter(r => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 25)
        .map(({ score, matchedKeywords, ...law }) => ({
            ...law,
            relevance: score > 100 ? 'exact' : score > 50 ? 'high' : score > 20 ? 'medium' : 'low'
        }))
}

/**
 * Normalize text for search
 */
function normalizeText(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[éèêë]/g, 'e')
        .replace(/[àâä]/g, 'a')
        .replace(/[ùûü]/g, 'u')
        .replace(/[îï]/g, 'i')
        .replace(/[ôö]/g, 'o')
        .replace(/[ç]/g, 'c')
        .replace(/\s+/g, ' ')
        .trim()
}

/**
 * Detect code hint from query
 */
function detectCodeHint(query) {
    const hints = {
        'penal': ['penal', 'جنائي', 'crime', 'meurtre', 'vol', 'viol'],
        'travail': ['travail', 'شغل', 'emploi', 'salaire', 'licenciement'],
        'famille': ['famille', 'أسرة', 'mariage', 'divorce', 'garde', 'enfant'],
        'commerce': ['commerce', 'تجارة', 'cheque', 'societe', 'fonds'],
        'constitution': ['constitution', 'دستور', 'roi', 'parlement'],
        'procedure': ['procedure', 'مسطرة', 'garde a vue', 'tribunal'],
        'doc': ['obligation', 'التزام', 'contrat', 'responsabilite', 'vente']
    }

    for (const [code, terms] of Object.entries(hints)) {
        if (terms.some(t => query.includes(t))) {
            return code
        }
    }
    return null
}
