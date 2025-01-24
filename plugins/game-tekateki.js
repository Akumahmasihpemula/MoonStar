let fetch = require('node-fetch')
let timeout = 120000
let poin = 500

let handler = async (m, { conn, usedPrefix }) => {
    conn.tekateki = conn.tekateki ? conn.tekateki : {}
    let id = m.chat
    if (id in conn.tekateki) return conn.reply(m.chat, 'Belum dijawab!', conn.tekateki[id][0])
    
    // Mengambil data dari URL yang diberikan
    let res = await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tekateki.json');
    if (!res.ok) throw new Error('Error fetching data');
    
    let json = await res.json();
    if (!json.status) throw json;

    let caption = `
${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}tete untuk bantuan
Bonus: ${poin} XP
`.trim()
    
    conn.tekateki[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tekateki[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, m)
            delete conn.tekateki[id]
        }, timeout)
    ]
}
handler.help = ['tekateki']
handler.tags = ['game']
handler.command = /^tekateki/i

handler.game = true

module.exports = handler