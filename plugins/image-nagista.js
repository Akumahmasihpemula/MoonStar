const { scrapeanime } = require("../scrape/anime.js");
let handler = async(m, { conn, text, usedPrefix, command }) => {
  m.reply(wait)
  scrapeanime('nagisa kubo').then(a => {
  conn.sendMessage(m.chat, {image: {url: a}, caption: null}, {quoted: m})
  
})
}
handler.help = ['nagisa']
handler.tags = ['image']
handler.command = /^(nagisa)$/i
handler.limit = 5
module.exports = handler;