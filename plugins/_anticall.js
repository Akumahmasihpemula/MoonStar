let handler = m => m;

handler.before = async function (m, { callUpdates }) {  
  // Mengambil chat dari database
  let chat = db.data?.chats[m.key?.remoteJid || m.participant || m.chat] || {};
  
  // Jika tidak ada pengaturan anticall, keluar dari fungsi
  if (!chat.anticall) return;

  // Memproses setiap pembaruan panggilan
  for (const usr of callUpdates) {
    // Memeriksa apakah pengguna bukan grup dan statusnya adalah "offer"
    if (!usr.isGroup && usr.status === "offer") {
      const jenisPanggilan = usr.isVideo ? "panggilan video" : "panggilan suara";
      const pesan = `[ CALL TERDETEKSI ]

USER: *@${usr.from.split("@")[0]}*
LARANGAN: *_${jenisPanggilan}_*

Kamu telah melakukan ${jenisPanggilan} yang tidak diizinkan di sini.\n\nJika ini adalah kesalahan, silakan hubungi owner:\n• ${nomorown}`;

      // Mengirim pesan peringatan kepada pengguna
      await this.reply(usr.from, pesan, false, {
        mentions: [usr.from]
      });

      // Memblokir pengguna
      await this.updateBlockStatus(usr.from, "block");
    }
  }
  
  return true;
}

module.exports = handler;