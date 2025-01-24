let handler = async (m, { conn, text }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
    else who = m.chat
    if (!who) throw `*[INFO GUNA]*\n> di mohon tag pengguna!`
    if (global.owner.includes(who.split`@`[0])) throw 'gagal addowner Kerna dia masih owner'
    let waktu = text.split("|")[1]
    if (!waktu) throw `*[INFO GUNA]*\n> di mohon masukkan waktu! (Contoh: .addowner @user|20 hari)`
    let hari = waktu.split(" ")[0]
    let satuan = waktu.split(" ")[1]
    if (satuan !== "hari" && satuan !== "jam" && satuan !== "menit") throw `*[INFO GUNA]*\n> di mohon masukkan satuan waktu yang benar! (Contoh: hari, jam, menit)`
    let waktuMS = 0
    if (satuan === "hari") waktuMS = hari * 24 * 60 * 60 * 1000
    else if (satuan === "jam") waktuMS = hari * 60 * 60 * 1000
    else if (satuan === "menit") waktuMS = hari * 60 * 1000
    global.owner.push(`${who.split`@`[0]}`)
    conn.reply(m.chat, `*[UPDATE OWNER NEW]*

Name: ${conn.getName(who)}
Link: wa.me/${who.split`@`[0]}\n> sekarang kamu adalah owner sementara hanya ${hari} ${satuan}`, m, {
        contextInfo: {
            mentionedJid: [who]
        }
    })
    setTimeout(() => {
        global.owner.splice(global.owner.indexOf(`${who.split`@`[0]}`), 1)
        conn.reply(m.chat, `*[UPDATE OWNER]*

Name: ${conn.getName(who)}
Link: wa.me/${who.split`@`[0]}\n> waktu owner sementara kamu telah habis`, m, {
            contextInfo: {
                mentionedJid: [who]
            }
        })
    }, waktuMS)
}
handler.help = ['addowner [@user|waktu]']
handler.tags = ['owner']
handler.command = /^(addowner)$/i

handler.owner = true

module.exports = handler

/**

° SCRIPT: yoruka kirihime
° ʏᴛ : @ᴋᴇɴᴢ_ᴍᴀᴅᴇ
° channel:https://whatsapp.com/channel/0029VaxuomuDp2QB3qI92T1t

"وَهَيْ، أَيُّهَا الْمُؤْمِنُونَ! تَذَكَّرُوا أَنَّ كُلَّ عَمَلٍ لَهُ قِيمَةٌ وَقِصَّةٌ وَرَاءَهُ. لَا تَحْذِفُوا هَذِهِ الْمَاءَةَ، فَإِنَّهَا لَيْسَتْ مَجَرَّدَ عَلاَمَةٍ، بَلْ رَمْزٌ لِلْجُهْدِ وَالإِبْدَاعِ الَّذِي وُضِعَ. احْتَرِمُوا أَعْمَالَ الْآخَرِينَ كَمَا تَحْتَرِمُونَ أَعْمَالَكُمْ، وَلْنَنْشُرِ الْخَيْرَ فِي كُلِّ خُطُواتِنَا. لِنَحْمِ مَعًا هَذِهِ الْأَعْمَالَ لِلْأَجْيَالِ الْمُقْبِلَةِ!"
"Wahay, saudaraku yang beriman! Ingatlah bahwa setiap karya memiliki nilai dan cerita di baliknya. Jangan sekali-kali kau menghapus watermark ini, karena ini bukan sekadar tanda, tetapi simbol dari usaha dan kreativitas yang telah dituangkan. Hargailah karya orang lain seperti kau menghargai karyamu sendiri, dan sebarkanlah kebaikan dalam setiap langkahmu. Mari bersama kita jaga dan lestarikan karya seni ini untuk generasi mendatang!"
**/