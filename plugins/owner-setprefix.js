const handler = async (m, { text, usedPrefix, command }) => {
  try {
    let cap = `\`[ L I S T P R E F I X S I M P L E ]\``;
    cap += `\n\n`;
    cap += `\`1. (singleprefix)\`\n`;
    cap += `\`2. (noprefix)\`\n`;
    cap += `\`3. (multiprefix)\`\n`;
    cap += `\n> Example: ${usedPrefix + command} 2 (untuk no prefix)`;

    if (!text) return m.reply(cap);

    if (/^[123]$/.test(text)) {
      opts.noprefix = text === "2";
      opts.multiprefix = text === "3";
      opts.singleprefix = text === "1";
      const prefix = opts.noprefix ? "No prefix" : opts.multiprefix ? "Multi prefix" : "Single prefix";
      return m.reply(`[ SUKSES SET PREFIX ]\n> sukses mengganti prefix di ubah ke ${prefix}`);
    }

    return m.reply(`[ PENGGUNAAN SALAH ]\n> pilih salah satu 1~3 hanya angka`);
  } catch (error) {
    console.error("Error:", error);
    m.react(error); // Fixed typo from 'eror' to 'error'
  }
};

handler.help = ["setprefix [prefix]"];
handler.tags = ["owner"];
handler.command = /^(setprefix)$/i;
handler.rowner = true;

module.exports = handler;

/**

° SCRIPT: yoruka kirihime
° ʏᴛ : @ᴋᴇɴᴢ_ᴍᴀᴅᴇ
° channel:https://whatsapp.com/channel/0029VaxuomuDp2QB3qI92T1t

"وَهَيْ، أَيُّهَا الْمُؤْمِنُونَ! تَذَكَّرُوا أَنَّ كُلَّ عَمَلٍ لَهُ قِيمَةٌ وَقِصَّةٌ وَرَاءَهُ. لَا تَحْذِفُوا هَذِهِ الْمَاءَةَ، فَإِنَّهَا لَيْسَتْ مَجَرَّدَ عَلاَمَةٍ، بَلْ رَمْزٌ لِلْجُهْدِ وَالإِبْدَاعِ الَّذِي وُضِعَ. احْتَرِمُوا أَعْمَالَ الْآخَرِينَ كَمَا تَحْتَرِمُونَ أَعْمَالَكُمْ، وَلْنَنْشُرِ الْخَيْرَ فِي كُلِّ خُطُواتِنَا. لِنَحْمِ مَعًا هَذِهِ الْأَعْمَالَ لِلْأَجْيَالِ الْمُقْبِلَةِ!"
"Wahay, saudaraku yang beriman! Ingatlah bahwa setiap karya memiliki nilai dan cerita di baliknya. Jangan sekali-kali kau menghapus watermark ini, karena ini bukan sekadar tanda, tetapi simbol dari usaha dan kreativitas yang telah dituangkan. Hargailah karya orang lain seperti kau menghargai karyamu sendiri, dan sebarkanlah kebaikan dalam setiap langkahmu. Mari bersama kita jaga dan lestarikan karya seni ini untuk generasi mendatang!"
**/