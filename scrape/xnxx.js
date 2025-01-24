const axios = require("axios");
const cheerio = require("cheerio");

async function xnxxSearch(t) {
const r = "https://www.xnxx.com";
try {
const response = await axios.get(`${r}/search/${t}/${Math.floor(3 * Math.random()) + 1}`);
const html = response.data;
const $ = cheerio.load(html);
let o = [],
a = [],
i = [],
s = [];
$("div.mozaique").each(function (index, element) {
$(element).find("div.thumb").each(function (index, element) {
a.push(r + $(element).find("a").attr("href").replace("/THUMBNUM/", "/"));
});
});
$("div.mozaique").each(function (index, element) {
$(element).find("div.thumb-under").each(function (index, element) {
i.push($(element).find("p.metadata").text());
$(element).find("a").each(function (index, element) {
o.push($(element).attr("title"));
});
});
});
for (let t = 0; t < o.length; t++) {
s.push({ title: o[t], info: i[t], link: a[t] });
}
return { status: true, result: s };
} catch (error) {
return { status: false, result: error.message };
}
}
async function xnxxdl(url) {
try {
const response = await axios.get(url);
const $ = cheerio.load(response.data);
const title = $("meta[property=\"og:title\"]").attr("content");
const duration = $("span.metadata").text().replace(/\n/gi, "").split("\t\t\t\t\t")[1].split(/-/)[0];
const quality = $("span.metadata").text().trim().split("- ")[1].replace(/\t\t\t\t\t/, "");
const thumb = $("meta[property=\"og:image\"]").attr("content");
const scriptContent = $("#video-player-bg > script:nth-child(6)").html();
const videoUrl = (scriptContent.match(/html5player\.setVideoUrlHigh\('([^']+)'\)/) || [])[1];
const fileSize = await getFileSize(videoUrl);
let readableSize = parseFileSize(fileSize);
return {
title: title,
duration: duration,
quality: quality,
thumb: thumb,
size: fileSize,
sizeB: readableSize,
url_dl: videoUrl
};
} catch (error) {
throw error;
}
}
function parseFileSize(size) {
return parseFloat(size) * (
/GB/i.test(size) ? 1000000 :
/MB/i.test(size) ? 1000 :
/KB/i.test(size) ? 1 :
/bytes?/i.test(size) ? 0.001 :
/B/i.test(size) ? 0.1 :
0
);
}
let formatFileSize = (size) => {
if (size < 1024) {
return size + " B";
} else if (size < 1048576) {
const kbSize = Math.round(size / 1024);
return kbSize + " KB";
} else if (size < 1073741824) {
const mbSize = (size / 1048576).toFixed(2);
return mbSize + " MB";
} else {
const gbSize = (size / 1073741824).toFixed(2);
return gbSize + " GB";
}
};
async function getFileSize(url) {
const response = await axios.head(url);
const contentLength = response.headers["content-length"];
if (contentLength) {
const sizeInBytes = parseInt(contentLength);
if (sizeInBytes < 1024) {
return sizeInBytes + " bytes";
} else if (sizeInBytes < 1048576) {
const kbSize = sizeInBytes / 1024;
return kbSize.toFixed(2) + " KB";
} else if (sizeInBytes < 1073741824) {
const mbSize = sizeInBytes / 1048576;
return mbSize.toFixed(2) + " MB";
} else {
const gbSize = sizeInBytes / 1073741824;
return gbSize.toFixed(2) + " GB";
}
} else {
return "0";
}
}


module.exports = { 
xnxxSearch, 
xnxxdl
 };