const { bstation } = require("../scrape/blibli.js");

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`*_[ CARA PENGGUNAAN ]_*\n> Example: ${usedPrefix + command} isekai`);
    
    m.reply("*_Tunggu sebentar..._*");
    
    try {
        const data = await bstation.search(text);
        
        if (!data.result || data.result.length === 0) {
            return m.reply("Tidak ada hasil yang ditemukan.");
        }
        
        const cap = `_*[ SEARCH BLIBLI ]*_\n\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n${data.result.map((a, index) => 
            `*_[ ${index + 1} ]_*\n\n❒ ᴛɪᴛʟᴇ: ${a.title}\n❒ ᴜʀʟ: ${a.link}\n`
        ).join("\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n")}`;
        
        let reskey = await conn.sendMessage(m.chat, {
            image: { url: data.result[0].image },
            caption: cap,
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: m.sender,
                    serverMessageId: null,
                    newsletterName: 'Your Newsletter Name', // Ganti dengan nama newsletter yang sesuai
                },
            }
        }, { quoted: m });
        
    } catch (e) {
        console.error(e);
        m.reply("Terjadi kesalahan: " + e.message);
    }
}

handler.help = ['bliblisearch'];
handler.tags = ['search'];
handler.command = /^(bliblisearch|blibli)$/i;
handler.premium = true;

module.exports = handler;