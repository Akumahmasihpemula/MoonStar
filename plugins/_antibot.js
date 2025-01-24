let handler = m => m;
handler.before = async function (m, { conn, isAdmin, isBotAdmin }) {
if (!m.isGroup) return;
if (m.fromMe && m.isBaileys) return true;
let chat = global.db.data.chats[m.chat];
if (m.id.includes('BAE5')) return true;
if (chat.antiBot) {
m.reply(`*[ANTI BOT]*\n\n> terdeteksi bot kedua ${await conn.getName(m.sender)} maaf kamu akan dikeluarkan karena admin gc ini mengaktifkan anti bot`);
if (!isAdmin) return m.reply("gagal mengeluarkan karena saya bukan admin");
if (!isBotAdmin) {
await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove");
}
}
};
module.exports = handler;