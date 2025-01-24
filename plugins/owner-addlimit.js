const { MessageType } = require('@adiwajshing/baileys');

let handler = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(m.chat, 'Masukkan jumlah limit yang ingin ditambahkan pada pengguna. Contoh: .addlimit @user 10', m);
  }
    
  conn.chatRead(m.chat);
  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });

  let mentionedJid = m.mentionedJid[0];
  if (!mentionedJid) {
    return conn.reply(m.chat, 'Tag pengguna yang ingin ditambahkan limitnya. Contoh: .addlimit @user 10', m);
  }

  let pointsToAdd = parseInt(text.split(' ')[1]);
  if (isNaN(pointsToAdd)) {
    return conn.reply(m.chat, 'Jumlah limit yang dimasukkan harus berupa angka. Contoh: .addlimit @user 10', m);
  }

  let users = global.db.data.users;
  if (!users[mentionedJid]) {
    users[mentionedJid] = {
      limit: 0,
      exp: 0,
      lastclaim: 0
    };
  }

  users[mentionedJid].limit += pointsToAdd;
  conn.reply(mentionedJid, `*[LIMIT DARI OWNER]*\n> Selamat kamu telah mendapatkan ${pointsToAdd} limit`, m); 
  conn.reply(m.chat, `SUKSES MENGIRIM LIMIT KEPADA @${mentionedJid.split('@')[0]} ✅`, m, {
    mentions: [mentionedJid]
  });
};

handler.help = ['addlimit @user <jumlah limit>'];
handler.tags = ['owner'];
handler.command = /^addlimit$/i;
handler.owner = true;

module.exports = handler;