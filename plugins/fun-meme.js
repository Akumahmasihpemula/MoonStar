const fetch = require("node-fetch");

const handler = async (m, { conn, text, isOwner, command }) => {
    m.react("🕐");
    try {        
        let api = await pinterest(pickRandom(["meme indo", "meme anime", "meme sad", "meme sus", "meme wtf"]));
       
        if (Array.isArray(api) && api.length > 0) {
            // Mengambil gambar secara acak
            let randomIndex = Math.floor(Math.random() * api.length);
            let imageUrl = api[randomIndex];
            await conn.delay(2000);
            await conn.sendFile(m.chat, imageUrl, null, null, m);
        } else {
            m.reply("Tidak ada meme yang ditemukan.");
        }
    } catch (error) {
        console.error(error);
        m.reply("Terjadi kesalahan saat mengambil meme.");
    }
};

handler.help = ['meme <random>'];
handler.tags = ['fun'];
handler.command = /^(meme)$/i;
handler.limit = 5;

module.exports = handler;

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

async function pinterest(query) {
    let res = await fetch(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${encodeURIComponent(query)}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${encodeURIComponent(query)}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`);
    
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    
    let json = await res.json();
    let data = json.resource_response.data.results;

    if (!data || !data.length) throw new Error(`Query "${query}" not found :/`);
    
    return data.map(item => item.images.orig.url);
}