const { scrapeanime } = require("../scrape/anime.js");

let handler = async (m, { conn, text, usedPrefix, command }) => {
  m.reply(wait);
  scrapeanime('rias gremory').then(a => {
    conn.sendMessage(m.chat, { image: { url: a }, caption: null }, { quoted: m });
  }).catch(e => {
    m.reply(e.message);
  });
}

handler.help = ['rias'];
handler.tags = ['image'];
handler.command = /^(rias)$/i;
handler.limit = 5;

module.exports = handler;


