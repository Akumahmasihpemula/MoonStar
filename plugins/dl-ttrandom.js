const axios = require('axios');
const query = ["Makima", "Alya", "Mikasa Ackerman", "Asuna Yuuki", "Rias Gremory", "Hestia", "Sabertooth", "Maka Albarn", "Yuno Gasai", "Hinata Hyuga", "Rukia Kuchiki", "Tohru Honda", "Kagome Higurashi", "Yui Hirasawa", "Mikoto Misaka", "Akemi Homura", "Chitanda Eru", "Shiro", "Kurisu Makise", "Ririka Katou", "Erina Nakiri", "Hana Isuzu", "Kuroyukihime", "Saber", "Rin Tohsaka", "Illyasviel von Einzbern", "Mai Sakurajima", "Chitose Karasuma", "Kaguya Shinomiya", "Chika Fujiwara", "Mio Akiyama", "Kotori Minami", "Mako Akamatsu", "Nagisa Shiota", "Kaori Miyazono", "Yui Kotegawa", "Erio Mondial", "Haruno Sakura", "Tsunade", "Hakuno Kishinami", "Miyuki Shiba", "Touka Kirishima", "Akane Tsunemori"];
let handler = async (m, {
conn,
args,
text,
usedPrefix,
command
}) => {
m.reply(wait);
tiktoks(`${query[Math.floor(Math.random() * query.length)]}`).then(a => {
let cap = a.title;
conn.sendMessage(m.chat, { video: { url: a.no_watermark }, caption: cap }, { quoted: m });
}).catch(err => {
m.reply(error);
});
};
handler.help = ['tiktokrandom'];
handler.tags = ['dl'];
handler.command = /^(tiktokrandom|ttrandom)$/i;
handler.limit = 4;
handler.register = true;
async function tiktoks(query) {
return new Promise(async (resolve, reject) => {
try {
const response = await axios({
method: 'POST',
url: 'https://tikwm.com/api/feed/search',
headers: {
'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
'Cookie': 'current_language=en',
'User -Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
},
data: {
keywords: query,
count: 10,
cursor: 0,
HD: 1
}
});
const videos = response.data.data.videos;
if (videos.length === 0) {
reject("Tidak ada video ditemukan.");
} else {
const gywee = Math.floor(Math.random() * videos.length);
const videorndm = videos[gywee];
const result = {
title: videorndm.title,
cover: videorndm.cover,
origin_cover: videorndm.origin_cover,
no_watermark: videorndm.play,
watermark: videorndm.wmplay,
music: videorndm.music
};
resolve(result);
}
} catch (error) {
reject(error);
}
});
}
module.exports = handler;
