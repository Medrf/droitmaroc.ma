import { CONTRACT_AUDIT_PROMPT } from '@/lib/contractPrompts'

// OpenRouter API endpoint
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'

export async function POST(request) {
    try {
        const { message, contractText, history } = await request.json()

        if (!message || typeof message !== 'string') {
            return Response.json(
                { error: 'Message is required' },
                { status: 400 }
            )
        }

        if (!contractText || typeof contractText !== 'string') {
            return Response.json(
                { error: 'Contract text is required' },
                { status: 400 }
            )
        }

        // Check if API key is configured
        if (!process.env.OPENROUTER_API_KEY) {
            return Response.json({
                response: "⚠️ API Key manquant (OPENROUTER_API_KEY). Impossible d'analyser le contrat."
            })
        }

        // --- CREDIT CHECK ---
        const { currentUser } = await import('@clerk/nextjs/server')
        const { deductCredits } = await import('@/lib/credits')

        const user = await currentUser()

        if (user) {
            const deduction = await deductCredits(user.id, 4, 'contract_audit') // Cost: 4 credits

            if (!deduction.success) {
                if (deduction.error === 'PAYWALL') {
                    return Response.json(
                        { error: 'Crédits quotidiens épuisés (Daily credits exhausted)', code: 'PAYWALL' },
                        { status: 402 }
                    )
                }
            }
        }

        // Build system instructions
        const systemInstruction = `
${CONTRACT_AUDIT_PROMPT}

━━━━━━━━━━━━━━━━━━
DOCUMENT À ANALYSER :
━━━━━━━━━━━━━━━━━━
${contractText}
`

        // Build chat history for OpenRouter (OpenAI format)
        const messages = [
            { role: 'system', content: systemInstruction }
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

        // Add current user message
        messages.push({ role: 'user', content: message })

        // Call OpenRouter API
        const response = await fetch(OPENROUTER_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://Loidumaroc.ma',
                'X-Title': 'Moroccan Legal AI',
            },
            body: JSON.stringify({
                model: 'google/gemini-2.0-flash-001',
                messages: messages,
                temperature: 0.2,
                top_p: 0.95,
                max_tokens: 2000
            })
        })

        if (!response.ok) {
            const errorText = await response.text()
            console.error('OpenRouter API Error:', errorText)
            throw new Error(`API request failed: ${errorText}`)
        }

        const data = await response.json()
        const assistantMessage = data.choices?.[0]?.message?.content || 'Erreur lors de l\'analyse.'

        return Response.json({ response: assistantMessage })

    } catch (error) {
        console.error('Audit API Error:', error)
        return Response.json(
            { error: 'Erreur serveur interne' },
            { status: 500 }
        )
    }
}
