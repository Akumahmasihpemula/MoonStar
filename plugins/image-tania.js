const { scrapeanime } = require("../scrape/anime.js");
let handler = async(m, { conn, text, usedPrefix, command }) => {
  m.reply(wait)
  scrapeanime('tania  beast tamer').then(a => {
  conn.sendMessage(m.chat, {image: {url: a}, caption: null}, {quoted: m})
  
})
}
handler.help = ['tania']
handler.tags = ['image']
handler.command = /^(tania)$/i
handler.limit = true
handler.register = true
handler.limit = 5
module.exports = handler;