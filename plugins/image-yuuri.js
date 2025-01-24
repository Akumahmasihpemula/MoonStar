const { scrapeanime } = require("../scrape/anime.js");
let handler = async(m, { conn, text, usedPrefix, command }) => {
  m.reply(wait)
  scrapeanime('yuuri').then(a => {
  conn.sendMessage(m.chat, {image: {url: a}, caption: null}, {quoted: m})
  
})
}
handler.help = ['yuuri']
handler.tags = ['image']
handler.command = /^(yuuri)$/i
handler.limit = 4
module.exports = handler;