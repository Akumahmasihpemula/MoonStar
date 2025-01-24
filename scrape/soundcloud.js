const axios = require('axios');
const cheerio = require('cheerio');

async function soundcloudsearch(query) {
    const soundcloudBaseUrl = "https://m.soundcloud.com";
    try {
        const response = await axios.get(soundcloudBaseUrl + "/search/sounds?q=" + encodeURIComponent(query), {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36"
            }
        });
        if (response.status !== 200) {
            throw "❎ Error saat mendapatkan data dari SoundCloud.";
        }
        const responseText = response.data;
        const $ = cheerio.load(responseText);
        const results = [];
        
        // Mengambil data dari hasil pencarian
        $("div > ul > li > div").each(function (index, element) {
            const title = $(element).find("a").attr("aria-label")?.trim() || "Sin título";
            const url = soundcloudBaseUrl + $(element).find("a").attr("href")?.trim() || "";
            const thumb = $(element).find("a > div > div > div > picture > img").attr("src")?.trim() || "";
            const artist = $(element).find("a > div > div > div").eq(1).text().trim() || "Sin artista";
            const views = $(element).find("a > div > div > div > div > div").eq(0).text().trim() || "Sin vistas";
            const duration = $(element).find("a > div > div > div > div > div").eq(1).text().trim() || "Sin tiempo";
            const release = $(element).find("a > div > div > div > div > div").eq(2).text().trim() || "Sin lanzamiento";
            results.push({
                title,
                artist,
                views,
                release,
                duration,
                thumb,
                url
            });
        });
        return { data: results };
    } catch (error) {
        throw "❎ Terjadi kesalahan: " + error;
    }
}

async function soundcloudDl(url) {
    try {
        const response = await axios.get(`https://cloudmp3.cc/id/download?url=${encodeURIComponent(url)}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Referer': 'https://cloudmp3.cc/'
            }
        });
        
        const $ = cheerio.load(response.data);
        console.log(response.data); // Cek respons HTML
        
        const title = $("meta[property='og:title']").attr("content");
        const image = $("meta[property='og:image']").attr("content");
        const duration = $(".text-custom").eq(1).text();
        
        // Periksa apakah scriptContent ada
        const scriptContent = response.data.match(/scdler\.init\(".*?",\s*{.*?"info":\s*{.*?"audio":\s*"(.*?)"/);
        
        let url_down = scriptContent ? scriptContent[1] : null;
        
        if (url_down) {
            url_down = url_down.replace(/\\u0026/g, '&'); 
        } else {
            console.error("URL download tidak ditemukan");
            return { error: 'URL download tidak ditemukan' };
        }
        
        const audioResponse = await axios.head(url_down);
        if (audioResponse.status === 200) {
            return {
                title,
                image,
                duration,
                url_down
            };
        } else {
            console.error("URL download tidak valid atau terlarang");
            return { error: 'URL download tidak valid atau terlarang' };
        }
    } catch (e) {
        console.error(e);
        return { error: e.message };
    }
}

 
 module.exports = {
 soundcloudsearch, 
 soundcloudDl
 };