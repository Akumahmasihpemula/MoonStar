let handler = m => m;
let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;
handler.before = async function (m, { user, isBotAdmin, isAdmin }) {
if ((m.isBaileys && m.fromMe) || m.fromMe || !m.isGroup) return true;
let chat = global.db.data.chats[m.chat];
let isGroupLink = linkRegex.exec(m.text);
if (chat.antiLink && isGroupLink) {
await m.reply(`*「 ANTI LINK 」*\n\n> terdeteksi ${await conn.getName(m.sender)}* telah mengirim link group lain maaf link tersebut akan di hapus di karna kan group ini di larang mengirim link gc lain ✅!`);
if (isAdmin) return m.reply('*「 ANTI LINK 」*\n\n>admin bebas mengirim url lain');
let linkGC = ('https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat));
let isLinkconnGc = new RegExp(linkGC, 'i');
let isgclink = isLinkconnGc.test(m.text);
if (isgclink) return m.reply('*「 ANTI LINK 」*\n\n> terimakasih kak *${await conn.getName(m.sender)}* sudah share link group ini 😋');
await conn.sendMessage(m.chat, { delete: m.key });
await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove");
}
return true;
}
module.exports = handler;


