const { searchSpotify } = require("../scrape/Spotify.js");

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return m.reply(`Cara penggunaan\n\n*Contoh :* ${usedPrefix + command} kenangan terindah`);
m.react("🕐");
try {
const data = await searchSpotify(text);
// Memeriksa apakah data.DaTa ada dan tidak kosong
if (!data.DaTa || data.DaTa.length === 0) {
return m.reply(`Pencarian "${text}" tidak ditemukan di Spotify. Gunakan judul lain.`);
}
const hasil = `*[ SPOTIFY SEARCH ]*\n\n${data.DaTa.map((a, index) => `NAME: ${a.name}\nARTIS: ${a.artists}\nPOPULARITY: ${a.popularity}\nLINK: ${a.link}\n`).join("\n⚊⚊⚊⚊⚊⚊⚊⚊⚊⚊⚊⚊⚊⚊\n")}`;

const cap = await conn.sendMessage(m.chat, {
image: { url: data.DaTa[0].image },
caption: hasil,
contextInfo: {
mentions: [m.sender],
forwardingScore: 1,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: idkom,
serverMessageId: null,
newsletterName: wm,
},
}
}, { quoted: m });
conn.reply(m.chat,"gunakan spotifydl untuk mendownload lagu", cap) 
} catch (e) {
console.error(e);
m.reply('Terjadi kesalahan: ' + e.message);
}
}

handler.help = ['spotify'];
handler.tags = ['search'];
handler.command = /^(spotify|spotifysearch)$/i;
handler.premium = true;

module.exports = handler;