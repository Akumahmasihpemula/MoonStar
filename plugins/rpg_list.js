let handler = async (m, { conn }) => {
    let guilds = Object.values(global.db.data.guilds);

    if (guilds.length === 0) {
        return conn.reply(m.chat, 'Belum ada guild yang terdaftar.', m);
    }

    let guildList = guilds.map((guild, idx) => `${idx + 1}. ${guild.name} ${guild.members.length} Member`).join('\n');

    conn.reply(m.chat, `亗 PUBLIC GUILD 亗\n${guildList}`, m);
};

handler.help = ['guildlist'];
handler.tags = ['rpg'];
handler.command = /^(guildlist)$/i;
module.exports = handler;

/**

° SCRIPT: yoruka kirihime
° ʏᴛ : @ᴋᴇɴᴢ_ᴍᴀᴅᴇ
° channel:https://whatsapp.com/channel/0029VaxuomuDp2QB3qI92T1t

"وَهَيْ، أَيُّهَا الْمُؤْمِنُونَ! تَذَكَّرُوا أَنَّ كُلَّ عَمَلٍ لَهُ قِيمَةٌ وَقِصَّةٌ وَرَاءَهُ. لَا تَحْذِفُوا هَذِهِ الْمَاءَةَ، فَإِنَّهَا لَيْسَتْ مَجَرَّدَ عَلاَمَةٍ، بَلْ رَمْزٌ لِلْجُهْدِ وَالإِبْدَاعِ الَّذِي وُضِعَ. احْتَرِمُوا أَعْمَالَ الْآخَرِينَ كَمَا تَحْتَرِمُونَ أَعْمَالَكُمْ، وَلْنَنْشُرِ الْخَيْرَ فِي كُلِّ خُطُواتِنَا. لِنَحْمِ مَعًا هَذِهِ الْأَعْمَالَ لِلْأَجْيَالِ الْمُقْبِلَةِ!"
"Wahay, saudaraku yang beriman! Ingatlah bahwa setiap karya memiliki nilai dan cerita di baliknya. Jangan sekali-kali kau menghapus watermark ini, karena ini bukan sekadar tanda, tetapi simbol dari usaha dan kreativitas yang telah dituangkan. Hargailah karya orang lain seperti kau menghargai karyamu sendiri, dan sebarkanlah kebaikan dalam setiap langkahmu. Mari bersama kita jaga dan lestarikan karya seni ini untuk generasi mendatang!"
**/