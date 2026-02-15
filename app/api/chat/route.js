import { SYSTEM_PROMPT, isSafeQuery, SAFETY_RESPONSE } from '@/lib/prompts'
import { searchLaws } from '@/lib/laws'

// OpenRouter API endpoint
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'

export async function POST(request) {
    try {
        const { message, history } = await request.json()

        if (!message || typeof message !== 'string') {
            return Response.json(
                { success: false, error: 'Message is required' },
                { status: 400 }
            )
        }

        // Check for unsafe queries
        if (!isSafeQuery(message)) {
            return Response.json({ success: true, answer: SAFETY_RESPONSE, response: SAFETY_RESPONSE })
        }

        // Check if API key is configured
        if (!process.env.OPENROUTER_API_KEY) {
            return Response.json({
                success: true,
                answer: getMockResponse(message),
                response: getMockResponse(message)
            })
        }

        // --- RAG IMPLEMENTATION ---
        // 1. Search for relevant laws
        console.log(`🔍 Searching laws for: "${message}"`)
        const searchResults = searchLaws(message, 'fr', 'all') // Default to 'fr', laws lib handles mixed content scoring

        // 2. Filter for high relevance (score >= 50)
        const relevantLaws = searchResults.filter(law => law.score >= 50).slice(0, 5)

        // 3. Construct Context Block
        let legalContext = ""
        if (relevantLaws.length > 0) {
            legalContext = `
[LEGAL DATA CONTEXT]
The following official Moroccan legal texts were retrieved from the database. 
You MUST use these texts to answer. If the answer is here, cite it explicitly.

${relevantLaws.map((law, index) => `
--- DOCUMENT ${index + 1} ---
SOURCE: ${law.code_name} (Article ${law.article_number})
TEXT (FR): ${law.article_text}
TEXT (AR): ${law.article_text_ar}
-------------------------
`).join('\n')}
`
        }

        // Prepare messages array with system prompt and history
        // Fetch relevant feedback/corrections
        let feedbackContext = "";
        try {
            const { getVerifiedFeedback } = await import('@/lib/feedback');
            const pastCorrections = getVerifiedFeedback(message);
            if (pastCorrections.length > 0) {
                feedbackContext = `
[PREVIOUS USER CORRECTIONS]
The following corrections were provided by users for similar queries. YOU MUST ADHERE TO THESE CORRECTIONS AS THEY ARE GROUND TRUTH:
${pastCorrections.map((c, i) => `${i + 1}. Query: "${c.original_query}" -> Correction: "${c.correction}"`).join('\n')}
`;
            }
        } catch (e) {
            console.error("Error fetching feedback:", e);
        }

        // Prepare messages array with system prompt and history
        const messages = [
            {
                role: 'system',
                content: SYSTEM_PROMPT + "\n\n" + legalContext + "\n\n" + feedbackContext
            }
        ]

        if (Array.isArray(history)) {
            history.forEach(msg => {
                if (msg.role && msg.content) {
                    messages.push({
                        role: msg.role === 'user' ? 'user' : 'assistant',
                        content: msg.content
                    })
                }
            })
        }

        messages.push({ role: 'user', content: message })

        // Call OpenRouter API
        const response = await fetch(OPENROUTER_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: process.env.OPENROUTER_MODEL || 'google/gemini-2.0-flash-001',
                messages: messages,
                temperature: 0.15,
                top_p: 0.9,
                max_tokens: 800
            })
        })

        if (!response.ok) {
            const errorText = await response.text()
            console.error('❌ OpenRouter API Error:', {
                status: response.status,
                statusText: response.statusText,
                body: errorText
            })

            return Response.json(
                {
                    success: false,
                    error: '⚠️ حدث خطأ تقني مؤقت. المرجو إعادة المحاولة.'
                },
                { status: 500 }
            )
        }

        const data = await response.json()

        if (!data.choices || !data.choices.length) {
            console.error('❌ Invalid OpenRouter Response:', JSON.stringify(data))
            throw new Error('Invalid response from OpenRouter')
        }

        const assistantMessage = data.choices[0].message.content
        return Response.json({ success: true, answer: assistantMessage, response: assistantMessage })

    } catch (e) {
        console.error("OpenRouter API Error:", e);
        return Response.json(
            {
                success: false,
                error: '⚠️ حدث خطأ تقني مؤقت. المرجو إعادة المحاولة.'
            },
            { status: 500 }
        );
    }
}

