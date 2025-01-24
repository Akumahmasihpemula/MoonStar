const { xnxxSearch, xnxxdl } = require("../scrape/xnxx.js");

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`Cara penggunaan\n\n*Contoh :* ${usedPrefix + command} japanese`);
  
  m.reply("Tunggu sebentar..."); // Mengganti `wait` dengan string yang sesuai
  try {
    conn.xnxx = conn.xnxx ? conn.xnxx : {};
    const video = await xnxxSearch(text);

    if (!video.result || video.result.length === 0) {
      return m.reply("Tidak ada hasil yang ditemukan.");
    }

    const hasil = `*_[ XNXX SEARCH ]_*\n\n${video.result.map((a, index) => `╭[ ${index + 1} ]\n╰╮ᴛɪᴛʟᴇ: ${a.title}\n  ╰「 ᴜʀʟ: ${a.link} 」`).join("\n═══════════════════\n")}`;
    
    const key = await conn.reply(m.chat, hasil, m);
    await conn.reply(m.chat, `Pilih 1 - ${video.result.length} untuk mendownload video`, key);
    
    m.react("✅");
    conn.xnxx[m.sender] = video.result;
  } catch (e) {
    console.error(e); // Mencetak kesalahan ke konsol untuk debugging
    m.reply("Terjadi kesalahan: " + e.message);
  }
}

handler.before = async (m, { conn }) => {
  try {
    conn.xnxx = conn.xnxx ? conn.xnxx : {};
    if (!m.text) return;
    if (isNaN(m.text)) return;
    if (!conn.xnxx[m.sender]) return;

    const video = conn.xnxx[m.sender][m.text - 1];
    if (!video) return m.reply('Tidak ada video yang sesuai.');

    const hasil = await xnxxdl(video.link);
    conn.sendFile(m.chat, hasil.url_dl, null, hasil.title, m);
    
    m.react("✅");
    delete conn.xnxx[m.sender];
  } catch (e) {
    console.error(e); // Mencetak kesalahan ke konsol untuk debugging
    m.reply("Terjadi kesalahan: " + e.message);
  }
}

handler.help = ['xnxxsearch'];
handler.tags = ['search'];
handler.command = /^(xnxxsearch|xnxx)$/i;
handler.premium = true;

module.exports = handler;