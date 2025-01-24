const { webp2mp4 } = require('../lib/webp2mp4.js');

let handler = async (m, { conn, usedPrefix, command }) => {
    if (!m.quoted) throw `reply sticker yang mau di jadikan video`;
    m.react("⌛");
    let mime = m.quoted.mimetype || '';
    if (!/webp/.test(mime)) throw `Balas Stiker Dengan Perintah ${usedPrefix + command}`;
    
    let media = await m.quoted.download();
    let out = Buffer.alloc(0);
    
    if (/webp/.test(mime)) {
        out = await webp2mp4(media);
    }   
    
    await conn.sendFile(m.chat, out, 'out.mp4', '', m, 0, { thumbnail: out });
};

handler.help = ['tovideo'];
handler.tags = ['sticker'];
handler.command = ['tovideo', 'tomp4', 'tovid'];
handler.limit = 4;

module.exports = handler;