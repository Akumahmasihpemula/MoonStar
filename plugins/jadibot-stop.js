let handler = async (m, { conn }) => {
  if (global.conn.user.jid === conn.user.jid) {
    await conn.reply(m.chat, '_*[ MENGHAPUS JADIBOT ]*_\n> sedang memperoses pemberentian jadibot', m);
    return;
  }
  
  await conn.reply(m.chat, `_*[ SUKSES BERHENTI ]*_\n> sukses di berhentikan jadibot saat ini suskes berhenti ✅`, m);
  conn.ws.close();
};

handler.help = ['stopbot'];
handler.tags = ['jadibot'];
handler.command = ['stopjadibot', 'stopbot', 'stopbebot'];
handler.premium = true;

module.exports = handler;