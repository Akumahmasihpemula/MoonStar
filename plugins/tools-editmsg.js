let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) `[PESAN EDIT]\n> reply pesan bot yang mau di edit`
	let q = m.quoted ? m.quoted : m
	if (!q.fromMe) throw `[PESAN EDIT]\n> pesan yang di replay bukan pesan bot`
	await conn.sendMessage(m.chat, { text: text, edit: q })
}

handler.help = ['edit']
handler.tags = ['tools']
handler.command = /^(edit)$/i
handler.limit = 3
module.exports = handler


