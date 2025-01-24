const fetch = require('node-fetch');
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw `MASUKAN LINK!!!\n*Contoh:* ${usedPrefix}${command} https://www.mediafire.com/file/l29y215zmjk3jrz/Nekopoi.apk/file`;
conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });
const result = await mediafire(text);
let cap = `*💌 Name:* ${result.nama}\n*📊 Size:* ${result.ukuran}\n*🗂️ Type:* ${result.type}`;
conn.sendMessage(m.chat, {
document: { url: result.url },
caption: cap,
fileName: result.nama,
mimetype: result.type
}, { quoted: m });
await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
};
handler.help = ['mediafire'];
handler.tags = ['dl'];
handler.command = /^(mediafire|mf)$/i;
handler.limit = 3;
module.exports = handler;
async function mediafire(text) {
try {
const api = await fetch(`https://api.agatz.xyz/api/mediafire?url=${encodeURIComponent(text)}`);
const ki = await api.json();
let data = ki.data;
if (!data || !Array.isArray(data) || data.length === 0) {
return {
nama: 'Tidak ditemukan',
type: 'Tidak ditemukan',
ukuran: 'Tidak ditemukan',
url: 'Tidak ditemukan'
};
}
// Mengakses elemen pertama dari array data
const file = data[0];
return {
nama: file.nama || 'Tidak ditemukan',
type: file.mime || 'Tidak ditemukan',
ukuran: file.size || 'Tidak ditemukan',
url: file.link || 'Tidak ditemukan'
};
} catch (error) {
console.error(`Error: ${error.message}`);
return `Error: ${error.message}`;
}
}