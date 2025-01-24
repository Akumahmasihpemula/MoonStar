const { xhentai } = require('../scrape/hentaivid.js');

let handler = async (m, { text, args, usedPrefix, command }) => {
    m.reply(`VIDEO SUKSES DI DAPAT KAN SEDANG DI KIRIM KE PRIVAT CHAT`);
    m.react('⏱️');
    let cr = await xhentai(text);
    let tan = cr[Math.floor(Math.random() * cr.length)];
    let vap = `
⭔ Title : ${tan.title}
⭔ Category : ${tan.category}
⭔ Mimetype : ${tan.type}
⭔ Views : ${tan.views_count}
⭔ Shares : ${tan.share_count}
⭔ Source : ${tan.link}
⭔ Media Url : ${tan.video_1}
`;
    conn.sendMessage(m.sender, { video: { url: tan.video_1 }, caption: vap }, { quoted: m });
};

handler.help = ['vidhentai'];
handler.command = /^(vidhentai|hentaivid)$/i;
handler.tags = ['nsfw'];
handler.premium = true;

module.exports = handler;