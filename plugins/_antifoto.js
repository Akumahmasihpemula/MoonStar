let handler = m => m;

handler.before = async function (m, { isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return true;
  let chat = global.db.data.chats[m.chat];
  let sender = global.db.data.users[m.sender];
  let isFoto = m.mtype; 
  let hapus = m.key.participant; 
  let bang = m.key.id;

  // Memastikan bahwa chat memiliki antiFoto diaktifkan
  if (chat.antiFoto && isFoto === 'imageMessage') {
    if (isAdmin || !isBotAdmin) {
      return true;
    } else {
      // Mengirimkan pesan peringatan kepada pengirim
      await conn.sendMessage(m.chat, {
        text: `*[ANTI IMAGE]*\n\n> Terdeteksi member ${await conn.getName(m.sender)} telah mengirimkan gambar. Maaf, admin mengaktifkan anti foto, maka foto tersebut harus dihapus.`
      });

      // Menghapus pesan gambar yang dikirim
      await conn.sendMessage(m.chat, { delete: m.key });
      return false; // Menghentikan eksekusi lebih lanjut
    }
  }

  return true;
}

module.exports = handler;