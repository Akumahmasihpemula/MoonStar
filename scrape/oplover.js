const axios = require("axios");
const cheerio = require("cheerio");

async function oploverzdownload(url) {
try {
const { data } = await axios.get(url);
const $ = cheerio.load(data);
// Mengambil informasi dasar
const title = $("div.infolimit h2[itemprop='partOfSeries']").text().trim();
const alternateTitles = $("div.infolimit .alter").text().trim();
const rating = $("div.rating strong").text().replace("Rating", "").trim();
// Mengambil informasi tambahan
const infoContent = {};
$("div.info-content .spe span").each((i, element) => {
const key = $(element).find("b").text().replace(":", "").trim();
const value = $(element).text().replace($(element).find("b").text(), "").trim();
infoContent[key] = value;
});
// Mengambil link download
let _Res = [];
$("div.mctnx .soraddlx").each((i, element) => {
const format = $(element).find(".sorattlx h3").text().trim();
const resolutions = [];
$(element).find(".soraurlx").each((j, resElement) => {
const resolution = $(resElement).find("strong").text().trim();
const links = [];
$(resElement).find("a").each((k, linkElement) => {
const link = $(linkElement).attr("href");
const linkText = $(linkElement).text();
links.push({ link, linkText });
});
resolutions.push({ resolution, links });
});
_Res.push({ format, resolutions });
});
return {
status: "aktif",
creator: "Kenz",
title,
alternateTitles,
rating,
info: infoContent,
Download: _Res
};
} catch (e) {
return {
status: "offline",
creator: "Kenz",
message: String(e),
};
}
}
async function oploverzInfo(url) {
try {
const { data } = await axios.get(url);
const $ = cheerio.load(data);
// Mengambil informasi dasar anime
const title = $('h1.entry-title[itemprop="name"]').text().trim(); // Mengambil judul
const image = $('div.thumb img[itemprop="image"]').attr("src"); // Mengambil URL gambar
const rating = $('meta[itemprop="ratingValue"]').attr("content"); // Mengambil rating
const status = $('span:contains("Status:")').next().text().trim(); // Mengambil status
const studio = $('span:contains("Studio:")').next().text().trim(); // Mengambil studio
const released = $('span:contains("Released:")').next().text().trim(); // Mengambil tanggal rilis
const synopsis = $('div.entry-content[itemprop="description"]').text().trim(); // Mengambil sinopsis
const ListEps = [];
// Mengambil daftar episode
$("div.eplister ul li").each((i, el) => {
const episodeLink = $(el).find("a").attr("href"); // Mengambil link episode
const eptitle = $(el).find(".epl-title").text().trim(); // Mengambil judul episode
const Episode = $(el).find(".epl-num").text().trim(); // Mengambil nomor episode
const releaseDate = $(el).find(".epl-date").text().trim(); // Mengambil tanggal rilis episode
ListEps.push({ Episode, eptitle, releaseDate, episodeLink });
});
return {
status: "aktif",
creator: "Kenz",
title,
image,
rating,
status,
studio,
released,
synopsis,
ListEps
};
} catch (e) {
return {
status: "offline",
creator: "Kenz",
message: String(e),
};
}
}
async function oploverz(query) {
try {
const { data } = await axios.get(`https://oploverz.my/?s=${query}`);
const $ = cheerio.load(data);
const _data = [];
$('div.listupd article.bs').each((i, oplover) => {
const title = $(oplover).find("h2[itemprop='headline']").text().trim();
const image = $(oplover).find("img[itemprop='image']").attr("src");
const link = $(oplover).find("a[itemprop='url']").attr("href");
_data.push({ title, image, link });
});
return {
status: "aktif",
creator: "Kenz",
ResUlt: _data
};
} catch (e) {
return {
status: "offline",
creator: "Kenz",
message: String(e),
};
}
}


module.exports = {
oploverz, 
oploverzdownload, 
oploverzInfo
} 
