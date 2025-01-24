const axios = require('axios');
const cheerio = require('cheerio');

const bstation = {
search: async function (text) {
try {
const response = await axios.get('https://www.bilibili.tv/id/search-result?q=' + encodeURIComponent(text));
const $ = cheerio.load(response.data);
const animelist = [];

$('.section__list--multi .section__list__item').each((index, element) => {
const title = $(element).find('.highlights').text().trim();
const link = "https:" + $(element).find('.bstar-video-card__cover-link').attr('href');
const desc = $(element).find('.bstar-video-card__desc').text().trim();
const image = $(element).find('.bstar-video-card__cover-img img').attr('src');

// Menghapus bagian yang tidak diinginkan dari link dan image
const cleanedImage = image ? image.split('@')[0] : '';
const cleanedLink = link ? link.split('?')[0] : '';

animelist.push({ title, link: cleanedLink, desc, image: cleanedImage });
});
return {status:true,Creator:nameown,result:animelist};
} catch (error) {
console.error('Error fetching data:', error);
}
}, 
down: async function (url) {
try {
const { data } = await axios.get(`https://videodownloader.so/download?v=${url}&lang=en`);
const $ = cheerio.load(data);

const downloads = [];

// Mengambil data dari tabel download
$(".download-type + .downloadsTable tbody tr").each((index, element) => {
const quality = $(element).find('td').eq(0).text().trim();
const format = $(element).find('td').eq(1).text().trim();
const size = $(element).find('td.size').text().trim();
const link = $(element).find('a').attr('href');

downloads.push({
quality,
format,
size,
url: link
});
});

const title = $(".info .title").text().trim();
const image = $(".info img").attr('src');

// Mengambil data pada indeks ke-5 dan ke-7
const selectedDownloads = [downloads[5], downloads[0]].filter(Boolean); // filter untuk menghindari undefined

// Menampilkan hasil
const deta = {
judul: title,
image: image,
down: selectedDownloads
};
return deta;
} catch (error) {
console.error('Error fetching data:', error);
throw error; 
}
}
}
module.exports = {
bstation
}