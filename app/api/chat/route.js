import { SYSTEM_PROMPT, isSafeQuery, SAFETY_RESPONSE } from '@/lib/prompts'

// Groq API endpoint (FREE!)
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

export async function POST(request) {
    try {
        const { message, history } = await request.json()

        if (!message || typeof message !== 'string') {
            return Response.json(
                { error: 'Message is required' },
                { status: 400 }
            )
        }

        // Check for unsafe queries
        if (!isSafeQuery(message)) {
            return Response.json({ response: SAFETY_RESPONSE })
        }

        // Check if API key is configured
        if (!process.env.GROQ_API_KEY) {
            return Response.json({
                response: getMockResponse(message)
            })
        }

        // Prepare messages array with history
        const messages = [
            {
                role: 'system',
                content: SYSTEM_PROMPT
            }
        ]

        // Add history if it exists and is valid
        if (Array.isArray(history)) {
            history.forEach(msg => {
                if (msg.role && msg.content) {
                    messages.push({
                        role: msg.role === 'user' ? 'user' : 'assistant', // Ensure valid role
                        content: msg.content
                    })
                }
            })
        }

        // Add current message
        messages.push({
            role: 'user',
            content: message
        })

        // Call Groq API with SAFE BASELINE parameters
        const payload = {
            model: 'llama-3.3-70b-versatile', // Updated to supported model
            messages: messages,
            temperature: 0.2,
            top_p: 0.9,
            max_tokens: 800,         // Restoring 800 tokens as it's safe for 3.3
            stream: false
        }

        console.log('Sending request to Groq:', JSON.stringify(payload, null, 2))

        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })

        if (!response.ok) {
            const errorText = await response.text()
            console.error('❌ Groq API Critical Error:', {
                status: response.status,
                statusText: response.statusText,
                body: errorText
            })

            // Debugging: Return the actual error
            return Response.json(
                {
                    ok: false,
                    errorType: "GROQ_API_ERROR (HTTP)",
                    message: `Groq API Error: ${response.status} ${response.statusText} - ${errorText}`,
                    status: response.status
                },
                { status: 500 }
            )
        }

        const data = await response.json()

        if (!data.choices || !data.choices.length) {
            console.error('❌ Invalid Groq Response Structure:', JSON.stringify(data))
            throw new Error('Invalid response structure from Groq')
        }

        const assistantMessage = data.choices[0].message.content
        return Response.json({ response: assistantMessage })

    } catch (e) {
        console.error("GROQ API ERROR:", e);
        return Response.json(
            {
                ok: false,
                errorType: "GROQ_API_ERROR",
                message: e?.message || String(e),
                status: e?.status || null,
                code: e?.code || null,
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
