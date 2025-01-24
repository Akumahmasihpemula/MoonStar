let handler = async (m, { conn, isROwner, text }) => {
  let { spawn } = require('child_process');
  if (!process.send) throw 'Dont: node main.js\nDo: node index.js'
  if (global.conn.user.jid == conn.user.jid) {
    await m.reply(`[*_R E S T A R T_*]\n> mohon di tunggu sedang menjalankan restart ${namebot} akan aktif kembali dalam 10 menit`)
    process.send('reset')
  } else throw '_GAGAL RESTART_'
}

handler.help = ['restart']
handler.tags = ['owner']
handler.command = /^(srvrestart|restart)$/i
handler.rowner = true
module.exports = handler