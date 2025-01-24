const cheerio = require("cheerio");
const axios = require("axios");

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`Cara penggunaan\n\n*Contoh :* ${usedPrefix + command} janda montok`);
    m.react("🕐");

    try {
        conn.pasarbkp = conn.pasarbkp ? conn.pasarbkp : {};
        const video = await pasarbkp(text);
        const hasil = `*[ PASAR BOKEP SEARCH ]*\n${video.data.map((a, index) => `*${index + 1}* ${a.title}`).join("\n\n")}`;
        const key = await conn.reply(m.chat, hasil, m);
        await conn.reply(
            m.chat,
            `pilih *1 - ${video.data.length}* untuk mendownload video`,
            key,
        );
        m.react("✨");
        conn.pasarbkp[m.sender] = video.data; // Simpan data video ke conn.pasarbkp
    } catch (e) {
        m.reply(e.message);
    }
};

handler.before = async (m, { conn }) => {
    try {
        conn.pasarbkp = conn.pasarbkp ? conn.pasarbkp : {};
        if (!m.text) return;
        if (isNaN(m.text)) return;
        if (!conn.pasarbkp[m.sender]) return;

        const video = conn.pasarbkp[m.sender][m.text - 1];
        if (!video) return m.reply('Tidak ada video yang sesuai');

        const hasil = await pasarbkpdown(video.link);
        if (hasil) {
            m.reply(`${hasil.title}\n${hasil.videoUrl}`);
            m.react("✅");
        } else {
            m.reply('Gagal mendownload video.');
        }
        delete conn.pasarbkp[m.sender];
    } catch (e) {
        console.error(e);
        m.reply(e.message);
    }
};

handler.help = ['pasarbkp'];
handler.tags = ['nsfw'];
handler.command = /^(pasarbkp|bsrbkp|bkppasar)$/i;
handler.premium = true
module.exports = handler;

async function pasarbkp(url) {
    try {
        const { data } = await axios.get(`https://pasarbokep.com/?s=${url}`);
        const $ = cheerio.load(data);
        
        const posts = [];
        $('#recent-posts-3 ul li a').each((index, element) => {
            const title = $(element).text();
            const link = $(element).attr('href');
            posts.push({ title, link });
        });

        return { data: posts };
    } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Gagal mengambil data dari Pasar Bokep."); // Mengembalikan error jika terjadi kesalahan
    }
}

async function pasarbkpdown(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        
        const title = $("a#tracking-url").attr("title");
        const videoUrl = $("a#tracking-url").attr("href");

        return {
            title,
            videoUrl
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return null; // Mengembalikan null jika terjadi error
    }
}