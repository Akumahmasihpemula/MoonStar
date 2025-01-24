const { twitterdown } = require("../scrape/twitterdown.js");
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw `❗ MASUKAN URL \n\nCONTOH\n${usedPrefix + command} https://x.com/Kearor/status/1819684731195195670`;
try {
m.react("🕘");
let apii = await twitterdown(text);
let { desc, HD, audio } = apii;
let cap = `✘ *DOWNLOAD TWITTER*\n\n${desc}\n`;
conn.sendFile(m.chat, HD, null, cap, m);
conn.sendFile(m.chat, audio, null, null, true);
m.react("✔");
} catch (e) {
m.reply(`eror : ${e}`);
}
};
handler.help = ['twitter'].map(v => v + ' <url>');
handler.tags = ['dl'];
handler.command = /^(twitter|twt|tw)$/i;
handler.limit = 10;
handler.register = true;
module.exports = handler;