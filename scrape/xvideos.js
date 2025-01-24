const axios = require("axios");
const cheerio = require("cheerio");

async function xvideosdl(url) {
try {
let { data } = await axios.get(url);
const $ = cheerio.load(data);
let Res = {}; // Menggunakan objek untuk menyimpan hasil
// Mengambil data dari script JSON-LD
$('script[type="application/ld+json"]').each((index, element) => {
const jsonData = JSON.parse($(element).html());
Res.title = jsonData.name || '';
Res.description = $('meta[name="description"]').attr("content").trim();
Res.upload = jsonData.uploadDate || '';
Res.url = jsonData.contentUrl || '';
Res.views = jsonData.interactionStatistic ? jsonData.interactionStatistic.userInteractionCount : 0;
const durationText = $('h2.page-title span.duration').text().trim();
Res.duration = durationText || '';
});
return Res;
} catch (e) {
return { error: e.message };
}
}

async function searchxvideos(req) {
try {
let response = await axios.get(`https://www.xvideos.com/?k=${req}&p=${Math.floor(3 * Math.random()) + 1}`);
const $ = cheerio.load(response.data);
let _Trm = [];
$('div.mozaique.cust-nb-cols > div.frame-block.thumb-block').each((index, element) => {
const title = $(element).find('p.title a').attr('title');
const link = "https://www.xvideos.com" + $(element).find('p.title a').attr('href');
const durasi = $(element).find('span.duration').first().text().trim();
const views = $(element).find('span.sprfluous').last().prev().text().trim().replace('Views:', ''); // Mengambil jumlah tampilan
_Trm.push({ title, link, durasi, views });
});
return { status: true, creator: 'Kenz', Data: _Trm };
} catch (e) {
return { status: false, creator: 'Kenz', message: e.message };
}
}
module.exports = { 
searchxvideos, 
xvideosdl
}