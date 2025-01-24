const ws = require('ws');

async function handler(m, { usedPrefix }) {
  let users = [...new Set([...global.conns.filter(conn => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map(conn => conn.user)])];
  let pengguna = users.map((v, i) => `NO: _*${i + 1}.*_\nNAME: *${v.name}*\nLINK: wa.me/${v.jid.replace(/[^0-9]/g, '')}?text=${usedPrefix}menu`).join('\n');
  
  m.reply(`*[ DAFTAR JADIBOT ]*\n> total jadibot saat ini adalah  ${users.length} user\n\n\n•INFO NOMOR\n\n${pengguna}`);
}

handler.help = ['listjadibot'];
handler.tags = ['jadibot'];
handler.command = ['listjadibot'];
handler.premium = true;

module.exports = handler;