const fetch = require('node-fetch');
let handler = async (m, { conn, command, args }) => {
if (!args[0]) return conn.reply(m.chat, `Masukkan URL untuk di ssweb/Screenshot\n\nCONTOH : .${command} <link url>`, m);
await m.react('🕓');
try {
let ss = await (await fetch(`https://image.thum.io/get/fullpage/${args[0]}`)).buffer();
if (ss) {
conn.sendFile(m.chat, ss, 'screenshot.png', null, m);
await m.react('✅');
} else {
let ss2 = await (await fetch(`https://api.screenshotmachine.com?key=377b07&url=${args[0]}&dimension=1024x768`)).buffer();
conn.sendFile(m.chat, ss2, 'screenshot.png', null, m);
}
} catch (error) {
console.error(error);
await m.react('✖️');
conn.reply(m.chat, 'Terjadi kesalahan saat mengambil screenshot.', m);
}
};
handler.help = ['ssweb'].map(v => v + ' *<url>*');
handler.tags = ['tools'];
handler.command = /^ss(web)?f?$/i;
handler.register = true;
handler.limit = 2;
module.exports = handler;