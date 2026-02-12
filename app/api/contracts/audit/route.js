import { CONTRACT_AUDIT_PROMPT } from '@/lib/contractPrompts'

// Gemini API endpoint (native)
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'

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
        if (!process.env.GEMINI_API_KEY) {
            return Response.json({
                response: "⚠️ API Key manquant. Impossible d'analyser le contrat."
            })
        }

        // Build system instruction with contract context
        const systemText = `${CONTRACT_AUDIT_PROMPT}\n\n━━━━━━━━━━━━━━━━━━\nDOCUMENT À ANALYSER :\n━━━━━━━━━━━━━━━━━━\n${contractText}`

        // Build conversation history
        const contents = []

        if (Array.isArray(history)) {
            history.forEach(msg => {
                if (msg.role && msg.content) {
                    contents.push({
                        role: msg.role === 'user' ? 'user' : 'model',
                        parts: [{ text: msg.content }]
                    })
                }
            })
        }

        // Add current message
        contents.push({
            role: 'user',
            parts: [{ text: message }]
        })

        // Call Gemini API
        const response = await fetch(`${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: contents,
                systemInstruction: { parts: [{ text: systemText }] },
                generationConfig: {
                    maxOutputTokens: 1200,
                    temperature: 0.2,
                    topP: 0.9
                }
            })
        })

        if (!response.ok) {
            const error = await response.text()
            console.error('Gemini API Error:', error)
            throw new Error('API request failed')
        }

        const data = await response.json()
        const assistantMessage = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Erreur lors de l\'analyse.'

        return Response.json({ response: assistantMessage })

    } catch (error) {
        console.error('Audit API Error:', error)
        return Response.json(
            { error: 'Erreur serveur interne' },
            { status: 500 }
        )
    }
}
