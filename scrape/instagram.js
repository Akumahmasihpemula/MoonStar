const axios = require("axios");
const cheerio = require("cheerio");
async function instagramdown(urls, type) {
const url = 'https://indownloader.app/request';
const data = new URLSearchParams();
data.append('link', urls);
data.append('downloader', type);
const headers = {
'User-Agent': 'MyApp/1.0'
};
try {
const response = await axios.post(url, data.toString(), { headers });
const html = response.data.html;
const $ = cheerio.load(html);
const result = [];
$('div.download-options').each((index, element) => {
const Link_down = $(element).find('a').attr('href');
result.push({ Link_down });
});
return { status: true, Creator: "Kenz", data: result }; // Pastikan 'nameown' didefinisikan
} catch (error) {
console.error("Error:", error.response ? error.response.data : error.message);
return { success: false, message: error.message };
}
}
module.exports = { instagramdown };