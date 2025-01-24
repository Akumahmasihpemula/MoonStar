const axios = require("axios");
const cheerio = require("cheerio");

async function animeindo(query) {
    try {
        let { data } = await axios.get(`https://anime-indo.lol/search/${query}/`);
        const $ = cheerio.load(data);
        let results = [];
        $('div.menu .otable').each((index, element) => {
            const title = $(element).find('.videsc a').text().trim();
            const link = "https://anime-indo.lol" + $(element).find('.videsc a').attr('href');
            const image = "https://anime-indo.lol" + $(element).find('.vithumb img').attr('src');
            const description = $(element).find('.des').text().trim();
            results.push({
                title,
                link,
                image,
                description
            });
        });
        return { status: "aktif", creator: "nameown", results };
    } catch (e) {
        return { status: "offline", creator: "nameown", message: e.message };
    }
}

async function animeindoep(query) {
    try {
        let { data } = await axios.get(query);
        const $ = cheerio.load(data);
        let results = [];
        const title = $('.ngirix .title').first().text().trim();
        const detail = $('.ngirix .detail');
        const image = "https://anime-indo.lol" + detail.find('img').attr('src');
        const description = detail.find('p').text().trim();
        const genres = detail.find('li a').map((i, el) => $(el).text()).get();
        let episodes = [];
        $('.ngirix .ep a').each((index, element) => {
            const episodeTitle = $(element).text().trim();
            const episodeLink = "https://anime-indo.lol" + $(element).attr('href');
            episodes.push({ episodeTitle, episodeLink });
        });
        results.push({
            title,
            image,
            description,
            genres,
            episodes
        });
        return { status: "aktif", creator: "Kenz", data: results };
    } catch (e) {
        return { status: "offline", creator: "Kenz", message: e.message };
    }
}

async function animeindodl(query) {
    try {
        let { data } = await axios.get(query);
        const $ = cheerio.load(data);
        let results = [];
        const title = $('.ngiri .title').first().text().trim();
        const iframeSrc = $('.nonton iframe#tontonin').attr('src');
        let servers = [];
        $('.servers .server').each((index, element) => {
            const serverName = $(element).text().trim();
            const videoLink = $(element).attr('data-video');
            servers.push({ serverName, videoLink });
        });
        results.push({
            title,
            iframeSrc,
            servers
        });
        return { status: "aktif", creator: "nameown", data: results };
    } catch (e) {
        return { status: "offline", creator: "nameown", message: e.message };
    }
}

module.exports = { 
    animeindo, 
    animeindoep, 
    animeindodl 
};