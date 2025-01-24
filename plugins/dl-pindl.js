const { pindl } = require("../scrape/pindown.js");
let handler = async (m, { conn, args, usedPrefix, command, text }) => {
if (!text) throw `Linknya??, Example: ${usedPrefix + command} https://pin.it/61ex2tstx\n\n${botdate}`;
m.react("🕐");
try {
const api = await pindl(text);
conn.sendFile(m.chat, api.link, null, done, m);
} catch (error) {
m.reply(error.message || 'Terjadi kesalahan.');
}
}
handler.help = ['pindl'];
handler.command = /^(pindl)$/i;
handler.tags = ['dl'];
handler.limit = true;
module.exports = handler;