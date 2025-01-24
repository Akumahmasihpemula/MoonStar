let handler = m => m;

handler.before = async function (m, { isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return true;

  let chat = global.db.data.chats[m.chat];
  let sender = global.db.data.users[m.sender]; 
  let isVideo = m.mtype === 'videoMessage'; 
  let hapus = m.key.participant;
  let bang = m.key.id;
  if (chat.video && isVideo) {
    if (!isAdmin && isBotAdmin) {
      m.reply(`*[Anti Video]*\n\n> Video terdeteksi. Maaf kak ${await conn.getName(m.sender)}, video yang kamu kirim akan saya hapus karena admin mengaktifkan anti video di grup ini.`);
      return this.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: hapus } });
    }
  }
  return true;
}

module.exports = handler;