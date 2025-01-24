const { scrapeanime } = require("../scrape/anime.js");
let handler = async(m, { conn, text, usedPrefix, command }) => {
  m.reply(wait)
  scrapeanime('sora beast tamer').then(a => {
  conn.sendMessage(m.chat, {image: {url: a}, caption: null}, {quoted: m})
  
})
}
handler.help = ['sora']
handler.tags = ['image']
handler.command = /^(sora)$/i
handler.limit = 5
module.exports = handler;