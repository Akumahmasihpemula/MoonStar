const yts = require('yt-search')

let handler = async (m, { text, usedPrefix, command }) => {
if (!text) return m.reply(`[ CARA MENGHILANGKAN ]\n> Example: ${usedPrefix + command} kenangan`) 

try {
let yt = await (await yts(text)).all
if (yt.length == 0) return m.reply(` pencarian "${text}" tidak di temukan `) 

let teks = `*乂 \`YouTube Search\`*\n\n`
   yt.map((v, i) => {
     if (i < 15) {
       teks += `*` + (i + 1) + `*. ` + v.title + `\n`
       teks += `∘ *Durasi* : ` + v.timestamp + `\n`
       teks += `∘ *Penonton* : ` + v.views + `\n`
       teks += `∘ *Upload* : ` + v.ago + `\n`
       teks += `∘ *Url* : ` + v.url + `\n°°°°°°°°°°°°°°°°°°°°°°°°°°°°°\n`
     }
   }
 )
conn.sendFile(m.chat,yt[0].thumbnail,"image_eror.jpg", teks, m) 
    
} catch (e) {
console.log(e)
return conn.reply(m.chat, e.message, m)
}
}
handler.help = ['ytsearch']
handler.tags = ['search']
handler.command = ['yts', 'ytsearch']

module.exports = handler
