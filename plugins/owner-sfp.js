const fs = require("fs")
let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `📣 \`ᴄᴀʀᴀ ᴘᴇɴɢɢᴜɴᴀᴀɴ\`\n\>  .sғᴘ ᴍᴇɴᴜ`
    try {
    if (!m.quoted.text) throw `ᴍᴀɴᴀ ᴄᴏᴅᴇ`
    let path = `plugins/${text}.js`
    await fs.writeFileSync(path,m.quoted.text + `\n\n/**

° SCRIPT: yoruka kirihime
° ʏᴛ : @ᴋᴇɴᴢ_ᴍᴀᴅᴇ
° channel:https://whatsapp.com/channel/0029VaxuomuDp2QB3qI92T1t

"وَهَيْ، أَيُّهَا الْمُؤْمِنُونَ! تَذَكَّرُوا أَنَّ كُلَّ عَمَلٍ لَهُ قِيمَةٌ وَقِصَّةٌ وَرَاءَهُ. لَا تَحْذِفُوا هَذِهِ الْمَاءَةَ، فَإِنَّهَا لَيْسَتْ مَجَرَّدَ عَلاَمَةٍ، بَلْ رَمْزٌ لِلْجُهْدِ وَالإِبْدَاعِ الَّذِي وُضِعَ. احْتَرِمُوا أَعْمَالَ الْآخَرِينَ كَمَا تَحْتَرِمُونَ أَعْمَالَكُمْ، وَلْنَنْشُرِ الْخَيْرَ فِي كُلِّ خُطُواتِنَا. لِنَحْمِ مَعًا هَذِهِ الْأَعْمَالَ لِلْأَجْيَالِ الْمُقْبِلَةِ!"
"Wahay, saudaraku yang beriman! Ingatlah bahwa setiap karya memiliki nilai dan cerita di baliknya. Jangan sekali-kali kau menghapus watermark ini, karena ini bukan sekadar tanda, tetapi simbol dari usaha dan kreativitas yang telah dituangkan. Hargailah karya orang lain seperti kau menghargai karyamu sendiri, dan sebarkanlah kebaikan dalam setiap langkahmu. Mari bersama kita jaga dan lestarikan karya seni ini untuk generasi mendatang!"
**/`);
  await conn.reply(m.chat, `*tersimpan di ${path}*`, m)
  } catch (error) {
    console.log(error)
    m.reply("reply code fitur nya kak")
  }
}

handler.help = ['sfp'].map(v => v + ' <path>')
handler.tags = ['owner']
handler.command = ['sfp']

handler.rowner = true;
module.exports = handler