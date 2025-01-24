const PhoneNumber = require('awesome-phonenumber');

let handler = async (m, { conn, usedPrefix, text, args, command }) => {    
    let vcard = `BEGIN:VCARD
VERSION:3.0
N:WhatsApp;👑 Saya Owner yoruka kirihime;Bot;;Md
FN:${nameown}
NICKNAME:👑 KenzoFFC
ORG:Wudy
TITLE:soft
item1.TEL;waid=${nomorown}:${nomorown}
item1.X-ABLabel:📞 Nomor Owner
item2.URL:${syt}
item2.X-ABLabel:💬 More
item3.EMAIL;type=INTERNET:kenshop@gmail.com
item3.X-ABLabel:💌 kenzshop@gmail.com
item4.ADR:;; 🇮🇩 KOTA INDONESIA;;;;
item4.X-ABADR:💬 More
item4.X-ABLabel:lampung Selatan
BDAY;value=date:🔖 13 juni 2001
END:VCARD`;

    // Mengatur thumbnail
    let thumb = 'https://files.catbox.moe/hmfkkt.jpg'; // Ganti dengan path thumbnail yang sesuai

    await conn.sendMessage(m.chat, {
        contacts: {
            displayName: wm,
            contacts: [{
                vcard
            }]
        },
        contextInfo: {
            externalAdReply: {
                title: "JOIN GROUP",
                mediaType: 1,
                previewType: 0,
                renderLargerThumbnail: true,
                thumbnailUrl: thumb,
                sourceUrl: sgc, 
            }
        }
    }, { quoted: m });
}

handler.help = ['owner'];
handler.tags = ['info'];
handler.command = /^(owner|creator)$/i;

module.exports = handler;