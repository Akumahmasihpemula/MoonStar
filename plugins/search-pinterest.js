const fetch = require("node-fetch");

async function pinterest(query) {
    let res = await fetch(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${encodeURIComponent(query)}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${encodeURIComponent(query)}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`);
    
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    
    let json = await res.json();
    let data = json.resource_response.data.results;

    if (!data || !data.length) throw new Error(`Query "${query}" not found :/`);
    
    return data.map(item => item.images.orig.url);
}

let handler = async (m, { conn, args }) => {
    if (!args[0]) throw `Masukkan query\nContoh: .pin anime 3`;
    
    const count = parseInt(args[args.length - 1]);
    if (isNaN(count) || count <= 0) {
        throw `Masukkan jumlah gambar yang valid. Contoh: .pin anime 3`;
    }
    
    const query = args.slice(0, -1).join(' ');
    m.react("🔗");
    
    try {
        const hasil = await pinterest(query);
        if (hasil.length === 0) {
            return m.reply('Tidak ada gambar yang ditemukan.');
        }
        
        const imagesToSend = hasil.slice(0, count);
        for (const image of imagesToSend) {
            await conn.sendFile(m.chat, image, null, null, m);
        }
    } catch (e) {
        m.reply(`Terjadi kesalahan: ${e.message}`);
    }
};

handler.command = /^(pin|pinterest)$/i;
handler.help = ["pinterest *<query> <jumlah>*"];
handler.tags = ["search"];
handler.limit = true;

module.exports = handler;