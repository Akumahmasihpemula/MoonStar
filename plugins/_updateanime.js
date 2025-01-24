const moment = require('moment-timezone');
const schedule = require('node-schedule');
const timeZone = 'Asia/Jakarta';
const rilisjam = "00:00";
const axios = require('axios');
const cheerio = require('cheerio');
const groupChats = [
'120363329129056639@g.us'
];

const sentNotifications = new Set();

const autoupdateanime = async (conn) => {
const currentTime = moment().tz(timeZone).format('HH:mm');

for (const chatId of groupChats) {
const groupMetadata = await conn.groupMetadata(chatId);
const riliscek = moment(rilisjam, 'HH:mm').subtract(5, 'minutes').format('HH:mm');

if (currentTime === riliscek) {
await conn.sendMessage(chatId, { text: `[ NOTIFICATION UPDATE]\n\n> ᴜᴘᴅᴀᴛᴇ ɴᴇᴡ ᴀɴɪᴍᴇ ᴅɪ ʜᴀʀɪ ${global.day}\n> sᴇʟᴀᴍᴀᴛ ᴍᴇɴᴏɴᴛᴏɴ ᴋᴀʟᴏ ᴠɪᴅᴇᴏ ɢᴀᴋ ᴀᴅᴀ ᴅᴏᴡɴʟᴏᴀᴅ ᴍᴇʟᴀʟᴜɪ ʙᴏᴛ ᴅᴇɴɢᴀɴ ᴋɪʀɪᴍ ᴘᴇsᴀɴ sᴇᴘᴇʀᴛɪ (.otaku download | link)` });
}

if (currentTime === rilisjam) {
const response = await updateanime();
let no = 1;

if (response.data.length > 0) {
for (const item of response.data) {
const cekepsResponse = await cekeps(item.url, item.episode);
const dataeps = item.episode;

for (const cek of cekepsResponse.Data) {
const down = await Down(cek.url);
const downTitle = down.data.length > 4 ? down.data[5].title : "Tidak ditemukan";
const downUrl = down.data.length > 4 ? down.data[5].url : "Tidak ditemukan";
const videoInfo = await downurl(downUrl);
const uniqueIdentifier = `${item.title}-${item.episode}`;

if (!sentNotifications.has(uniqueIdentifier)) {
const cap = `\`[_REKOMENDASI ANIME UPDATE_]\`
ɴᴏ: ${no++}
ᴇᴘɪsᴏᴅᴇ: ${item.episode}
ᴛɪᴛʟᴇ: ${item.title}
ᴅᴀʏ: ${item.day}
ᴅᴀᴛᴇ: ${cek.date}
ᴜʀʟ: ${cek.url}`;

if (item.img) {
let hasilnya = await conn.sendFile(chatId, item.img, "image.jpg", cap);
const caphasil = `
■ᴛʏᴘᴇ: ${videoInfo.type}
■ᴛɪᴛʟᴇ: ${item.title}
■ᴇᴘs: ${item.episode}
■ᴡɪᴇᴡs: ${videoInfo.views}
■sɪᴢᴇ: ${videoInfo.size}
■ᴅᴀᴛᴇ: ${cek.date}`;
await conn.sendFile(chatId, videoInfo.url, "video_eror.mp4", caphasil, hasilnya);
} else {
await conn.sendMessage(chatId, cap);
}

sentNotifications.add(uniqueIdentifier);
}
}
}
} else {
await conn.sendMessage(chatId, "tidak ada data yang ditemukan");
}
}
}
};

schedule.scheduleJob('* * * * *', () => {
autoupdateanime(conn);
});

module.exports = {
autoupdateanime
};

async function updateanime() {
const currentDay = global.day;
try {
let { data } = await axios.get("https://otakudesu.cloud/");
const $ = cheerio.load(data);
const Data = [];
$(".venz > ul > li").each((i, e) => {
const title = $(e).find("h2.jdlflm").text();
const hari = $(e).find(".epztipe").text().trim();
const tanggal = $(e).find(".newnime").text().trim();
const link = $(e).find(".thumb > a").attr("href");
const image = $(e).find(".thumbz > img").attr("src");
const episodeText = $(e).find(".epz").text().trim();
const episodeMatch = episodeText.match(/\d+/);
const episode = episodeMatch ? episodeMatch[0] : "tidak ditemukan";
if (hari === currentDay) {
let Ress = {
title: title || "tidak ditemukan",
day: hari || "tidak ditemukan",
date: tanggal || "tidak ditemukan",
url: link || "tidak ditemukan",
img: image || "tidak ditemukan",
episode: episode || "tidak ditemukan",
};
Data.push(Ress);
}
});
return { status: true, creator: "Kenz", data: Data };
} catch (ee) {
return { status: false, message: ee.message };
}
}

async function cekeps(url, dataeps) { 
try {
const { data } = await axios.get(url);
const $ = cheerio.load(data);
const listeps = [];
$('.episodelist ul li').each((index, element) => {
const title = $(element).find('a').text().trim();
const episodeMatch = title.match(/Episode (\d+)/);
const episodeNumber = episodeMatch ? episodeMatch[1] : null;
const url = $(element).find('a').attr('href');
const date = $(element).find('.zeebr').text().trim();

if (episodeNumber === dataeps) { 
listeps.push({ title, date, url });
}
});
if (listeps.length === 0) {
return { status: "online", creator: "kenzz", message: "Episode tidak ditemukan", Data: [] };
}
return { status: "online", creator: "kenzz", Data: listeps };
} catch (e) {
return { status: "offline", creator: "kenzz", message: e.message };
}
}

async function Down(url) {
try {
const respon = await axios.get(url);
const $ = cheerio.load(respon.data);
const data = [];

$('.download ul').each((i, elem) => {
$(elem).find('li').each((j, item) => {
const quality = $(item).find('strong').text();
$(item).find('a').each((k, link) => {
const title = $(link).text();
const url = $(link).attr('href');
data.push({ quality, title, url });
});
});
});

return { data };

} catch (error) {
return { error: error.message };
}
}

async function downurl(url) {
try { 
const { data } = await axios.get(url);
const $ = cheerio.load(data); 

const type = $('.nk-iv-wg4-overview').find('li').eq(3).find('.lead-text').text().trim();
const size = $('.nk-iv-wg4-overview').find('li').eq(2).find('.lead-text').text().trim();
const views = $('.views-count').last().text().trim();
const url_down = $('video').attr('data-src-url');
const img = $('video').attr('poster');

const nel = {
type: type, 
views: views, 
size: size,
url: "https:" + url_down,
image: "https:" + img
}

return nel;
} catch (error) {
return error.message;
}
}