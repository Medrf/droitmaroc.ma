import { CONTRACT_AUDIT_PROMPT } from '@/lib/contractPrompts'

// DeepSeek API endpoint
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'

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
        if (!process.env.DEEPSEEK_API_KEY) {
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

        // Call DeepSeek API
        const response = await fetch(DEEPSEEK_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                max_tokens: 1200,
                temperature: 0.2,
                top_p: 0.9,
                frequency_penalty: 0.2,
                presence_penalty: -0.2,
                messages: messages
            })
        })

        if (!response.ok) {
            const error = await response.text()
            console.error('DeepSeek API Error:', error)
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
