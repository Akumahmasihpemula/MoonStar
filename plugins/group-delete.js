let handler = async (m, { conn, usedPrefix, command }) => {
	
if (!m.quoted) throw `[PENGGUNAAN]\n> reply pesan yang harus di delete ✅`
try {
let delet = m.message.extendedTextMessage.contextInfo.participant
let bang = m.message.extendedTextMessage.contextInfo.stanzaId
return conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
 } catch {
return conn.sendMessage(m.chat, { delete: m.quoted.vM.key })
}
}
handler.help = ['delete']
handler.tags = ['group']
handler.command = /^(del|delete)$/i
handler.owner = false
handler.admin = true
module.exports = handler;