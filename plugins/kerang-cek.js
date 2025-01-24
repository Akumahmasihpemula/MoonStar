let handler = async (m, { conn, usedPrefix, command, text }) => { 
let anu =`
────〔 *${command}* 〕────

${command.replace('cek', '').toUpperCase()} LEVEL *${Math.floor(Math.random() * 101)}*% 

Seberapapun *${command.replace('cek', '').toUpperCase()}* Mu
Tetap *SYUKURI* itu`
m.reply(anu)
}
handler.help = ['gay', 'pintar', 'cantik', 'ganteng', 'gabut', 'gila', 'lesbi', 'stress', 'bucin', 'jones', 'sadboy'].map(v => v + 'cek')
handler.tags = ['kerang']
handler.command = /^(gay|pintar|cantik|ganteng|gabut|gila|lesbi|stress?|bucin|jones|sadboy)cek/i
handler.group = true
handler.limit = 20

module.exports = handler