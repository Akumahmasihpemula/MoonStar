const { scrapeanime } = require("../scrape/anime.js");

let handler = async (m, { conn, text, usedPrefix, command }) => {
  m.reply(wait);
  scrapeanime('alya').then(a => {
    conn.sendMessage(m.chat, { image: { url: a }, caption: null }, { quoted: m });
  }).catch(e => {
    m.reply(e.message);
  });
}

handler.help = ['alya'];
handler.tags = ['image'];
handler.command = /^(alya)$/i;
handler.limit = 5;

module.exports = handler;