const axios = require("axios");
const cheerio = require("cheerio");

async function pindl(url) {
let form = new URLSearchParams();
form.append('url', url);
try {
const response = await axios.post('https://pinterestvideodownloader.com/', form, {
headers: {
'Content-Type': 'application/x-www-form-urlencoded',
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
}
});
const html = response.data;
const $ = cheerio.load(html);
const link = $('div.col-md-8.col-md-offset-2').find('a').eq(1).attr('href')
return { status: true, link };
} catch (error) {
console.error(error);
return { status: false, error: error.message };
}
}

module.exports = { pindl };