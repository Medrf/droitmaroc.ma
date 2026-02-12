import { CONTRACT_AUDIT_PROMPT } from '@/lib/contractPrompts'

// Gemini API endpoint (OpenAI-compatible)
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions'

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

        // Prepare system prompt with contract context
        const systemMessage = {
            role: 'system',
            content: `${CONTRACT_AUDIT_PROMPT}\n\n━━━━━━━━━━━━━━━━━━\nDOCUMENT À ANALYSER :\n━━━━━━━━━━━━━━━━━━\n${contractText}`
        }

        // Prepare conversation history
        const messages = [systemMessage]

        // Add history if valid
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

        // Add current message
        messages.push({
            role: 'user',
            content: message
        })

        // Call Gemini API
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gemini-2.0-flash',
                max_tokens: 1200,
                temperature: 0.2,
                top_p: 0.9,
                messages: messages
            })
        })

        if (!response.ok) {
            const error = await response.text()
            console.error('Gemini API Error:', error)
            throw new Error('API request failed')
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
