const fs = require('fs');
const syntaxError = require('syntax-error');
const path = require('path');

const _fs = fs.promises;

let handler = async (m, { text, usedPrefix, command, __dirname }) => {
    if (!text) throw `
Penggunaan: ${usedPrefix}${command} <name file>
Contoh: ${usedPrefix}getfile main.js
        ${usedPrefix}getplugin owner
`.trim();
    
    if (/p(lugin)?/i.test(command)) {
        const filename = text.replace(/plugin(s)\//i, '') + (/\.js$/i.test(text) ? '' : '.js');
        const pathFile = path.join(__dirname, filename);
        const file = await _fs.readFile(pathFile, 'utf8');
        m.reply(file);
        const error = syntaxError(file, filename, {
            sourceType: 'module',
            allowReturnOutsideFunction: true,
            allowAwaitOutsideFunction: true
        });
        if (error) {
            await m.reply(`
Error found in *${filename}*:
\`\`\`
${error}
\`\`\`
`.trim());
        }

    } else {
        const isJavascript = /\.js/.test(text);
        if (isJavascript) {
            const file = await _fs.readFile(text, 'utf8');
            m.reply(file);
            const error = syntaxError(file, text, {
                sourceType: 'module',
                allowReturnOutsideFunction: true,
                allowAwaitOutsideFunction: true
            });
            if (error) {
                await m.reply(`
Error found in *${text}*:
\`\`\`
${error}
\`\`\`
`.trim());
            }
        } else {
            const file = await _fs.readFile(text, 'base64');
            await m.reply(Buffer.from(file, 'base64'));
        }
    }
};

handler.help = ['getfile'];
handler.tags = ['owner'];
handler.command = /^(getfile)$/i;

handler.rowner = true;

module.exports = handler;