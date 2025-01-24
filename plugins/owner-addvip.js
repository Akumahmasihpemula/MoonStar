const { MessageType } = require('@adiwajshing/baileys').default;

let handler = async (m, { conn, text, command, usedPrefix }) => {
  function no(number) {
    return number.replace(/\s/g, '').replace(/([@+-])/g, '');
  }

  if (!text) {
    return conn.reply(m.chat, `*『 G A G A L 』*\n\n• ${usedPrefix + command} @tag/nomor|days\n*Example:* ${usedPrefix + command} {nomorbot}|60`, m);
  }

  const hl = text.split('|');
  if (!hl[1]) {
    return conn.reply(m.chat, `*『 G A G A L 』*\n\n• ${usedPrefix + command} @tag/nomor|days\n*Example:* ${usedPrefix + command} {nomorbot}|60`, m);
  }

  hl[0] = no(hl[0]) + "@s.whatsapp.net";
  hl[1] = parseInt(hl[1]);

  if (typeof db.data.users[hl[0]] === 'undefined') {
    return conn.reply(m.chat, 'Pengguna Belum Masuk DataBase', m);
  }

  const jumlahHari = 86400000 * hl[1];
  const now = Date.now();

  db.data.users[hl[0]].vip = true;

  if (now < db.data.users[hl[0]].vipTime) {
    db.data.users[hl[0]].vipTime += jumlahHari;
  } else {
    db.data.users[hl[0]].vipTime = now + jumlahHari;
  }

  const name = await conn.getName(hl[0]);
  const link = `wa.me/${hl[0].split('@')[0]}`;
  const hitungMundur = new Date(db.data.users[hl[0]].vipTime).toLocaleString();

  conn.reply(m.chat, `**[UPDATE VIPP]**\n>Nama : ${name}\nLink : ${link}\nSelama : *${hl[1]} hari*`, m, { contextInfo: { mentionedJid: [hl[0]] } });
  conn.reply(hl[0], `Sukses update VIPP selama ${hl[1]} hari dan waktu expired ${hitungMundur}`, m, { contextInfo: { mentionedJid: [hl[0]] } });
};

handler.help = ['addvip *@tag|days*'];
handler.tags = ['owner'];
handler.command = /^(addvip|vipp)$/i;
handler.owner = true;
handler.fail = null;

module.exports = handler;