const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'components/ui');

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
        if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            const filePath = path.join(directoryPath, file);
            let content = fs.readFileSync(filePath, 'utf8');
            if (!content.includes('"use client"') && !content.includes("'use client'")) {
                content = '"use client";\n\n' + content;
                fs.writeFileSync(filePath, content, 'utf8');
                console.log('Added use client to ' + file);
            }
        }
    });
});
