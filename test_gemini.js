// Quick test of the Gemini API key
const https = require('https');

const API_KEY = 'AIzaSyCPdBbpW5QFoVh1DHgaCZH3yviHgHwoYuI';
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const payload = JSON.stringify({
    contents: [{ role: 'user', parts: [{ text: 'Say hello in one word' }] }],
    generationConfig: { maxOutputTokens: 10 }
});

const urlObj = new URL(url);
const options = {
    hostname: urlObj.hostname,
    path: urlObj.pathname + urlObj.search,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
};

const req = https.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const fs = require('fs');
        fs.writeFileSync('/Users/mohamedaminerifai/.gemini/antigravity/scratch/moroccan-legal-ai/api_test_result.txt',
            `STATUS: ${res.statusCode}\nRESPONSE: ${data}`);
        console.log('Done - check api_test_result.txt');
    });
});

req.on('error', (e) => {
    const fs = require('fs');
    fs.writeFileSync('/Users/mohamedaminerifai/.gemini/antigravity/scratch/moroccan-legal-ai/api_test_result.txt',
        `ERROR: ${e.message}`);
});

req.write(payload);
req.end();
