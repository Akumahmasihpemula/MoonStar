const axios = require("axios");
const cheerio = require("cheerio");
async function simontoknonton(url) {
try {
let { data } = await axios.get(url);
const $ = cheerio.load(data);
const author = $('meta[itemprop="author"]').attr('content') || 'Tidak ada informasi penulis';
const title = $('meta[itemprop="name"]').attr('content') || 'Tidak ada judul';
const description = $('meta[itemprop="description"]').attr('content') || 'Tidak ada deskripsi';
const thumbnailUrl = $('meta[itemprop="thumbnailUrl"]').attr('content') || 'Tidak ada thumbnail';
const videoLink = $('iframe.iframe-placeholder').attr('src') || 'Tidak ada link video'; // Mengambil link video
const downloadLink = $('a[title="Download"]').attr('href') || 'Tidak ada link download'; // Mengambil link download
return {
status: true,
creator: nameown, // Ganti dengan nama creator yang sesuai
author,
title,
description,
thumbnailUrl,
videoLink,
downloadLink
};
} catch (e) {
return { status: false, creator:nameown, message: e.message };
}
}

async function simontok(query) {
try {
let keyy = await axios.get(`https://x1.simontokx.online/?id=${query}`);
const $ = cheerio.load(keyy.data);
let _Result = [];
$('div.thumb-inside').each((index, element) => {
const title = $(element).find('div.thumb a img').attr('title');
const image = $(element).find('img.lazy').attr('data-src');
const duration = $(element).siblings('span.duration').text();
const link = "https://x1.simontokx.online" + $(element).find('a').attr('href');
_Result.push({ title, image, duration, link });
});
return { status: true, creator: 'Kenz', Data: _Result };
} catch (e) {
return { status: false, creator: 'Kenz', massage: e.message };
}
}

module.exports = {
simontoknonton, 
simontok
}