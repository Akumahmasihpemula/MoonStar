let handler = async (m, { text, usedPrefix, command }) => {
	if (!text) throw `[ DELETE STORE ]\n> gunakan ${usedPrefix + command} name store jika lupa gunakan (.liststore) `
	let msgs = global.db.data.msgs
	if (!(text in msgs)) throw `${text} TIDAK TERDAFTAR DI (.liststore) `
	delete msgs[text]
  throw `[ DELETE SUKSES ]\n> ${text} sukses di hapus dari daftar (liststore) `
}
handler.help = ["delstore"]
handler.tags = ["store"]
handler.command = ["delstore"]
handler.premium = true
module.exports = handler;