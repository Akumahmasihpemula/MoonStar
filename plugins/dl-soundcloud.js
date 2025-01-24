const { soundcloudsearch, soundcloudDl } = require("../scrape/soundcloud.js");

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`Cara penggunaan\n\n*Contoh :* ${usedPrefix + command} kenangan terindah`);
    m.react("🕐");
    try {
        conn.soundcloud = conn.soundcloud ? conn.soundcloud : {};
        const video = await soundcloudsearch(text);
        const hasil = `*[ SOUNDCLOUD SEARCH ]*\n${video.data.map((a, index) => `*${index + 1}* ${a.title}\n${a.views} views\n${a.duration} duration`).join("\n\n")}`;
        const key = await conn.reply(m.chat, hasil, m);
        await conn.reply(
            m.chat,
            `pilih *1 - ${video.data.length}* untuk mendownload audio`,
            key,
        );
        m.react("✨");
        conn.soundcloud[m.sender] = video.data;
    } catch (e) {
        m.reply(e.message);
    }
};

handler.before = async (m, { conn }) => {
    try {
        conn.soundcloud = conn.soundcloud ? conn.soundcloud : {};
        if (!m.text) return;
        if (isNaN(m.text)) return;
        if (!conn.soundcloud[m.sender]) return;
        const video = conn.soundcloud[m.sender][m.text - 1];
        if (!video) return m.reply('Tidak ada video yang sesuai');
        
        const hasil = await soundcloudDl(video.url); // Ganti video.link dengan video.url
        if (hasil.error) {
            return m.reply(hasil.error);
        }
        
        m.react("💥");
        await conn.sendFile(m.chat, hasil.url_down, "audio.mp3", null, m); 
        m.react("✅");
        delete conn.soundcloud[m.sender];
    } catch (e) {
        console.error(e);
        m.reply(e.message);
    }
};

handler.help = ['soundcloud'];
handler.tags = ['dl'];
handler.command = /^(soundcloud|sound)$/i;
handler.limit = 20
module.exports = handler;