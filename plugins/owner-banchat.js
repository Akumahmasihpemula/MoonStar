let handler = async (m, { conn, participants }) => {
    global.db.data.chats[m.chat].isBanned = true
    m.reply(`[ BANCHAT SUKSES ]\n> sukses ban di id ${m.chat ? m.chat:m.sender} dan ${namebot} tidak akan merespon`) 
}
handler.help = ['banchat']
handler.tags = ['owner']
handler.command = ['banchat']
handler.owner = true

module.exports = handler