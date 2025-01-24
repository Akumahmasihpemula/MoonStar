let handler = async (m, { conn, participants }) => {
    global.db.data.chats[m.chat].isBanned = true
    m.reply(`[ UNBANCHAT SUKSES ]\n> sukses unban di id ${m.chat ? m.chat:m.sender} dan ${namebot}  bisa merespon kembali`) 
}
handler.help = ['unbanchat']
handler.tags = ['owner']
handler.command = ['unbanchat']
handler.owner = true

module.exports = handler



