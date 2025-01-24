const { scrapeanime } = require("../scrape/anime.js");
let handler = async(m, { conn, text, usedPrefix, command }) => {
  m.reply(wait)
  scrapeanime('takina').then(a => {
    let cap = `乂 *TAKINA IM DONE?*`
  conn.sendMessage(m.chat, {image: {url: a}, caption: cap}, {quoted: m})
  
})
}
handler.help = ['takina']
handler.tags = ['image']
handler.command = /^(takina)$/i
handler.limit = 5
module.exports = handler;