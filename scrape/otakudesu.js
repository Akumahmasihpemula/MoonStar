const axios = require("axios");
const cheerio = require("cheerio");

async function otakudesusearch(text) {
    try {
        const url = "https://otakudesu.cloud/?s=" + text + "&post_type=anime";
        const { data } = await axios.get(url); // Menghapus headers
        const hasil = [];
        const $ = cheerio.load(data);
        
        // Mengambil data dari elemen <ul class="chivsrc">
        $('.chivsrc li').each((i, el) => {
            const title = $(el).find('h2 a').text().trim();
            const link = $(el).find('h2 a').attr('href');
            const status = $(el).find('.set').first().text().replace('Status :', '').trim();
            const rating = $(el).find('.set').last().text().replace('Rating :', '').trim();
            const imgSrc = $(el).find('img').attr('src');
            hasil.push({
                title,
                link,
                status,
                rating,
                imgSrc
            });
        });
        return { status: "online", creator: "kenzz", Data: hasil };
    } catch (e) {
        return { status: "offline", creator: "kenzz", message: e.message };
    }
}

async function otakudesuepisode(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const hasil = [];
        
        // Mengambil judul
        const judul = $('.subheading h2[itemprop="name"]').text();
        
        // Mengambil informasi lainnya
        const info = {};
        $('.infozingle p span').each((index, element) => {
            const key = $(element).find('b').text();
            const value = $(element).text().replace(key, '').trim();
            info[key] = value;
        });
        
        // Mengambil gambar
        const gambar = $('.fotoanime img').attr('src');
        
        // Mengambil episode
        const episodeList = [];
        $('.episodelist ul li').each((index, element) => {
            const episodeTitle = $(element).find('a').text();
            const episodeLink = $(element).find('a').attr('href');
            const episodeDate = $(element).find('.zeebr').text();
            episodeList.push({ title: episodeTitle, link: episodeLink, date: episodeDate });
        });
        
        hasil.push({ judul, info, gambar, episodeList });
        return { status: "online", creator: "kenzz", Data: hasil };
    } catch (e) {
        return { status: "offline", creator: "kenzz", message: e.message };
    }
}

async function otakudesudown(url) {
    try {
        const { data } = await axios.get(url);
        const hasil = [];
        const $ = cheerio.load(data);
        const title = $('.jdlrx h1').text().trim();
        const imageUrl = $('.imganime img').attr('src');
        const downloadLinks = [];
        
        $('.download2 .batchlink a').each((i, el) => {
            const linkText = $(el).text().trim();
            const linkHref = $(el).attr('href');
            downloadLinks.push({ text: linkText, href: linkHref });
        });
        
        hasil.push({
            title,
            imageUrl,
            downloadLinks
        });
        return { status: "online", creator: "kenzz", Data: hasil };
    } catch (e) {
        return { status: "offline", creator: "kenzz", message: e.message };
    }
}

module.exports = {
    otakudesusearch,
    otakudesuepisode,
    otakudesudown
};