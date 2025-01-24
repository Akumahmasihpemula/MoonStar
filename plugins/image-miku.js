const { scrapeanime } = require("../scrape/anime.js");
let handler = async(m, { conn, text, usedPrefix, command }) => {
  m.reply(wait)
  scrapeanime('miku nakano').then(a => {
  conn.sendMessage(m.chat, {image: {url: a}, caption: null}, {quoted: m})
  
})
}
handler.help = ['miku']
handler.tags = ['image']
handler.command = /^(miku)$/i
handler.limit = 5
module.exports = handler;