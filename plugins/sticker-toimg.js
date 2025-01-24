const { webp2png } = require('../lib/webp2mp4.js');

let handler = async (m, { conn, usedPrefix, command }) => {
    if (!m.quoted) throw `[ PENGGUNAAN COMMAND ]\n> reply sticker yang mau di jadikan image/foto`;
    m.react("⌛");
    let mime = m.quoted.mimetype || '';
    if (!/webp/.test(mime)) throw `Balas stiker dengan perintah ${usedPrefix + command}`;
    
    let media = await m.quoted.download();
    let out = Buffer.alloc(0);
    
    if (/webp/.test(mime)) {
        out = await webp2png(media);
    }    
    
    conn.sendFile(m.chat, out, 'output.png', done, m);
};

handler.help = ['toimg'];
handler.tags = ['sticker'];
handler.command = /^(toimg)$/i;
handler.limit = 3;

module.exports = handler;