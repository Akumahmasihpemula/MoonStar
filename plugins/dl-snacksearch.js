const cheerio = require("cheerio");
const axios =  require("axios");


let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return m.reply("masukkan judul");
try {
let api = await snacksearch(text);
if (!api.status) return m.reply(api.message);
for (let i = 0; i < Math.min(api.data.length, 15); i++) {
let { url_video, name, uploadDate, commentCount, url, duration } = api.data[i];
let cap = `\`SNACKVIDEO SEARCH\`

◯ NAME: ${name}
◯ UPLOAD: ${uploadDate}
◯ COMMENT: ${commentCount}
◯ URL: ${url}
D E S C R I P S I T I O N
${duration}`
conn.sendFile(m.chat, url_video, null,cap, m);
}
} catch (e) {
m.reply(e.message);
}
};
handler.help = ["snacksearch"]
handler.tags = ["dl"]
handler.command = /^(snacksearch|snacksr)$/i;
handler.limit = 10
module.exports = handler;
async function snacksearch(text) {
try {
const { data } = await axios.get("https://www.snackvideo.com/discover/" + text);
const $ = cheerio.load(data);
const itemListElement = $('script[type="application/ld+json"]#ItemList').html();
if (!itemListElement) {
throw new Error("Item list not found.");
}
const itemList = JSON.parse(itemListElement);
const results = itemList.itemListElement.map((item) => ({
position: item.position,
url: item.url,
name: item.name,
description: item.description,
thumbnailUrl: item.thumbnailUrl && item.thumbnailUrl.length > 0 ? item.thumbnailUrl[0] : null,
uploadDate: item.uploadDate,
url_video: item.contentUrl,
commentCount: item.commentCount,
duration: item.duration,
width: item.width,
height: item.height,
audio: item.audio,
creator: item.creator,
}));
const randomResults = getRandomItems(results, 15);
const nameown = "Kenz";
return { status: true, Creator: nameown, data: randomResults };
} catch (e) {
return { status: false, message: e.message };
}
}
// Fungsi untuk mengambil item acak dari array
function getRandomItems(arr, num) {
const shuffled = arr.sort(() => 0.5 - Math.random());
return shuffled.slice(0, num);
}

/**

° SCRIPT: yoruka kirihime
° ʏᴛ : @ᴋᴇɴᴢ_ᴍᴀᴅᴇ
° channel:https://whatsapp.com/channel/0029VaxuomuDp2QB3qI92T1t

"وَهَيْ، أَيُّهَا الْمُؤْمِنُونَ! تَذَكَّرُوا أَنَّ كُلَّ عَمَلٍ لَهُ قِيمَةٌ وَقِصَّةٌ وَرَاءَهُ. لَا تَحْذِفُوا هَذِهِ الْمَاءَةَ، فَإِنَّهَا لَيْسَتْ مَجَرَّدَ عَلاَمَةٍ، بَلْ رَمْزٌ لِلْجُهْدِ وَالإِبْدَاعِ الَّذِي وُضِعَ. احْتَرِمُوا أَعْمَالَ الْآخَرِينَ كَمَا تَحْتَرِمُونَ أَعْمَالَكُمْ، وَلْنَنْشُرِ الْخَيْرَ فِي كُلِّ خُطُواتِنَا. لِنَحْمِ مَعًا هَذِهِ الْأَعْمَالَ لِلْأَجْيَالِ الْمُقْبِلَةِ!"
"Wahay, saudaraku yang beriman! Ingatlah bahwa setiap karya memiliki nilai dan cerita di baliknya. Jangan sekali-kali kau menghapus watermark ini, karena ini bukan sekadar tanda, tetapi simbol dari usaha dan kreativitas yang telah dituangkan. Hargailah karya orang lain seperti kau menghargai karyamu sendiri, dan sebarkanlah kebaikan dalam setiap langkahmu. Mari bersama kita jaga dan lestarikan karya seni ini untuk generasi mendatang!"
**/