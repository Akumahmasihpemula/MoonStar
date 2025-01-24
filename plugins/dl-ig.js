const { instagramdown } = require("../scrape/instagram.js");
let handler = async (m, { conn, text, command }) => {
if (!text) return m.reply(`PENGGUNAAN DOWN INSTAGRAM\n\n• Example: *.${command} https://www.instagram.com/p/C-zw9aBh2qg/?chaining=true`);
m.react("⌛");
try {
let Key = await instagramdown(text, 'video');
if (Key.status && Key.data.length > 0) {
for (let { Link_down } of Key.data) {
await conn.sendFile(m.chat, Link_down, '', '', m);
}
} else {
m.reply("gagal mendapatkan akses url");
}
} catch (e) {
m.reply(e.message);
}
};
handler.help = ["instagram"];
handler.tags = ["dl"];
handler.command = /^(ig(dl)?|instagram(dl)?)$/i;
handler.limit = 3;
module.exports = handler;