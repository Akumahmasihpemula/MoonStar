const { animebatchsearch, animeBatchdl } = require("../scrape/animebatch.js");

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`Cara penggunaan\n\n*Contoh :* ${usedPrefix + command} maou`);
    m.react("🕐");
    try {
        conn.animebatch = conn.animebatch ? conn.animebatch : {};
        const video = await animebatchsearch(text);
        const hasil = `*[ Batch SEARCH ]*\n${video.result.map((a, index) => `*${index + 1}* ${a.judul}`).join("\n\n")}`;
        const key = await conn.reply(m.chat, hasil, m);
        await conn.reply(
            m.chat,
            `pilih *1 - ${video.result.length}* untuk mendownload video`,
            key,
        );
        m.react("✨");
        conn.animebatch[m.sender] = video.result;
    } catch (e) {
        m.reply(e.message);
    }
}

handler.before = async (m, { conn }) => {
    try {
        conn.animebatch = conn.animebatch ? conn.animebatch : {};
        if (!m.text) return;
        if (isNaN(m.text)) return;
        if (!conn.animebatch[m.sender]) return;
        const video = conn.animebatch[m.sender][m.text - 1];
        if (!video) return m.reply('Tidak ada video yang sesuai');
        const hasil = await animeBatchdl(video.url);
        const cap = `\`[ DOWNLOAD ANIMEBATCH ]\`

title: ${hasil.title}
Genre: ${hasil.Genre}
status: ${hasil.status}
total eps: ${hasil.episode}
score: ${hasil.score}
di tonton: ${hasil.lihat} lihat

\`L I N K :\`

${Object.entries(hasil.download).map(([episodeTitle, links]) => {
return `${episodeTitle}:\n` + links.map(link => `${link.quality}: ${link.link}`).join('\n');
}).join('\n\n')}`
        conn.sendFile(m.chat, hasil.img, null, cap, m);
        m.react("✅");
        delete conn.animebatch[m.sender];
    } catch (e) {
        console.error(e);
        m.reply(e.message);
    }
}

handler.help = ['animebatch'];
handler.tags = ['anime'];
handler.command = /^(animebatch|batch|batchdl)$/i;
handler.premium = true;

module.exports = handler;