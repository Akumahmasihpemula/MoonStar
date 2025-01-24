let handler = async (m, { conn, command, usedPrefix, text }) => {
  global.db.data.users[m.sender].catatan = global.db.data.users[m.sender].catatan || [];
  let i = 0;

  if (global.db.data.users[m.sender].catatan.length == 0) return m.reply('Kamu belum mempunyai list!');
  
  let txt = '🗒️ List Produk 🗒️\n\n';
  
  for (let ct in global.db.data.users[m.sender].catatan) {
    i += 1;
    txt += '[' + i + ']. ' + global.db.data.users[m.sender].catatan[ct].title + '\n';
  }
  
  txt += `\nPenggunaan: ${usedPrefix}dellist 1`;
  
  if (text.length == 0) return m.reply(txt);
  
  let catatan = global.db.data.users[m.sender].catatan;
  let split = text.split('|');
  
  if (catatan.length == 0) return m.reply('Kamu belum memiliki List!');
  
  let n = Number(split[0]) - 1;
  
  if (catatan[n] == undefined) return m.reply('List tidak ditemukan!');
  
  let tmp = [];

  for (let ct in catatan) {
    if (ct != n) {
      tmp.push(catatan[ct]);
    }
  }

  global.db.data.users[m.sender].catatan = tmp;

  conn.reply(m.chat, `Berhasil menghapus list!!`, m, false, {
    contextInfo: {
      mentionedJid: conn.parseMention(text)
    }
  });
};

handler.help = ['delproduk title'];
handler.tags = ['store'];
handler.command = /^produkhapus|delproduk$/i;
handler.group = true;
handler.admin = true;

module.exports = handler;