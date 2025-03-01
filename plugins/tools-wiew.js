const { downloadContentFromMessage } = require('@adiwajshing/baileys');
let handler = async (m, { conn }) => {
if (!m.quoted) return conn.reply(m.chat, `🚩 Responds to a ViewOnce image.`, m);
if (m.quoted.mtype !== 'viewOnceMessageV2') return conn.reply(m.chat, `🚩 Respond to a ViewOnce image.`, m);
let msg = m.quoted.message;
let type = Object.keys(msg)[0];
let media = await downloadContentFromMessage(msg[type], type === 'imageMessage' ? 'image' : 'video');
let buffer = Buffer.from([]);
for await (const chunk of media) {
buffer = Buffer.concat([buffer, chunk]);
}
if (/video/.test(type)) {
return conn.sendFile(m.chat, buffer, 'media.mp4', msg[type].caption || '', m);
} else if (/image/.test(type)) {
return conn.sendFile(m.chat, buffer, 'media.jpg', msg[type].caption || '', m);
}
};
handler.help = ['view [UNTUK AMBIL SEKALI LIHAT]'];
handler.tags = ['tools'];
handler.command = ['readviewonce', 'read', 'view', 'readvo'];
handler.limit = 10;
handler.register = true;
module.exports = handler;