const { xvideosdl, searchxvideos } = require("../scrape/xvideos.js");

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`Cara penggunaan\n\n*Contoh :* ${usedPrefix + command} janda montok`);
    
    m.react("🕐");
    
    try {
        conn.xvideos = conn.xvideos ? conn.xvideos : {};
        const video = await searchxvideos(text);
        
        if (!video.Data || video.Data.length === 0) {
            return m.reply("Tidak ada hasil yang ditemukan.");
        }

        const hasil = `*[ XVIDEOS SEARCH ]*\n${video.Data.map((a, index) => `*${index + 1}* ${a.title}`).join("\n\n")}`;
        const key = await conn.reply(m.chat, hasil, m);
        
        await conn.reply(
            m.chat,
            `Pilih *1 - ${video.Data.length}* untuk mendownload video`,
            key,
        );
        
        m.react("✨");
        conn.xvideos[m.sender] = video.Data; // Simpan data video yang ditemukan
    } catch (e) {
        console.error(e);
        m.reply(e.message);
    }
}

handler.before = async (m, { conn }) => {
    try {
        conn.xvideos = conn.xvideos ? conn.xvideos : {};
        if (!m.text) return;
        if (isNaN(m.text)) return;
        if (!conn.xvideos[m.sender]) return;

        const video = conn.xvideos[m.sender][m.text - 1];
        if (!video) return m.reply('Tidak ada video yang sesuai');

        const hasil = await xvideosdl(video.link);
        m.react("🕐");
        const vid = hasil.url;
        conn.sendFile(m.chat, vid, null, hasil.title, m);
        m.react("✅");
        delete conn.xvideos[m.sender];
    } catch (e) {
        console.error(e);
        m.reply(e.message);
    }
}

handler.help = ['xvideos'];
handler.tags = ['search'];
handler.command = /^(xvideos|xvideo)$/i;
handler.premium = true
module.exports = handler;