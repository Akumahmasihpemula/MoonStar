const { MessageType } = require('@adiwajshing/baileys').default;

let handler = async (m, { conn, text, usedPrefix,command}) => {
  function no(number){
    return number.replace(/\s/g, '').replace(/([@+-])/g, '');
  }
  
  if (!text) {
    return conn.reply(m.chat, `*『 G A G A L 』*\n\n${usedPrefix + command} @tag/nomor\n\n*Example:* ${usedPrefix + command} 62857xxx`, m);
  }

  text = no(text) + "@s.whatsapp.net";
  global.db.data.users[text].premium = false;
  global.db.data.users[text].premiumTime = 0;
  
  conn.reply(m.chat, `[ DELETE USER PREMIUM]

NAMA: ${await conn.getName(text)}
LINK: wa.me/${text.split('@')[0]}
PREMS: false

sukses menghapus user dari pengguna premium `, m, { contextInfo: { mentionedJid: [text] } });
};

handler.help = ['delprem'];
handler.tags = ['owner'];
handler.command = /^(delprem)$/i;
handler.rowner = true;
handler.fail = null;

module.exports = handler;