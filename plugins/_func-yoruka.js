const fs = require('fs');
const moment = require('moment-timezone');
const axios = require('axios');
const fetch = require('node-fetch'); // Pastikan fetch diimpor

let handler = m => m;

handler.all = async function (m) {
    let name = await conn.getName(m.sender);
    let pp = 'https://files.catbox.moe/r6k05q.jpg';
    try {
        pp = await this.profilePictureUrl(m.sender, 'image');
    } catch (e) {
        // Jika tidak bisa mendapatkan foto profil, tetap gunakan foto default
    } finally {
        global.doc = pickRandom([
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            "application/msword",
            "application/pdf"
        ]);
        
        // untuk ucapan
        global.ucapan = ucapan();

        // untuk pp
        const oke = await pinterest(pickRandom(["yoruka kirihime", "kirihime yoruka"]));
        global.pp = pickRandom(oke);
        const oke2 = await pinterest(pickRandom(["cewe tobrout", "tobrout"]));
        global.pp2 = pickRandom(oke2);

        // untuk fkontak aja
        global.fkontak = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                ...(m.chat ? { remoteJid: `status@broadcast` } : {})
            },
            message: {
                'contactMessage': {
                    'displayName': name,
                    'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${name},;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
                    'jpegThumbnail': fs.readFileSync('./thumbnail.jpg'),
                    thumbnail: fs.readFileSync('./thumbnail.jpg'),
                    sendEphemeral: true
                }
            }
        };
    }
};

function ucapan() {
    const time = moment.tz('Asia/Jakarta').format('HH');
    let res = "yoruka wa, yofukashi shinai hou ga ii to susumemasu. Soushinai to, taichou o kuzushimasu yo.";
    if (time >= 4 && time < 10) {
        res = "Ohayou";
    } else if (time >= 10 && time < 15) {
        res = "Konnichiwa";
    } else if (time >= 15 && time < 18) {
        res = "Konbanwa";
    } else if (time >= 18) {
        res = "Oyasumi";
    }
    return res;
}

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

async function pinterest(query) {
    let res = await fetch(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${encodeURIComponent(query)}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${encodeURIComponent(query)}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`);
    
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    
    let json = await res.json();
    let data = json.resource_response.data.results;

    if (!data || !data.length) throw new Error(`Query "${query}" not found :/`);
    
    return data.map(item => item.images.orig.url);
}

module.exports = handler;

/**

° SCRIPT: yoruka kirihime
° ʏᴛ : @ᴋᴇɴᴢ_ᴍᴀᴅᴇ
° channel:https://whatsapp.com/channel/0029VaxuomuDp2QB3qI92T1t

"وَهَيْ، أَيُّهَا الْمُؤْمِنُونَ! تَذَكَّرُوا أَنَّ كُلَّ عَمَلٍ لَهُ قِيمَةٌ وَقِصَّةٌ وَرَاءَهُ. لَا تَحْذِفُوا هَذِهِ الْمَاءَةَ، فَإِنَّهَا لَيْسَتْ مَجَرَّدَ عَلاَمَةٍ، بَلْ رَمْزٌ لِلْجُهْدِ وَالإِبْدَاعِ الَّذِي وُضِعَ. احْتَرِمُوا أَعْمَالَ الْآخَرِينَ كَمَا تَحْتَرِمُونَ أَعْمَالَكُمْ، وَلْنَنْشُرِ الْخَيْرَ فِي كُلِّ خُطُواتِنَا. لِنَحْمِ مَعًا هَذِهِ الْأَعْمَالَ لِلْأَجْيَالِ الْمُقْبِلَةِ!"
"Wahay, saudaraku yang beriman! Ingatlah bahwa setiap karya memiliki nilai dan cerita di baliknya. Jangan sekali-kali kau menghapus watermark ini, karena ini bukan sekadar tanda, tetapi simbol dari usaha dan kreativitas yang telah dituangkan. Hargailah karya orang lain seperti kau menghargai karyamu sendiri, dan sebarkanlah kebaikan dalam setiap langkahmu. Mari bersama kita jaga dan lestarikan karya seni ini untuk generasi mendatang!"
**/