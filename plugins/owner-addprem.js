const { MessageType } = require('@adiwajshing/baileys').default;

let handler = async (m, { conn, text, command, usedPrefix }) => {
  function no(number) {
    return number.replace(/\s/g, '').replace(/([@+-])/g, '');
  }

  if (!text) {
    return conn.reply(m.chat, `*『 G A G A L 』*\n\n• ${usedPrefix + command} @tag/nomor|days\n*Example:* ${usedPrefix + command} ${nomorbot}|60`, m);
  }

  var hl = text.split('|');
  if (!hl[1]) return conn.reply(m.chat, `*『 G A G A L 』*\n\n• ${usedPrefix + command} @tag/nomor|days\n*Example:* ${usedPrefix + command} {nomorbot}|60`, m);

  hl[0] = no(hl[0]) + "@s.whatsapp.net";
  hl[1] = parseInt(hl[1]);

  if (typeof db.data.users[hl[0]] === 'undefined') throw 'Pengguna Belum Masuk DataBase';

  var jumlahHari = 86400000 * hl[1];
  var now = Date.now();

  db.data.users[hl[0]].premium = true;

  if (now < db.data.users[hl[0]].premiumTime) {
    db.data.users[hl[0]].premiumTime += jumlahHari;
  } else {
    db.data.users[hl[0]].premiumTime = now + jumlahHari;
  }

  const name = await conn.getName(hl[0]);
  const link = `wa.me/${hl[0].split('@')[0]}`;
  const hitungMundur = new Date(db.data.users[hl[0]].premiumTime).toLocaleString();

  conn.reply(m.chat, `*[UPDATE PREMIUM]*\n\nNama : ${name}\nLink : ${link}\nSelama : *${hl[1]} hari*`, m, { contextInfo: { mentionedJid: [hl[0]] } });
  conn.reply(hl[0], `\`『 I N F O  P R E M I U M 』\`\n\n*NAMA:* ${name}\n*SELAMA:* *${hl[1]} hari*\n\n> Update premium sukses, terima kasih kak ${name} sudah berlangganan di ${namebot}. Hitung mundur expired: ${hitungMundur}`, m, { contextInfo: { mentionedJid: [hl[0]] } });
};

handler.help = ['addprem *@tag|days*'];
handler.tags = ['owner'];
handler.command = /^(addprem|prem)$/i;
handler.owner = true;
handler.fail = null;

module.exports = handler;