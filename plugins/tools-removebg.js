const uploadImage = require('../lib/uploadImage');
const { removeBg } = require("../scrape/removebg");
let handler = async (m, { conn, usedPrefix, command }) => {
try {
let q = m.quoted ? m.quoted : m;
let mime = (q.msg || q).mimetype || '';
if (!mime) throw 'Fotonya Mana?';
if (!/image\/(jpe?g|webs|png)/.test(mime)) throw `Tipe ${mime} tidak didukung!`;
m.reply(wait);
let img = await q.download();
let url = await uploadImage(img);
let out = await removebg(url);
await conn.sendFile(m.chat, out, 'out.png', done, m);
} catch (e) {
m.reply(e);
}
};
handler.help = ['removebg'];
handler.tags = ['tools'];
handler.command = /^(nobg|removebg)$/i;
handler.limit = true;
module.exports = handler;