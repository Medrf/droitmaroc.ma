const fs = require('fs');
const path = require('path');

const dirs = ['app', 'components', 'lib'];

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Replace strict matches
    content = content.replace(/droitmaroc\.ma/g, 'Loidumaroc.ma');
    content = content.replace(/DroitMaroc\.ma/g, 'Loidumaroc.ma');
    content = content.replace(/DroitMaroc/g, 'Loidumaroc');
    content = content.replace(/droitmaroc/g, 'Loidumaroc');

    // Specifically fix the Arabic translation of the AI persona name in prompts.js
    content = content.replace(/الأستاذ دروا-ماروك/g, 'الأستاذ لوا-دي-ماروك');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
}

function processDirectory(directory) {
    try {
        const files = fs.readdirSync(directory);
        for (const file of files) {
            const fullPath = path.join(directory, file);
            try {
                const stat = fs.statSync(fullPath);
                if (stat.isDirectory()) {
                    processDirectory(fullPath);
                } else if (file.match(/\.(js|jsx|ts|tsx)$/)) {
                    replaceInFile(fullPath);
                }
            } catch (err) {
                // Ignore stat errors (e.g., EPERM on .DS_Store)
            }
        }
    } catch (err) {
        console.error(`Could not read directory ${directory}: ${err.message}`);
    }
}

dirs.forEach(dir => {
    processDirectory(path.join(__dirname, dir));
});
