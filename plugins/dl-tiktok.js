const { TikTok } = require("../scrape/tiktok.js");

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Masukkan URL TikTok\n\nContoh:\n.${command} https://vt.tiktok.com/ZS2pGFqqm/\n\n> Jika mau mendownload image gunakan command .tiktokimg url`;
    
    m.react("🕐");
    
    try {
        const response = await TikTok.tiktokdl(text);
        
        if (response && response.data && response.data.length > 0 && response.status) {
            const { aktor, desc, vid_hd } = response.data[0];
            
            if (aktor && desc && vid_hd) {
                const cap = `\`DOWNLOAD TIKTOK\`\n` +
                            `\n` +
                            `AKTOR: ${aktor}\n` +
                            `DESC: ${desc}\n\n` +
                            `${wm}`;
                            
                await conn.sendMessage(m.chat, {
                    video: { url: vid_hd },
                    caption: cap,
                    contextInfo: {
                        forwardingScore: 1,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: idkom, // Pastikan idkom terdefinisi
                            serverMessageId: null,
                            newsletterName: wm, // Pastikan wm terdefinisi
                        },
                    }
                }, { quoted: m });           
            } 
            m.react("✅");
        } else {
            throw new Error("Tidak ada data yang ditemukan untuk URL ini.");
        }
    } catch (e) {
        m.reply(`Terjadi kesalahan: ${e.message}`);
    }
};

handler.help = ['tiktok'].map(v => v + ' *<url>*');
handler.tags = ['dl'];
handler.command = /^(tiktok|tt|tiktokdl|tiktoknowm)$/i;
handler.limit = 2;

module.exports = handler;