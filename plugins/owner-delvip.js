const { MessageType } = require('@adiwajshing/baileys').default;

let handler = async (m, { conn, text, usedPrefix,command}) => {
  function no(number){
    return number.replace(/\s/g, '').replace(/([@+-])/g, '');
  }
  
  if (!text) {
    return conn.reply(m.chat, `*『 G A G A L 』*\n\n${usedPrefix + command} @tag/nomor\n\n*Example:* ${usedPrefix + command} 62857xxx`, m);
  }

  text = no(text) + "@s.whatsapp.net";
  global.db.data.users[text].vip = false;
  global.db.data.users[text].vipTime = 0;
  
  conn.reply(m.chat, ` kasian ${await conn.getName(text)} di delete dari user vip mungkin karna belum bayar`, m, { contextInfo: { mentionedJid: [text] } });
};

handler.help = ['delvip'];
handler.tags = ['owner'];
handler.command = /^(delvip)$/i;
handler.rowner = true;
handler.fail = null;

module.exports = handler;