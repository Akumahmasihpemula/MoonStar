const { TikTok } = require("../scrape/tiktok.js");

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Masukkan link TikTok berisi gambar\n\nContoh:\n> ${command} https://vt.tiktok.com/ZS6AXgeGu/`;
    m.react("🕐");

    try {
        const respon = await TikTok.img(text);
        // Pastikan respon.data ada dan merupakan array
        if (!respon.data || !Array.isArray(respon.data)) {
            throw new Error("Tidak ada data yang ditemukan.");
        }

        // Kirim gambar pertama ke grup
        await conn.sendMessage(m.chat, {
            image: { url: respon.data[0].url_img },
            caption: null,
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: idkom,
                    serverMessageId: null,
                    newsletterName: wm,
                },
            }
        }, { quoted: m });
        m.reply("*_[ PESAN PENTING ]_*\n> sisa nya di kirim ke privat ") 

        // Kirim gambar sisanya lewat private chat
        for (let i = 1; i < respon.data.length; i++) {
            const privateChatId = m.sender;
            await conn.sendMessage(privateChatId, {
                image: { url: respon.data[i].url_img },
                caption: null,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: idkom,
                        serverMessageId: null,
                        newsletterName: wm,
                    },
                }
            }, { quoted: m });
        }

        m.react("✅");
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return `Error: ${error.message}`;
    }
}

handler.help = ['tiktokslide <url>'];
handler.tags = ['dl'];
handler.command = /^(ttslide|tiktokslide|ttfoto|ttimg|tiktokfoto|tiktokimage)$/i;
handler.limit = true;

module.exports = handler;