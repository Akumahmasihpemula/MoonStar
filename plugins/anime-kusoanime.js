const { kusonime } = require("../scrape/kusoanime.js") 
let handler = async (m, { conn: yoruka, text, usedPrefix, command }) => {
    if (!text) throw ` *_[ PENGGUNAAN FITUR ]_* \n> Example: ${usedPrefix + command} title/url`;
    
    m.reply('⌛ Sedang memproses...');

    if (text.includes('http://') || text.includes('https://')) {
        if (!text.includes('kusonime.com')) return m.reply(`❎ Itu bukan URL Kusonime`);
        try {
            const response = await kusonime.detail(text);
            if (response.data) {
                // Kirim detail ke pengguna
                yoruka.sendFile(m.chat, response.data.thumbnail, "eror.jpg", `DETAIL KUSOANIME\n\nTitle: ${response.data.title}\nViews: ${response.data.views}\nInfo: ${JSON.stringify(response.data.info)}\nSynopsis: ${response.data.synopsis.join('\n')}`, m);
            } else {
                m.reply(`🔴 Terjadi kesalahan saat mengambil detail.`);
            }
        } catch (e) {
            m.reply(`🔴 ${e.message}`);
        }
    } else {
        try {
            const response = await kusonime.search(text);
            if (response.data.length > 0) {
                const hasil = response.data.map(v => `TITLE: ${v.title}\nURL: ${v.link}\nTIME: ${v.releaseTime}\nGENRES: ${v.genres.join(', ')}\n`).join("\n");
                yoruka.sendFile(m.chat, response.data[0].thumbnail, "eror.jpg", `SEARCH KUSOANIME\n\n${hasil}`, m);
            } else {
               m.reply(`🔴 Tidak ditemukan hasil untuk pencarian "${text}".`);
            }
        } catch (e) {
            m.reply(`🔴 ${e.message}`);
        }
    }
};

handler.help = ['kusoanime'];
handler.tags = ['anime'];
handler.command = ['kusoanime', 'kusoanimesearch','kuso'];
handler.limit = 3;

module.exports = handler;

/**

° SCRIPT: yoruka kirihime
° ʏᴛ : @ᴋᴇɴᴢ_ᴍᴀᴅᴇ
° channel:https://whatsapp.com/channel/0029VaxuomuDp2QB3qI92T1t

"وَهَيْ، أَيُّهَا الْمُؤْمِنُونَ! تَذَكَّرُوا أَنَّ كُلَّ عَمَلٍ لَهُ قِيمَةٌ وَقِصَّةٌ وَرَاءَهُ. لَا تَحْذِفُوا هَذِهِ الْمَاءَةَ، فَإِنَّهَا لَيْسَتْ مَجَرَّدَ عَلاَمَةٍ، بَلْ رَمْزٌ لِلْجُهْدِ وَالإِبْدَاعِ الَّذِي وُضِعَ. احْتَرِمُوا أَعْمَالَ الْآخَرِينَ كَمَا تَحْتَرِمُونَ أَعْمَالَكُمْ، وَلْنَنْشُرِ الْخَيْرَ فِي كُلِّ خُطُواتِنَا. لِنَحْمِ مَعًا هَذِهِ الْأَعْمَالَ لِلْأَجْيَالِ الْمُقْبِلَةِ!"
"Wahay, saudaraku yang beriman! Ingatlah bahwa setiap karya memiliki nilai dan cerita di baliknya. Jangan sekali-kali kau menghapus watermark ini, karena ini bukan sekadar tanda, tetapi simbol dari usaha dan kreativitas yang telah dituangkan. Hargailah karya orang lain seperti kau menghargai karyamu sendiri, dan sebarkanlah kebaikan dalam setiap langkahmu. Mari bersama kita jaga dan lestarikan karya seni ini untuk generasi mendatang!"
**/