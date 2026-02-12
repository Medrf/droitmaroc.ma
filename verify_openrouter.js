const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

async function verifyOpenRouter() {
    const apiKey = process.env.OPENROUTER_API_KEY;
    const model = process.env.OPENROUTER_MODEL || 'google/gemini-2.0-flash-001';

    console.log('Testing OpenRouter connection with model:', model);

    if (!apiKey) {
        console.error('❌ OPENROUTER_API_KEY is missing from .env.local');
        return;
    }

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    { role: 'user', content: 'Say "Hello, World!"' }
                ],
                max_tokens: 10
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ OpenRouter API Error:', response.status, response.statusText);
            console.error('Response Body:', errorText);
            return;
        }

        const data = await response.json();
        const successMsg = '✅ OpenRouter Response Check: ' + data.choices[0].message.content;
        console.log(successMsg);
        fs.writeFileSync('verify_result.txt', successMsg);

    } catch (error) {
        const errorMsg = '❌ Network or parsing error: ' + error;
        console.error(errorMsg);
        fs.writeFileSync('verify_result.txt', errorMsg);
    }
}

verifyOpenRouter();
