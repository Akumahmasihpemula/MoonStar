let {translate} = require('@vitalets/google-translate-api')

let handler = async (m, { args, usedPrefix, command }) => {
	let lang, text
	if (args.length >= 2) {
		lang = args[0], text = args.slice(1).join(' ')
	} else if (m.quoted && m.quoted.text) {
		lang = args[0], text = m.quoted.text
	} else throw `CARA TERJEMAH\n> *Example :* ${usedPrefix + command} id Hello how are you\n\nLIST BAHASA\n\n`
	let res = await translate(text, { to: lang, autoCorrect: true }).catch(_ => null)
	if (!res) throw `bahasa  "${lang}"  tidak tersedia`
	m.reply(`*[TRANSLATE BAHASA]*\n\n> ${res.text}`.trim())
}
handler.help = ['translate']
handler.tags = ['tools']
handler.command = /^(tr(anslate)?)$/i
handler.limit = 5
module.exports = handler