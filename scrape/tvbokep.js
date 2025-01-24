const axios = require('axios');
const cheerio = require('cheerio');

async function tvbokepsearch(text) {
    try {
        const { data } = await axios.get(`https://tv.bokepindo13.monster/?s=${text}`);
        const $ = cheerio.load(data);
        const results = [];
        const articles = $('article');
        articles.each((index, article) => {
            const title = $(article).find('header.entry-header span').text();
            const image = $(article).find('div.post-thumbnail-container img').attr('data-src');
            const duration = $(article).find('span.duration').text();
            const link = $(article).find('a').attr('href');
            results.push({
                title,
                image,
                duration,
                link
            });
        });

        return { status: "aktif", Creator: "nameown", data: results };
    } catch (e) {
        console.error(e.message);
        throw { status: "aktif", Creator: "nameown", message: e.message };
    }
}
// down nya
async function tvbokepdown(text) {
    try {
        const { data } = await axios.get(text);
        const $ = cheerio.load(data);

        const title = $('h1.entry-title').text();
        const linkDownload = $('a.button#tracking-url').attr('href');

        const results = {
            title: title,
            linkDownload: linkDownload
        };

        return { status: "aktif", Creator: "Kenz", data: results };
    } catch (e) {
        console.error(e.message);
        throw { status: "aktif", Creator: "Kenz", message: e.message };
    }
}

module.exports = { 
tvbokepsearch, 
tvbokepdown
}