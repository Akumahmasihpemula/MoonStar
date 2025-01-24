let handler = async (m, { conn, args, command }) => {
	let group = m.chat
        await m.reply('Bot akan keluar dari group', m.chat) 
        await sleep(1000)
        await conn.groupLeave(group)
        }
handler.command = ['out', 'leavegc']
handler.tags = ['group']
handler.help = ["out"]
handler.owner = true
handler.group = true
module.exports = handler

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
