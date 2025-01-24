const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

let handler = async (m, { conn, text, command }) => {
    if (!text) throw `masukan text yang mau di enc\n\ncontoh\n.${command} const axios = require("axios")`;
    m.react("✨");
    try {
        let apii = JavaScriptObfuscator.obfuscate(text);
        const folderPath = './tmp';
        const filePath = path.join(folderPath, 'dienc.js');
        
        // Pastikan folder tmp ada
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
        
        fs.writeFileSync(filePath, `/**
° MAKIMA AI
° Date: ${new Date().toLocaleDateString()}
° wm jangan di apus yak om :v
**/\n\n` + apii.getObfuscatedCode(), 'utf8');
        
        m.reply(`
/**======================
დ .•*””*• SUKSES ENCRYPT•*””*•.დ
========================**/

${apii.getObfuscatedCode()}`);
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        await conn.sendFile(m.chat, filePath, 'dienc.js', `SELESAI ENCRYPT PADA ${new Date().toLocaleDateString()}`, m);
        m.react("✅");
    } catch (e) {
        console.log(e);
        return m.reply(e.message);
    }
};

handler.help = ['encrypt'];
handler.tags = ['tools'];
handler.command = /^enc(rypt)?$/i;
handler.limit = 10;

module.exports = handler;