let fs = require('fs')
let handler = async (m, { conn, text }) => {
    m.reply('Tunggu Sebentar, Proses Getting File creds.json')
    let sesi = await fs.readFileSync(`./${sesi}/creds.json`)
    return await conn.sendMessage(m.chat, { document: sesi, mimetype: 'application/json', fileName: 'creds.json' }, { quoted: m })
}
handler.help = ['getsesi']
handler.tags = ['owner']
handler.command = /^(getsesi)$/i
handler.rowner = true
module.exports = handler

