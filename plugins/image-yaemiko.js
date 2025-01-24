const { scrapeanime } = require("../scrape/anime.js");
let handler = async(m, { conn, text, usedPrefix, command }) => {
  m.reply(wait)
  scrapeanime('yae miko').then(a => {
  conn.sendMessage(m.chat, {image: {url: a}, caption: null}, {quoted: m})
  
})
}
handler.help = ['yaemiko']
handler.tags = ['image']
handler.command = /^(yaemiko)$/i
handler.limit = 5
module.exports = handler;