async function handler(m) {
if (!m.quoted) throw 'reply pesan nya kak!';
let q = await m.getQuotedObj();
if (!q.quoted) throw 'pesan yang kamu reply tidak berisi reply';
await q.quoted.copyNForward(m.chat, true);
}
handler.help = ['q <reply pesan>'];
handler.tags = ['tools'];
handler.command = /^q$/i;
module.exports = handler;