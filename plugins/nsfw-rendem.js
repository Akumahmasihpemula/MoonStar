const fetch = require("node-fetch");
let handler = async (m, { conn, command }) => {
    m.react("⌛");
    let imageUrl;
    if (command === 'waifu18+') {
        imageUrl = await nsfwwaifu();
    } else if (command === 'neko18+') {
        imageUrl = await nsfwneko();
    } else if (command === 'trap') {
        imageUrl = await nsfwtrap();
     } else if (command === 'blowjob') {
 imageUrl = await nsfwblowjob();  
    }

    // Mengirimkan gambar jika berhasil diambil
    if (imageUrl) {
        conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: `NSFW: ${command}` }, { quoted: m });
    } else {
        m.reply('Maaf, terjadi kesalahan saat mengambil gambar.');
    }
}
handler.help = ["waifu18+", "neko18+", "trap", "blowjob"];
handler.tags = ['nsfw'];
handler.command = /^(waifu18+|neko18+|trap|blowjob)$/i;
handler.premium = true;
module.exports = handler;
async function nsfwwaifu() {
    try {
        let response = await fetch('https://api.waifu.pics/nsfw/waifu');
        let data = await response.json();
        return data.url;
    } catch (e) {
        console.error(e.message);
        return null;
    }
}

async function nsfwneko() {
    try {
        let response = await fetch('https://api.waifu.pics/nsfw/neko');
        let data = await response.json();
        return data.url;
    } catch (e) {
        console.error(e.message);
        return null;
    }
}

async function nsfwtrap() {
    try {
        let response = await fetch('https://api.waifu.pics/nsfw/trap');
        let data = await response.json();
        return data.url;
    } catch (e) {
        console.error(e.message);
        return null;
    }
}

async function nsfwblowjob() {
    try {
        let response = await fetch('https://api.waifu.pics/nsfw/blowjob');
        let data = await response.json();
        return data.url;
    } catch (e) {
        console.error(e.message);
        return null;
    }
}