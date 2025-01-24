let handler = async (m, { conn, usedPrefix, command }) => {
	let msgs = db.data.msgs
	let msg = (Object.entries(msgs).map(([nama, isi]) => { return { nama, ...isi } })).map(v => v.nama)
    let anunya = Object.entries(msgs).map(([nama, isi]) => { return { nama, ...isi } })
    let list = anunya.map(v => `ˏˋ°•*⁀➷ ${v.nama}`).join('\n')
	if (msg[0]) return conn.reply(m.chat, `༶•┈┈⛧┈♛ [ DAFTAR LIST ] ♛┈⛧┈┈•༶

${list}
ˏ⸉ˋ‿̩͙‿̩̩̽‿̩͙‿̩̥̩‿̩̩̽‿̩͙‿̩͙‿̩̩̽‿̩͙‿̩͙‿̩̩̽‿̩͙‿̩̥̩‿̩̩̽‿̩͙‘⸊ˎ
`, m)
	else throw `[ DAFTAR STORE ]\n> tidak ada list yang di buat gunakan command (.addstore) untuk menambah daftar store kamu`
}
handler.help = ['storelist']
handler.tags = ['store']
handler.command = /^(storelist|liststore)$/i

module.exports = handler;