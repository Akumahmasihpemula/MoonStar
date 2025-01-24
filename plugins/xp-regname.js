const { createHash } = require('crypto');

let handler = async function (m, { text, usedPrefix, command }) {
    let user = global.db.data.users[m.sender];
    if (user.registered === true) throw `${m.name} sudah terdaftar. Mau daftar ulang?`;
    if (!text) throw `Penggunaan salah. Contoh:\n${usedPrefix}${command} namamu kak\n${usedPrefix}${command} makima`;
    
    let name = text.trim();
    if (!name || !/^[a-zA-Z0-9 ]+$/.test(name)) throw 'Nama tidak boleh kosong dan harus makima (hanya huruf dan angka)';
    
    m.react("🕐");
    user.name = name;
    user.regTime = +new Date();
    user.registered = true;
    
    let sn = createHash('md5').update(m.sender).digest('hex');
    await conn.sendMessage(m.chat, {
        video: {
            url: "https://github.com/XM4ZE/DATABASE/raw/master/wallpaper/Vid_20240614_012416.mp4?raw=true"
        },
        gifPlayback: true,
        gifAttribution: null,
        caption: `SUKSES MENDAFTAR\n\nNAMA: *_${name}_*\nSN: *${sn}*`,
        contextInfo: {
            mentionedJid: [m.sender]
        },
    }, { quoted: fkontak });
    
    m.react("✨");
}

handler.help = ['regname'].map(v => v + ' <nama ku kak>');
handler.command = /^reg(name|nama)$/i;

module.exports = handler;