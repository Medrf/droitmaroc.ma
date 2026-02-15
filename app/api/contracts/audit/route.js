import { CONTRACT_AUDIT_PROMPT } from '@/lib/contractPrompts'

// Native Gemini API endpoint
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'

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
                response: "⚠️ API Key manquant (GEMINI_API_KEY). Impossible d'analyser le contrat."
            })
        }

        // Build system instructions
        const systemInstruction = `
${CONTRACT_AUDIT_PROMPT}

━━━━━━━━━━━━━━━━━━
DOCUMENT À ANALYSER :
━━━━━━━━━━━━━━━━━━
${contractText}
`

        // Build chat history for Gemini
        const contents = []

        if (Array.isArray(history)) {
            history.forEach(msg => {
                if (msg.role && msg.content) {
                    contents.push({
                        role: msg.role === 'user' ? 'user' : 'model', // Gemini uses 'model' instead of 'assistant'
                        parts: [{ text: msg.content }]
                    })
                }
            })
        }

        // Add current user message
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
                systemInstruction: { parts: [{ text: systemInstruction }] },
                generationConfig: {
                    maxOutputTokens: 2000,
                    temperature: 0.2,
                    topP: 0.95
                }
            })
        })

        if (!response.ok) {
            const errorText = await response.text()
            console.error('Gemini API Error:', errorText)
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
