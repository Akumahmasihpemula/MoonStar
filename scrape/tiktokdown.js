const axios = require("axios");
async function tiktok(query) {
try {
const encodedParams = new URLSearchParams();
encodedParams.set('url', query);
encodedParams.set('hd', '1');
const response = await axios({
method: 'POST',
url: 'https://tikwm.com/api/',
headers: {
'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
'Cookie': 'current_language=en',
'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
},
data: encodedParams
});
const videos = response.data.data;
const data = {
desc:videos.title || "caption tidak tersedia",
video: videos.hdplay || "video tidak tersedia",
audio:videos.music|| "audio tidak tersedia",
title:videos.music_info.title || "title tidak tersedia",
aktor:videos.author.nickname || "aktor tidak tersedia",
follow: videos.digg_count, 
coment: videos.comment_count, 
share: videos.share_count, 
didown:videos.download_count, 
disimpan: videos.collect_count
}
return data
} catch (error) {
return { status: false, creator:nameown, massage: error.message}
}
}

module.exports = { tiktok };