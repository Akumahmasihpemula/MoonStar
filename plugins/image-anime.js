const fetch = require("node-fetch");

async function getRandomWaifu() {
    try {
        let response = await fetch('https://api.waifu.pics/sfw/waifu');
        let data = await response.json();
        return data.url;
    } catch (e) {
        console.error(e.message);
        return null;
    }
}

async function getRandomshinobu() {
    try {
        let response = await fetch('https://api.waifu.pics/sfw/shinobu');
        let data = await response.json();
        return data.url;
    } catch (e) {
        console.error(e.message);
        return null;
    }
}

async function getRandombully() {
    try {
        let response = await fetch('https://api.waifu.pics/sfw/bully');
        let data = await response.json();
        return data.url;
    } catch (e) {
        console.error(e.message);
        return null;
    }
}

async function getRandomcuddle() {
    try {
        let response = await fetch('https://api.waifu.pics/sfw/cuddle');
        let data = await response.json();
        return data.url;
    } catch (e) {
        console.error(e.message);
        return null;
    }
}

async function getRandomNeko() {
    try {
        let response = await fetch('https://api.waifu.pics/sfw/neko');
        let data = await response.json();
        return data.url;
    } catch (e) {
        console.error(e.message);
        return null;
    }
}

async function getRandomMegumin() {
    try {
        let response = await fetch('https://api.waifu.pics/sfw/megumin');
        let data = await response.json();
        return data.url;
    } catch (e) {
        console.error(e.message);
        return null;
    }
}

let handler = async (m, { conn, command }) => {
    m.react("⌛");
    let imageUrl;

    // Memilih fungsi berdasarkan command yang diterima
    if (command === 'waifu') {
        imageUrl = await getRandomWaifu();
    } else if (command === 'neko') {
        imageUrl = await getRandomNeko();
    } else if (command === 'megumin') {
        imageUrl = await getRandomMegumin();
    } else if (command === 'shinobu') {
        imageUrl = await getRandomshinobu();
    } else if (command === 'bully') {
        imageUrl = await getRandombully();
    } else if (command === 'cuddle') {
        imageUrl = await getRandomcuddle();    
    }

    // Mengirimkan gambar jika berhasil diambil
    if (imageUrl) {
        conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: `Here is your random ${command}!` }, { quoted: m });
    } else {
        m.reply('Maaf, terjadi kesalahan saat mengambil gambar.');
    }
}

handler.help = ["waifu", "neko", "megumin", "shinobu", "bully", "cuddle"];
handler.tags = ['image'];
handler.command = /^(waifu|neko|megumin|shinobu|bully|cuddle)$/i;
handler.limit = 3;

module.exports = handler;