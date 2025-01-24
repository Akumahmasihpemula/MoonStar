const { ruangbokep, ruangbokepdl} = require("../scrape/raungbkp.js") 
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`Cara penggunaan\n\n*Contoh :* ${usedPrefix + command} japanese`);
    m.react("⚡");
    try {
        conn.ruangbkp = conn.ruangbkp ? conn.ruangbkp : {};
        const video = await ruangbokep(text);
        const hasil = `*[ TVBOKEP SEARCH ]*\n${video.data.map((a, index) => `*${index + 1}* ${a.title}\n${a.duration} duration`).join("\n\n")}`;
        const key = await conn.reply(m.chat, hasil, m);
        await conn.reply(
            m.chat,
            `pilih 1 - ${video.data.length}* untuk mendownload video`,
            key,
        );
        m.react("✨");
        conn.ruangbkp[m.sender] = video.data;
    } catch (e) {
        m.reply(e.message);
    }
}

handler.before = async (m, { conn }) => {
    try {
        conn.ruangbkp = conn.ruangbkp ? conn.ruangbkp : {};
        if (!m.text) return;
        if (isNaN(m.text)) return;
        if (!conn.ruangbkp[m.sender]) return;
        const video = conn.ruangbkp[m.sender][m.text - 1];
        if (!video) return m.reply('Tidak ada video yang sesuai');
        const hasil = await ruangbokepdl(video.link);
      
        const cap = `DOWNLOAD RUANG BOKEP\n\n TITLE: ${hasil.data.title}\nUpLOAD: ${hasil.data.uploadDate}\nurl_down: ${hasil.data.downloadLink}\n> hanya menyediakan link down download sendiri yah biar enak 😁`;
        m.reply(cap);
        m.react("✅");
        delete conn.ruangbkp[m.sender];
    } catch (e) {
        console.error(e);
        m.reply(e.message);
    }
}

handler.help = ['ruangbkpsearch'];
handler.tags = ['nsfw'];
handler.command = /^(ruangbkpdl|ruangbkpsearch|ruangbkp)$/i;
handler.premium = true
module.exports = handler;
