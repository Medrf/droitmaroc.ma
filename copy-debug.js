const fs = require('fs');
const path = require('path');

const source = '/Users/mohamedaminerifai/.gemini/antigravity/brain/591e61b8-7d46-40d1-8e0c-6a21aa85d781/uploaded_media_1770307507922.jpg';
const dest = '/Users/mohamedaminerifai/.gemini/antigravity/scratch/moroccan-legal-ai/public/logo-brand.jpg';

try {
    console.log(`Copying from ${source} to ${dest}...`);
    if (!fs.existsSync(source)) {
        console.error('Source file does not exist!');
        process.exit(1);
    }
    fs.copyFileSync(source, dest);
    console.log('Copy successful!');
    if (fs.existsSync(dest)) {
        console.log('Destination file verified exists.');
        console.log('Size:', fs.statSync(dest).size);
    } else {
        console.error('Destination file missing after copy!');
    }
} catch (err) {
    console.error('Error copying file:', err);
    process.exit(1);
}
