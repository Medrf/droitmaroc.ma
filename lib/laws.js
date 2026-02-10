import fs from 'fs';
import path from 'path';

// Load all law files from the data/laws directory
export function loadAllLaws() {
    const lawsDir = path.join(process.cwd(), 'data', 'laws');
    const files = fs.readdirSync(lawsDir).filter(f => f.endsWith('.json'));

    const allLaws = [];
    const allCodes = [];

    for (const file of files) {
        const filePath = path.join(lawsDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const code = JSON.parse(content);

        // Add code info
        allCodes.push({
            code: code.code_id,
            name_fr: code.code_name_fr,
            name_ar: code.code_name_ar,
            total_articles: code.total_articles,
            loaded_articles: code.articles.length,
            source: code.source
        });

        // Transform articles to unified format
        for (const article of code.articles) {
            allLaws.push({
                id: `${code.code_id}-${article.number}`,
                code_id: code.code_id,
                code_name: code.code_name_fr,
                code_name_ar: code.code_name_ar,
                article_number: article.number,
                article_text: article.text_fr,
                article_text_ar: article.text_ar,
                keywords: article.keywords || [],
                summary_fr: article.summary_fr || null,
                summary_ar: article.summary_ar || null
            });
        }
    }

    return { laws: allLaws, codes: allCodes };
}

// Search function
export function searchLaws(query, language = 'fr', selectedCode = null) {
    const { laws } = loadAllLaws();

    const normalizedQuery = query.toLowerCase().trim();
    const queryTerms = normalizedQuery.split(/\s+/).filter(t => t.length > 1);

    let results = laws;

    // Filter by code if selected
    if (selectedCode && selectedCode !== 'all') {
        results = results.filter(law => law.code_id === selectedCode);
    }

    // Score and filter results
    const scoredResults = results.map(law => {
        let score = 0;

        const textToSearch = language === 'ar'
            ? `${law.article_text_ar} ${law.keywords.join(' ')}`
            : `${law.article_text} ${law.keywords.join(' ')}`;

        const normalizedText = textToSearch.toLowerCase();

        // Exact phrase match (highest score)
        if (normalizedText.includes(normalizedQuery)) {
            score += 100;
        }

        // Individual term matches
        for (const term of queryTerms) {
            if (normalizedText.includes(term)) {
                score += 20;
            }

            // Keyword match (bonus)
            if (law.keywords.some(k => k.toLowerCase().includes(term))) {
                score += 30;
            }
        }

        // Article number match
        const articleNumMatch = query.match(/(?:article|المادة|art\.?)\s*(\d+)/i);
        if (articleNumMatch && law.article_number === parseInt(articleNumMatch[1])) {
            score += 150;
        }

        return { ...law, score };
    });

    // Filter and sort by score
    return scoredResults
        .filter(r => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 20);
}

// Get all available codes
export function getAllCodes() {
    const { codes } = loadAllLaws();
    return codes;
}

// Get statistics
export function getStats() {
    const { laws, codes } = loadAllLaws();
    return {
        totalArticles: laws.length,
        totalCodes: codes.length,
        codes: codes.map(c => ({
            name: c.name_fr,
            loaded: c.loaded_articles,
            total: c.total_articles
        }))
    };
}
