let handler = async (m, { conn }) => {
    let listfitur = Object.values(global.plugins).filter(
        (v) => v.help && v.tags
    ).length;
    let yao = `
[ S c R I P T I N I D I J U A L ]

🌟 **Halo Kak!** 🌟
Script ini dijual dengan harga **65k** saja!
Tanpa perlu khawatir, fitur ini tidak menggunakan REST API key.
Kami memanfaatkan teknik scraping canggih. Script ini bernama **${namebot}** dengan tipe: cjs.

🔥 **Fitur Premium yang Menarik:**
1. **Otakudesu** - Streaming anime dengan mudah!
2. **XNXX** - Akses konten dewasa yang beragam!
3. **XVideo** - Video berkualitas tinggi hanya untukmu!
4. **Animeindo** - Semua anime favorit dalam satu tempat!
... dan masih banyak lagi fitur keren lainnya!

Kami memiliki **${listfitur}** fitur yang siap kamu gunakan.

💬 Jika kamu berminat untuk membeli, langsung chat owner kami di: wa.me/${nomorown}?text=halo+min+saya+mau+beli+script
Bergabunglah dengan grup info bot dan grup pribadi bot kami di: 
👉 https://chat.whatsapp.com/GuUZnMCE9wf3BSkw1nmFD1
`;
    m.reply(yao);
}

handler.help = ['script'];
handler.tags = ['info'];
handler.command = /^(sc|sourcecode|script)$/i;

module.exports = handler;