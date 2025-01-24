const gtts = require('node-gtts');
const { readFileSync, unlinkSync } = require('fs');
const { join } = require('path');
const defaultLang = 'id';
const defaultLangList = `
1. id - Indonesia
2. en - Inggris
3. ja - Jepang
4. fr - Prancis
5. de - Jerman
6. es - Spanyol
7. zh - Mandarin
8. ru - Rusia
9. ko - Korea
10. ar - Arab
`;
let handler = async (m, { conn, args, usedPrefix, command }) => {
let lang = args[0];
let text = args.slice(1).join(' ');
// Jika tidak ada argumen bahasa yang valid
if (!lang || (lang.length !== 2)) {
lang = defaultLang;
text = args.join(' ');
}
if (!text && m.quoted?.text) text = m.quoted.text;
let res;
try {
res = await tts(text, lang);
} catch (e) {
m.reply(e + '');
text = args.join(' ');
if (!text) {
m.reply(`Gunakan contoh: ${usedPrefix}${command} en hello world\n\nDaftar bahasa yang tersedia:\n${defaultLangList}`);
return;
}
res = await tts(text, defaultLang);
} finally {
if (res) conn.sendFile(m.chat, res, 'tts.opus', null, m, true);
}
}
handler.help = ['tts <lang> <teks>'];
handler.tags = ['tools'];
handler.command = /^vn|tts$/i;
handler.limit = true;
module.exports = handler;
function tts(text, lang = 'id') {
return new Promise((resolve, reject) => {
try {
let tts = gtts(lang);
let filePath = join(__dirname, '../tmp', (1 * new Date) + '.wav');
tts.save(filePath, text, () => {
resolve(readFileSync(filePath));
unlinkSync(filePath);
});
} catch (e) {
reject(e);
}
});
}