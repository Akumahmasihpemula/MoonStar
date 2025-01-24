const axios = require('axios');

async function scrapeanime(query) {
    try {
        let res = await axios.get(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${query}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${query}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`);
        let data = res.data.resource_response.data.results;

        if (!data.length) throw `Query "${query}" not found :/`;

        return data[~~(Math.random() * data.length)].images.orig.url;
    } catch (e) {
        throw e.message;
    }
}

module.exports = { scrapeanime }