const { createHash } = require('crypto');
const fetch = require('node-fetch');
const moment = require('moment-timezone');
const fs = require('fs');

let Reg = /(\w+)\.(\d+)\.(cowok|cewek)\.(\w+)/i;

let handler = async function (m, { text, usedPrefix, command }) {
    function pickRandom(list) {
        return list[Math.floor(Math.random() * list.length)];
    }
    
    let namae = conn.getName(m.sender);
    let d = new Date(new Date() + 3600000);
    let locale = 'id';
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5];
    let week = d.toLocaleDateString(locale, { weekday: 'long' });
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    let wibh = moment.tz('Asia/Jakarta').format('HH');
    let wibm = moment.tz('Asia/Jakarta').format('mm');
    let wibs = moment.tz('Asia/Jakarta').format('ss');
    let wktuwib = `${wibh} H ${wibm} M ${wibs} S`;
    let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://i.ibb.co/2WzLyGk/profile.jpg');
    let user = global.db.data.users[m.sender];
    
    if (user.registered === true) throw `*[ INFO DAFTAR ]*\n> Kamu sudah terdaftar. Mau daftar ulang? Gunakan unreg.`;    
    if (!Reg.test(text)) throw `*[ INFO REGISTER ]*\n> Format salah, gunakan .${command} name.age.cowok/cewek.city`;    
    
    let [_, name, age, kelamin, kota] = text.match(Reg);
    if (!name) return m.reply('*[ AKSES DENIED ]*\n> masukan nama kamu jangan kosong (yoruka kirihime)');
    if (!age) return m.reply('*[ AKSES DENIED ]*\n> masukan umur kamu jangan kosong  (17)');
    if (!kelamin) return m.reply('*[ AKSES DENIED ]*\n> masukan gender/kelamin jangan kosong (cowok/cewek)');
    if (!kota) return m.reply('*[ AKSES DENIED ]*\n> masukan negara kamu jangan kosong (japanse)');
    
    age = parseInt(age);
    if (age > 70) return m.reply('*[ AKSES DENIED ]*\n> batas umur hanya sampai 70 tahun');
    if (age < 5) return m.reply('*[ AKSES DENIED ]*\n> masih bocil bisa main bit gg 😆');
    if (kelamin !== 'cowok' && kelamin !== 'cewek') return m.reply("hanya di perbolehkan gender (cowok/cewek)");
    if (kota.split('').length > 10) return m.reply("masukan nama negara kamu contoh: Indonesia (maksimal 10 huruf)");
    if (name.split('').length > 30) return m.reply('nama terlalu panjang, maksimal hanya 30 huruf');
    
    user.name = name.trim();
    user.age = age;
    user.kota = kota;
    user.kelamin = kelamin;
    user.regTime = +new Date();
    user.registered = true;
    
    global.db.data.users[m.sender].limit = 30;
    global.db.data.users[m.sender].money = 30000;
    
    let sn = createHash('md5').update(m.sender).digest('hex');
    let cap = `*[ SUKSES REGISTRASI ]*

❑ NAME: ${name}
❒ AGE: ${age} tahun 
❒ JENIS: ${kelamin}
❒ KOTA: ${kota}

Serial kamu:
${sn}

selamat kamu sudah terdaftar di ${namebot} dan kamu mendapatkan \`30 limit\` dan \`30000\` money`;
    
    await conn.sendMessage(m.chat, {
        video: { url: "https://github.com/XM4ZE/DATABASE/raw/master/wallpaper/Vid_20240614_012416.mp4?raw=true" },
        gifPlayback: true,
        caption: cap.trim(),
        contextInfo: { mentionedJid: [m.sender] },
    }, { quoted: m });
};
handler.help = ['daftar']
handler.tags = ['xp']
handler.command = /^(daftar|verify|reg(ister)?)$/i
module.exports = handler;

/**

° SCRIPT: yoruka kirihime
° ʏᴛ : @ᴋᴇɴᴢ_ᴍᴀᴅᴇ
° channel:https://whatsapp.com/channel/0029VaxuomuDp2QB3qI92T1t

"وَهَيْ، أَيُّهَا الْمُؤْمِنُونَ! تَذَكَّرُوا أَنَّ كُلَّ عَمَلٍ لَهُ قِيمَةٌ وَقِصَّةٌ وَرَاءَهُ. لَا تَحْذِفُوا هَذِهِ الْمَاءَةَ، فَإِنَّهَا لَيْسَتْ مَجَرَّدَ عَلاَمَةٍ، بَلْ رَمْزٌ لِلْجُهْدِ وَالإِبْدَاعِ الَّذِي وُضِعَ. احْتَرِمُوا أَعْمَالَ الْآخَرِينَ كَمَا تَحْتَرِمُونَ أَعْمَالَكُمْ، وَلْنَنْشُرِ الْخَيْرَ فِي كُلِّ خُطُواتِنَا. لِنَحْمِ مَعًا هَذِهِ الْأَعْمَالَ لِلْأَجْيَالِ الْمُقْبِلَةِ!"
"Wahay, saudaraku yang beriman! Ingatlah bahwa setiap karya memiliki nilai dan cerita di baliknya. Jangan sekali-kali kau menghapus watermark ini, karena ini bukan sekadar tanda, tetapi simbol dari usaha dan kreativitas yang telah dituangkan. Hargailah karya orang lain seperti kau menghargai karyamu sendiri, dan sebarkanlah kebaikan dalam setiap langkahmu. Mari bersama kita jaga dan lestarikan karya seni ini untuk generasi mendatang!"
**/