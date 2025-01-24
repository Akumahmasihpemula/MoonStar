const { scrapeanime } = require("../scrape/anime.js");
let handler = async(m, { conn, text, usedPrefix, command }) => {
  m.reply(wait)
  scrapeanime('nina beast tamer').then(a => {
  conn.sendMessage(m.chat, {image: {url: a}, caption: null}, {quoted: m})
  
})
}
handler.help = ['nina']
handler.tags = ['image']
handler.command = /^(nina)$/i
handler.limit = 5
module.exports = handler;