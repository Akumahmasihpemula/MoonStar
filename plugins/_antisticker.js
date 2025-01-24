let handler = async m => {
if (m.isBaileys && m.fromMe) return true;
let chat = global.db.data.chats[m.chat];
let sender = global.db.data.users[m.sender];
let isSticker = m.mtype === 'stickerMessage';
let hapus = m.key.participant;
let bang = m.key.id;
if (chat.sticker && isSticker) {
if (sender.isAdmin || !m.isBotAdmin) {
return true;
} else {
await conn.sendMessage(m.chat, {
text: `*[ANTI STIKER]*\n\n> Terdeteksi member ${await conn.getName(m.sender)} telah mengirim sticker. Maaf, sticker kamu saya delete karena admin mengaktifkan anti sticker di grup ini.`
});
return conn.sendMessage(m.chat, {
delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: hapus }
});
}
}
return true;
};
module.exports = handler;