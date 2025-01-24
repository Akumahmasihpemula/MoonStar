const moment = require('moment-timezone');

let handler = async (m, { conn, args, command }) => {
  try {
    let _muptime;
    if (process.send) {
      process.send('uptime');
      _muptime = await new Promise(resolve => {
        process.once('message', resolve);
        setTimeout(() => resolve('--'), 1000);
      }) * 1000;
    } else {
      _muptime = '--';
    }
    let muptime = clockString(_muptime);
    m.reply(`**[ 乂 RUNTIME BOTZ ]**\n\n${muptime}\n> \`${ucapan()}\``);
  } catch (e) {
    console.error(e);
    m.reply('Terjadi kesalahan dalam menghitung waktu uptime.');
  }
};

handler.help = ['runtime'];
handler.tags = ['info'];
handler.command = ['runtime', 'rt', "uptime"];

module.exports = handler;
function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return ["❍ ", d, ' *Hari*\n', "❍ ", h, ' *Jam*\n', "❍ ", m, ' *Menit*\n', "❍ ", s, ' *Detik* '].map(v => v.toString().padStart(2, 0)).join('');
}
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

/**

° SCRIPT: yoruka kirihime
° ʏᴛ : @ᴋᴇɴᴢ_ᴍᴀᴅᴇ
° channel:https://whatsapp.com/channel/0029VaxuomuDp2QB3qI92T1t

"وَهَيْ، أَيُّهَا الْمُؤْمِنُونَ! تَذَكَّرُوا أَنَّ كُلَّ عَمَلٍ لَهُ قِيمَةٌ وَقِصَّةٌ وَرَاءَهُ. لَا تَحْذِفُوا هَذِهِ الْمَاءَةَ، فَإِنَّهَا لَيْسَتْ مَجَرَّدَ عَلاَمَةٍ، بَلْ رَمْزٌ لِلْجُهْدِ وَالإِبْدَاعِ الَّذِي وُضِعَ. احْتَرِمُوا أَعْمَالَ الْآخَرِينَ كَمَا تَحْتَرِمُونَ أَعْمَالَكُمْ، وَلْنَنْشُرِ الْخَيْرَ فِي كُلِّ خُطُواتِنَا. لِنَحْمِ مَعًا هَذِهِ الْأَعْمَالَ لِلْأَجْيَالِ الْمُقْبِلَةِ!"
"Wahay, saudaraku yang beriman! Ingatlah bahwa setiap karya memiliki nilai dan cerita di baliknya. Jangan sekali-kali kau menghapus watermark ini, karena ini bukan sekadar tanda, tetapi simbol dari usaha dan kreativitas yang telah dituangkan. Hargailah karya orang lain seperti kau menghargai karyamu sendiri, dan sebarkanlah kebaikan dalam setiap langkahmu. Mari bersama kita jaga dan lestarikan karya seni ini untuk generasi mendatang!"
**/