const fs = require('fs');

async function testDeepSeek() {
    const results = [];

    try {
        results.push('Starting DeepSeek API test...');
        results.push(`API Key: sk-06bb...${('sk-06bb2ce8f6154d95a6504345be1e6773').slice(-4)}`);

        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer sk-06bb2ce8f6154d95a6504345be1e6773',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [{ role: 'user', content: 'Say hello in one word' }],
                max_tokens: 10,
                temperature: 0.15,
                stream: false
            })
        });

        results.push(`HTTP Status: ${response.status} ${response.statusText}`);

        const text = await response.text();
        results.push(`Response: ${text}`);

    } catch (e) {
        results.push(`ERROR: ${e.message}`);
    }

    fs.writeFileSync('/Users/mohamedaminerifai/.gemini/antigravity/scratch/moroccan-legal-ai/test_result.txt', results.join('\n'));
}

testDeepSeek();
