const axios = require('axios');
const cheerio = require('cheerio');

const NekoPoi = {
search: async function (query) {
try {
const { data } = await axios.get(`https://nekopoi.care/search/${query}`);
const $ = cheerio.load(data);
const respon = [];
$('#content > div.postsbody > div.result > ul > li').each(function(a, b) {
const title = $(b).find('> div > h2 > a').text();
const img = $(b).find('> div > div.limitnjg > img').attr('src');
const info = $(b).find('> div > div.desc').text();
const url = $(b).find('> div > h2 > a').attr('href');
respon.push({ title, img, url, info });
});
return { status: 300, Creator: nameown, result: respon };
} catch (e) {
return { Status: false, message: e.message };
}
},
list: async function () {
try {
const { data } = await axios.get(`https://nekopoi.care`);
const $ = cheerio.load(data);
const result = [];
$('#boxid > div').each(function(a, b) {
const title = $(b).find('> div.eroinfo > h2 > a').text();
const upload = $(b).find('> div.eroinfo > span:nth-child(2)').text();
const image = $(b).find('> div.eroimg > div > img').attr('src');
const link = $(b).find('> div.eroinfo > span:nth-child(3) > a').attr('href');
result.push({ title, upload, image, link });
});
return { Status: true, results:result };
} catch (e) {
return { Status: false, message: e.message };
}
}, 
down: async function (url) {
try {
const response = await axios.get(url);
const $ = cheerio.load(response.data);
const data = [];
const title = $('h1').text().trim();
const viewedRaw = $('p').first().text().trim();
const viewed = viewedRaw.split('/')[0].trim();
const uploadDate = viewedRaw.split('/')[1] ? viewedRaw.split('/')[1].trim() : '';
$('.boxdownload .liner').each((index, element) => {
const name = $(element).find('.name').text().trim();
const links = $(element).find('.listlink a').map((i, el) => $(el).attr('href')).get();
data.push({ name, links });
});
const down = {
status: 200,
creator: nameown,
judul: title,
views: `Dilihat ${viewed} kali`,
upload: uploadDate,
url_down: data
};

return down;
} catch (error) {
console.error("Error fetching data:", error);
return error.message;
}
}
};

module.exports = {
NekoPoi
}