// Mock response for demo when no API key is configured
function getMockResponse(message) {
    const lowerMessage = message.toLowerCase()

    // French greetings
    if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut') || lowerMessage.includes('hello') || lowerMessage.includes('coucou')) {
        return `Salut ! Comment je peux t'aider aujourd'hui ?

Si t'as une question juridique sur le Maroc, explique-moi ta situation et je t'expliquerai ce que dit la loi.`
    }

    // Arabic greetings
    if (lowerMessage.includes('سلام') || lowerMessage.includes('مرحبا') || lowerMessage.includes('صباح') || lowerMessage.includes('مساء')) {
        return `أهلاً! كيف يمكنني مساعدتك اليوم؟

إذا عندك مشكلة قانونية، اشرح لي الوضعية وغادي نشرح ليك شنو كيقول القانون المغربي.`
    }

    // Prison/fear questions - French
    if (lowerMessage.includes('prison') || lowerMessage.includes('vais aller en prison') || lowerMessage.includes('risque la prison')) {
        return `Respire un peu. La prison n'est pas automatique pour la plupart des infractions.

En pratique, pour des faits mineurs (vol simple, première infraction, valeur faible), la prison ferme est rarement prononcée. Ce qui compte :
- C'est ta première fois ?
- La valeur de ce qui est en jeu ?
- Y a-t-il eu violence ?
- Une plainte a été déposée ?
- Une restitution ou des excuses sont possibles ?

Dans beaucoup de cas, on parle d'amendes, de sursis, ou même de classement sans suite.

Dis-moi plus sur ta situation, je t'explique ce qui se passe généralement.`
    }

    // Prison/fear - Arabic
    if (lowerMessage.includes('حبس') || lowerMessage.includes('سجن') || lowerMessage.includes('غادي نمشي للحبس')) {
        return `خذ نفس عميق. الحبس ماشي أوتوماتيكي فأغلب الحالات.

فالواقع، الجرائم البسيطة (سرقة بسيطة، أول مرة، قيمة قليلة) نادراً ما كيكون فيها حبس نافذ. اللي كيهم:
- واش هادي أول مرة؟
- شحال القيمة؟
- واش كان عنف؟
- واش كاينة شكاية؟
- واش ممكن ترجع الشي أو تعتذر؟

فبزاف الحالات، كنتكلمو على غرامة، أو حكم موقوف، أو حتى حفظ الملف.

قولي أكثر على الوضعية ديالك.`
    }

    // Theft - French
    if (lowerMessage.includes('vol') || lowerMessage.includes('volé') || lowerMessage.includes('j\'ai pris')) {
        return `D'accord, parlons-en calmement.

Selon le Code pénal marocain (Article 505-510), le vol est puni différemment selon les circonstances :
- Vol simple : 1 à 5 ans de prison (mais en pratique, pour une première infraction et une faible valeur, c'est souvent moins grave)
- Vol avec circonstances aggravantes (nuit, effraction, violence) : peines plus lourdes

Mais la vraie question c'est : quelle est ta situation exacte ? Première fois ? Valeur de l'objet ? Plainte déposée ?

Ces détails changent tout.`
    }

    // Theft - Arabic
    if (lowerMessage.includes('سرقة') || lowerMessage.includes('سرقت') || lowerMessage.includes('شفرت')) {
        return `واخا، نهضرو بالراحة.

حسب القانون الجنائي المغربي (الفصل 505-510)، السرقة فيها عقوبات مختلفة حسب الظروف:
- السرقة البسيطة: من سنة لخمس سنوات (لكن فالواقع، أول مرة وقيمة قليلة، غالباً كتكون أخف)
- السرقة مع ظروف مشددة (ليل، كسر، عنف): عقوبات أثقل

السؤال المهم: شنو الوضعية ديالك بالضبط؟ أول مرة؟ شحال القيمة؟ كاينة شكاية؟

هاد التفاصيل كتغير كلشي.`
    }

    // Auto-entrepreneur
    if (lowerMessage.includes('مقاول ذاتي') || lowerMessage.includes('auto-entrepreneur') || lowerMessage.includes('auto entrepreneur')) {
        return `Le statut d'auto-entrepreneur au Maroc (Loi 114.13), c'est assez simple :

- Déclaration trimestrielle obligatoire, même si tu n'as rien gagné (déclare "zéro")
- Impôt : 0.5% pour le commerce/industrie, 1% pour les services
- Retard = pénalité de 15% + 0.5% par mois
- 4 déclarations "zéro" d'affilée = radiation automatique

T'as une question spécifique sur ce statut ?`
    }

    // Problem/trouble - French
    if (lowerMessage.includes('problème') || lowerMessage.includes('trouble') || lowerMessage.includes('ennui') || lowerMessage.includes('merde')) {
        return `OK, explique-moi ce qui se passe. Je suis là pour t'aider à comprendre ta situation juridique.

Qu'est-ce qui s'est passé exactement ?`
    }

    // Problem - Arabic
    if (lowerMessage.includes('مشكل') || lowerMessage.includes('ورطة') || lowerMessage.includes('مشكلة')) {
        return `واخا، قولي شنو وقع. أنا هنا باش نعاونك تفهم الوضعية القانونية.

شنو اللي وقع بالضبط؟`
    }

    // Default - French
    if (/[a-zA-Z]/.test(message) && !/[\u0600-\u06FF]/.test(message)) {
        return `Salut ! Je suis là pour t'aider avec des questions sur le droit marocain.

Que ce soit pénal, travail, impôts, entreprises... dis-moi ta situation et je t'explique ce que dit la loi.

Note : Ce sont des informations générales, pas un conseil juridique personnalisé.`
    }

    // Default - Arabic
    return `مرحباً! أنا هنا باش نعاونك تفهم القانون المغربي.

سواء كان جنائي، شغل، ضرائب، شركات... قولي الوضعية ديالك ونشرح ليك شنو كيقول القانون.

ملاحظة: هادي معلومات عامة، ماشي استشارة قانونية شخصية.`
}
