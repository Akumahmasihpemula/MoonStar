const axios = require("axios");
const cheerio = require("cheerio");

async function ruangbokep(text) {
    try {
        const { data } = await axios.get(`https://ruangbokep.im/?s=${text}`);
        const $ = cheerio.load(data);
        const results = [];

        $('article').each((index, element) => {
            const title = $(element).find('.entry-header span').text();
            const image = $(element).find('.post-thumbnail img').attr('data-src');
            const views = $(element).find('.views').text().trim();
            const duration = $(element).find('.duration').text().trim();
            const link = $(element).find('a').attr('href');

            results.push({
                title,
                image,
                views,
                duration,
                link
            });
        });

        return { status: "aktif", Creator:nameown, data:results }
    } catch (e) {
        console.error(e.message);
        throw { status: "aktif", Creator:nameown, message:e.message }                                     
    }
}

async function ruangbokepdl(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        // Mengambil data yang diinginkan
        const title = $('h1.entry-title').attr('itemprop', 'name').text();
        const author = $('meta[itemprop="author"]').attr('content');
        const description = $('meta[itemprop="description"]').attr('content');
        const duration = $('meta[itemprop="duration"]').attr('content');
        const thumbnailUrl = $('meta[itemprop="thumbnailUrl"]').attr('content');
        const embedUrl = $('meta[itemprop="embedURL"]').attr('content');
        const uploadDate = $('meta[itemprop="uploadDate"]').attr('content');
        const downloadLink = $('#tracking-url').attr('href');

        const results = {
            title,
            author,
            description,
            duration,
            thumbnailUrl,
            embedUrl,
            uploadDate,
            downloadLink
        };

        return { status: "aktif", Creator: "nameown", data: results };
    } catch (e) {
        console.error(e.message);
        throw { status: "tidak aktif", Creator: "nameown", message: e.message };
    }
}

module.exports = { 
ruangbokep, 
ruangbokepdl
}