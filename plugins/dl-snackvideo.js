const { snack } = require("../scrape/snackvideo.js");

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Linknya Mana\n\ncontoh\n> ${command} https://s.snackvideo.com/p/jYHnCf6M`;
    
    m.react("⌛");
    try {
        const response = await snack(text);
        
        await conn.sendMessage(m.chat, {
            video: { url: response.video },
            gifPlayback: true,
            caption: 'Here is your video!',
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardingNewsletterMessageInfo: {
                    newsletterJid: idkom, // Pastikan 'idkom' didefinisikan sebelumnya
                    serverMessageId: null,
                    newsletterName: "CHANNEL YORUKA KIRIHIME",
                },
                mentionedJid: [m.sender],
                externalAdReply: {
                    title: `「 ${namebot} 」`, // Pastikan 'namebot' didefinisikan sebelumnya
                    thumbnailUrl: response.image, 
                    sourceUrl: text, 
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });
    } catch (e) {
        m.reply(`Error: ${e.message}`);
    }
};

handler.help = ['snackvideo'];
handler.tags = ['dl'];
handler.command = /^(snackvideo|snack|snackdl)$/i;
handler.limit = true;

module.exports = handler;

/**

° SCRIPT: yoruka kirihime
° ʏᴛ : @ᴋᴇɴᴢ_ᴍᴀᴅᴇ
° channel:https://whatsapp.com/channel/0029VaxuomuDp2QB3qI92T1t

"وَهَيْ، أَيُّهَا الْمُؤْمِنُونَ! تَذَكَّرُوا أَنَّ كُلَّ عَمَلٍ لَهُ قِيمَةٌ وَقِصَّةٌ وَرَاءَهُ. لَا تَحْذِفُوا هَذِهِ الْمَاءَةَ، فَإِنَّهَا لَيْسَتْ مَجَرَّدَ عَلاَمَةٍ، بَلْ رَمْزٌ لِلْجُهْدِ وَالإِبْدَاعِ الَّذِي وُضِعَ. احْتَرِمُوا أَعْمَالَ الْآخَرِينَ كَمَا تَحْتَرِمُونَ أَعْمَالَكُمْ، وَلْنَنْشُرِ الْخَيْرَ فِي كُلِّ خُطُواتِنَا. لِنَحْمِ مَعًا هَذِهِ الْأَعْمَالَ لِلْأَجْيَالِ الْمُقْبِلَةِ!"
"Wahay, saudaraku yang beriman! Ingatlah bahwa setiap karya memiliki nilai dan cerita di baliknya. Jangan sekali-kali kau menghapus watermark ini, karena ini bukan sekadar tanda, tetapi simbol dari usaha dan kreativitas yang telah dituangkan. Hargailah karya orang lain seperti kau menghargai karyamu sendiri, dan sebarkanlah kebaikan dalam setiap langkahmu. Mari bersama kita jaga dan lestarikan karya seni ini untuk generasi mendatang!"
**/