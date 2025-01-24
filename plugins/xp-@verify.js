const { createHash } = require('crypto');
let handler = async (m, { text, usedPrefix }) => {
let user = global.db.data.users[m.sender]
if(user.registered !== false) throw 'Kamu Sudah mendaftar!!\nIngin daftar ulang? ketik unreg'
    user.registered = true
    let sn = createHash('md5').update(m.sender).digest('hex')
    let p = `➩ sᴇʟᴀᴍᴀᴛ  ${m.name} ᴋᴀᴍᴜ sᴜᴅᴀʜ ᴛᴇʀᴅᴀғᴛᴀʀ\n➤ ɪɴɪ ᴀᴅᴀʟᴀʜ sᴇʀɪᴀʟ ᴋᴀᴍᴜ : ${sn}`
    const pp = await conn.profilePictureUrl(m.sender, 'image').catch((_) => "https://telegra.ph/file/1ecdb5a0aee62ef17d7fc.jpg");
    const arr = [
        { text: `*[ V ]*\n\n${p}`, timeout: 100 },
        { text:  `*[ V E ]*\n\n${p}`, timeout: 100 },
        { text:  `*[ V E R ]*\n\n${p}`, timeout: 100 },
        { text:  `*[ V E R I ]*\n\n${p}`, timeout: 100 },
        { text:  `*[ V E R I F ]*\n\n${p}`, timeout: 100 },
        { text:  `*[ V E R I F Y ]*\n\n${p}`, timeout: 100 },
        { text:  `*[ V E R I F Y   S ]*\n\n${p}`, timeout: 100 },
        { text:  `*[ V E R I F Y   S U ]*\n\n${p}`, timeout: 100 },
        { text:  `*[ V E R I F Y   S U C ]*\n\n${p}`, timeout: 100 },
        { text:  `*[ V E R I F Y   S U C C ]*\n\n${p}`, timeout: 100 },
        { text:  `*[ V E R I F Y   S U C C E ]*\n\n${p}`, timeout: 100 },
        { text:  `*[ V E R I F Y   S U C C E S ]*\n\n${p}`, timeout: 100 },
        { text:  `*[ V E R I F Y   S U C C E S S ]*\n\n${p}`, timeout: 100 },
    ];

    const lll = await conn.sendMessage(m.chat, {
      text: "proses registrasi",
      contextInfo: {
      externalAdReply: {
      title: namebot,
      body: '© 2023-2024',
      thumbnailUrl: pp,
      sourceUrl: sgc,
      mediaType: 1,
      renderLargerThumbnail: true
      }}}, {quoted: m})

    for (let i = 0; i < arr.length; i++) {
        await new Promise(resolve => setTimeout(resolve, arr[i].timeout));
        await conn.relayMessage(m.chat, {
            protocolMessage: {
                key: lll.key,
                type: 14,
                editedMessage: {
                    conversation: arr[i].text
                }
            }
        }, {});
    }
}
handler.help = ['@verify']
handler.tags = ['xp']
handler.command = /^(@verify)/i
handler.register = true

module.exports = handler;

/**

° SCRIPT: yoruka kirihime
° ʏᴛ : @ᴋᴇɴᴢ_ᴍᴀᴅᴇ
° channel:https://whatsapp.com/channel/0029VaxuomuDp2QB3qI92T1t

"وَهَيْ، أَيُّهَا الْمُؤْمِنُونَ! تَذَكَّرُوا أَنَّ كُلَّ عَمَلٍ لَهُ قِيمَةٌ وَقِصَّةٌ وَرَاءَهُ. لَا تَحْذِفُوا هَذِهِ الْمَاءَةَ، فَإِنَّهَا لَيْسَتْ مَجَرَّدَ عَلاَمَةٍ، بَلْ رَمْزٌ لِلْجُهْدِ وَالإِبْدَاعِ الَّذِي وُضِعَ. احْتَرِمُوا أَعْمَالَ الْآخَرِينَ كَمَا تَحْتَرِمُونَ أَعْمَالَكُمْ، وَلْنَنْشُرِ الْخَيْرَ فِي كُلِّ خُطُواتِنَا. لِنَحْمِ مَعًا هَذِهِ الْأَعْمَالَ لِلْأَجْيَالِ الْمُقْبِلَةِ!"
"Wahay, saudaraku yang beriman! Ingatlah bahwa setiap karya memiliki nilai dan cerita di baliknya. Jangan sekali-kali kau menghapus watermark ini, karena ini bukan sekadar tanda, tetapi simbol dari usaha dan kreativitas yang telah dituangkan. Hargailah karya orang lain seperti kau menghargai karyamu sendiri, dan sebarkanlah kebaikan dalam setiap langkahmu. Mari bersama kita jaga dan lestarikan karya seni ini untuk generasi mendatang!"
**/