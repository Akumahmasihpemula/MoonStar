const axios = require("axios");
const cheerio = require("cheerio");
const facebookDl = async (url) => {
try {
const { data } = await axios.post(
"https://getmyfb.com/process",
new URLSearchParams({
id: decodeURIComponent(url),
locale: "en",
}),
{
headers: {
"hx-current-url": "https://getmyfb.com/",
"hx-request": "true",
"hx-target": url.includes("share") ? "#private-v-downloader" : "#target",
"hx-trigger": "form",
"hx-post": "/process",
"hx-swap": "innerHTML",
},
}
);
const $ = cheerio.load(data);
const result = [];
const caption = $(".results-item-text").length > 0 ? $(".results-item-text").text().trim() : "TIDAK ADA DESCRIPSITION";
$(".results-list-item").each((index, el) => {
const quality = parseInt($(el).text().trim()) || "";
const type = $(el).text().includes("HD") ? "HD" : "SD";
const vUrl = $(el).find("a").attr("href") || "";
if (vUrl) {
// Pastikan URL tidak kosong
result.push({ type, quality, url: vUrl });
}
});
return { status: true, Creator: "Kenz", desc: caption, data: result };
} catch (e) {
return { status: false, message: e.message };
}
};
module.exports = { facebookDl };