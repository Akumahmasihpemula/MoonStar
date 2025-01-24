const { scrapeanime } = require("../scrape/anime.js");
let handler = async(m, { conn, text, usedPrefix, command }) => {
  m.reply(wait)
  scrapeanime('kanade beast tamer').then(a => {
  conn.sendMessage(m.chat, {image: {url: a}, caption: null}, {quoted: m})
  
})
}
handler.help = ['kanade']
handler.tags = ['image']
handler.command = /^(kanade)$/i
handler.limit = 5
module.exports = handler;