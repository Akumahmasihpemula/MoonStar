var handler = async (m, { conn, text, usedPrefix, command }) => {

if (!text) return conn.reply(m.chat, `🎌 *Tulis laporan Anda*\n\nContoh, perintah !${command} !infobot tidak berfungsi`, m )
if (text.length < 10) return conn.reply(m.chat, `🚩 laporan terlalu pendek`, m) 
if (text.length > 1000) return conn.reply(m.chat, `🚩 *Maksimal 1000 karakter untuk membuat laporan.*`, m)

let teks = `⚠️ * Laporkan* ⚠️\n\n⬡ *Nomor*\nWa.me/${m.sender.split`@`[0]}\n\n⬡ *Mensaje*\n${text}`
conn.reply(`${nomorown}@s.whatsapp.net`, m.quoted ? teks + m.quoted.text : teks, null, { contextInfo: { mentionedJid: [m.sender] }})

conn.reply(m.chat, `🚩 * Laporan sudah dikirim ke pembuat saya, nanti akan ditanggapi*`, m)

}
handler.help = ['report']
handler.tags = ['info']
handler.command = /^(report|request|reporte|bugs|bug|report-owner|reportes|reportar)$/i

handler.register = true

module.exports = handler;