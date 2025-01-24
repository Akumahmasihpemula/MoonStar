const { otakudesusearch, otakudesuepisode, otakudesudown } = require("../scrape/otakudesu.js");

let handler = async (m, { conn, text, command }) => {
    const [commands, query] = text.split('|').map(str => str.trim().toLowerCase());
    if (!commands || !query) {
        return m.reply(`Input pencarian\n\nContoh:\n.${command} search|isekai\n\nList lainnya:\n download\n episode\n\n> *selamat menggunakan fitur otakudesu jika ada eror segera chat own yah kak ${m.name}*`);
    }
    m.react("⌛");
    if (commands === 'search') {
        const api = await otakudesusearch(query);
        if (api && api.Data.length > 0) {
            const data = api.Data.map(b => `❍ TITLE: ${b.title}
❍ STATUS: ${b.status}
❍ RATING: ${b.rating}
❍ URL: ${b.link}`).join("\n\n");
            m.reply("SEARCH OTAKU\n\n" + data);
        } else {
            m.reply(`Maaf, pencarian: ${query} tidak ditemukan hasil`);
        }
    } else if (commands === 'episode') {
        const result = await otakudesuepisode(query);
        if (result && result.Data.length > 0) {
            let responseMessage = `*DAFTAR EPISODE OTAKUDESU*\n\n`;
            const img = result.Data[0].gambar;
            result.Data.forEach(item => {
                for (const [key, value] of Object.entries(item.info)) {
                    responseMessage += `${key}: ${value}\n`;
                }
                responseMessage += `\n\n\`\`LIST EPISODE:\`\`\n\n`;
                item.episodeList.forEach(episode => {
                    responseMessage += `TITLE: ${episode.title}\nURL: ${episode.link}\nDATE: ${episode.date}\n\n`;
                });
                responseMessage += `\n`;
            });
            m.reply(responseMessage); // Mengirimkan pesan hasil
        } else {
            m.reply(`Link tersebut bukan link utama contoh link https://otakudesu.cloud/anime/seija-msou-sub-indo/`);
        }
    } else if (commands === 'download') {
        const keyy = await otakudesudown(query);
        if (keyy && keyy.Data.length > 0) {
            let responseMessage = `DOWNLOAD OTAKUDESU\n\nTITLE: ${keyy.Data[0].title}\nLIST DOWNLOAD\n`;
            keyy.Data[0].downloadLinks.forEach(link => {
                responseMessage += `\n${link.text}: ${link.href}\n`;
            });
            m.reply(responseMessage);
            conn.sendFile(m.chat, keyy.Data[0].imageUrl, "image.jpg", responseMessage, m);
        } else {
            m.reply(keyy.message);
        }
    }
    m.react("✅");
};

handler.help = ['otakudesu *[SEARCH]*'];
handler.tags = ['anime'];
handler.command = /^(otakudesu|otaku|otakudesusearch)$/i;

module.exports = handler;

/**

° SCRIPT: yoruka kirihime
° ʏᴛ : @ᴋᴇɴᴢ_ᴍᴀᴅᴇ
° channel:https://whatsapp.com/channel/0029VaxuomuDp2QB3qI92T1t

"وَهَيْ، أَيُّهَا الْمُؤْمِنُونَ! تَذَكَّرُوا أَنَّ كُلَّ عَمَلٍ لَهُ قِيمَةٌ وَقِصَّةٌ وَرَاءَهُ. لَا تَحْذِفُوا هَذِهِ الْمَاءَةَ، فَإِنَّهَا لَيْسَتْ مَجَرَّدَ عَلاَمَةٍ، بَلْ رَمْزٌ لِلْجُهْدِ وَالإِبْدَاعِ الَّذِي وُضِعَ. احْتَرِمُوا أَعْمَالَ الْآخَرِينَ كَمَا تَحْتَرِمُونَ أَعْمَالَكُمْ، وَلْنَنْشُرِ الْخَيْرَ فِي كُلِّ خُطُواتِنَا. لِنَحْمِ مَعًا هَذِهِ الْأَعْمَالَ لِلْأَجْيَالِ الْمُقْبِلَةِ!"
"Wahay, saudaraku yang beriman! Ingatlah bahwa setiap karya memiliki nilai dan cerita di baliknya. Jangan sekali-kali kau menghapus watermark ini, karena ini bukan sekadar tanda, tetapi simbol dari usaha dan kreativitas yang telah dituangkan. Hargailah karya orang lain seperti kau menghargai karyamu sendiri, dan sebarkanlah kebaikan dalam setiap langkahmu. Mari bersama kita jaga dan lestarikan karya seni ini untuk generasi mendatang!"
**/