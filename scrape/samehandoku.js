const axios = require("axios");
const cheerio = require("cheerio");

// scrape SEARCH
async function samehandokusearch(text) {
try {
const url = `https://samehadaku.email/?s=${text}`;
const response = await axios.get(url);
const $ = cheerio.load(response.data);
let data = [];
$('.animpost').each((index, element) => {
const title = $(element).find('.title h2').text().trim();
const image = $(element).find('.content-thumb img').attr('src');
const link = $(element).find('a').attr('href');
const score = $(element).find('.score').text().trim();
const type = $(element).find('.type').text().trim();
const genres = $(element).find('.genres').text().trim();
data.push({ title, image, link, score, type, genres });
});
return { success: true, Creator: 'nameown', data };
} catch (err) {
console.error(err);
return { success: false, error: err.message };
}
}

// scrape download
async function samehandokudl(url) {
try {
const res = await axios.get(url);
const $ = cheerio.load(res.data);
const _result = [];
$('div.player-area.widget_senction').each((index, element) => {
const title = $(element).find('h1.entry-title').text().trim();
const desc = $(element).find('div.entry-content.entry-content-single').text().trim();
const Download = $('#downloadb li').map((i, liElement) => {
const resolution = $(liElement).find('strong').text().trim();
const links = $(liElement).find('span a').map((j, linkElement) => ({
name: $(linkElement).text().trim(),
url: $(linkElement).attr('href'),
})).get();
return { resolution, links };
}).get();
_result.push({ title, desc, Download });
});
return {
status: true,
data: _result
};
} catch (error) {
return {
status: false,
message: error.message
};
}
}

// scrape episode
async function samehandokuepisode(url) {
try {
let { data } = await axios.get(url);
const episode = [];
const $ = cheerio.load(data);
let Data = {};
$('div.anim-senct').each((index, element) => {
let title = $('meta[property="og:title"]').attr('content');
let Jepang = $(element).find('span:contains("Japanese")').text().replace('Japanese', '').trim();
let sinonim = $(element).find('span:contains("Synonyms")').text().replace('Synonyms', '').trim();
let bahasa = $(element).find('span:contains("English")').text().replace('English', '').trim();
let status = $(element).find('span:contains("Status")').text().replace('Status', '').trim();
let type = $(element).find('span:contains("Type")').text().replace('Type', '').trim();
let source = $(element).find('span:contains("Source")').text().replace('Source', '').trim();
let duration = $(element).find('div.desc').text().trim();
let totalepisode = $(element).find('span:contains("Total Episode")').text().replace('Total Episode', '').trim();
let season = $(element).find('span:contains("Season")').text().replace('Season', '').trim();
let studio = $(element).find('span:contains("Studio")').text().replace('Studio', '').trim();
let produser = $(element).find('span:contains("Producers")').text().replace('Producers', '').trim();
let released = $(element).find('span:contains("Released:")').text().replace('Released:', '').trim();
let image = $('meta[property="og:image"]').attr('content');
Data = {
title,
Jepang,
sinonim,
bahasa,
status,
type,
source,
duration,
totalepisode,
season,
studio,
produser,
released,
image
};
});
$('div.lstepsiode ul li').each((epIndex, epElement) => {
let episodeNumber = $(epElement).find('.eps a').text().trim();
let episodeTitle = $(epElement).find('.lchx a').text().trim();
let episodeLink = $(epElement).find('.lchx a').attr('href');
let episodeDate = $(epElement).find('.date').text().trim();
episode.push({
number: episodeNumber,
title: episodeTitle,
link: episodeLink,
date: episodeDate
});
});
return {
status: true,
Data,
eps: episode,
};
} catch (e) {
return { error: e.message };
}
}

module.exports = {
samehandokusearch, 
samehandokudl, 
samehandokuepisode
}