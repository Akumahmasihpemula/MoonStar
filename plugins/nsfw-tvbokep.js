const {tvbokepdown, tvbokepsearch} = require("../scrape/tvbokep.js") 
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`Cara penggunaan\n\n*Contoh :* ${usedPrefix + command} japanese`);
    m.react("⚡");
    try {
        conn.tvbkp = conn.tvbkp ? conn.tvbkp : {};
        const video = await tvbokepsearch(text);
        const hasil = `*[ TVBOKEP SEARCH ]*\n${video.data.map((a, index) => `*${index + 1}* ${a.title}\n${a.duration} duration`).join("\n\n")}`;
        const key = await conn.reply(m.chat, hasil, m);
        await conn.reply(
            m.chat,
            `pilih 1 - ${video.data.length}* untuk mendownload video`,
            key,
        );
        m.react("✨");
        conn.tvbkp[m.sender] = video.data;
    } catch (e) {
        m.reply(e.message);
    }
}

handler.before = async (m, { conn }) => {
    try {
        conn.tvbkp = conn.tvbkp ? conn.tvbkp : {};
        if (!m.text) return;
        if (isNaN(m.text)) return;
        if (!conn.tvbkp[m.sender]) return;
        const video = conn.tvbkp[m.sender][m.text - 1];
        if (!video) return m.reply('Tidak ada video yang sesuai');
        const hasil = await tvbokepdown(video.link);
      
        const cap = `DOWNLOAD TVBOKEPINDO\n\nTITLE: ${hasil.data.title}\nDl_URL: ${hasil.data.linkDownload}\n\n> untuk mendownload gunakan url di atas senpai✅`;
        m.reply(cap);
        m.react("✅");
        delete conn.tvbkp[m.sender];
    } catch (e) {
        console.error(e);
        m.reply(e.message);
    }
}

handler.help = ['tvbkpsearch'];
handler.tags = ['nsfw'];
handler.command = /^(tvbkpdl|tvbkpsearch|tvbkp)$/i;
handler.premium = true
module.exports = handler;