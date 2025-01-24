const axios = require("axios") 
const handler = async (m, { conn, text, command }) => {
  const args = text.split(' ');
  const query = args.slice(0, -1).join(' ');
  const count = parseInt(args[args.length - 1]);

  if (!query || isNaN(count) || count <= 0 || count > 20) {
    return m.reply(`Input format salah. Contoh: ${command} cosplay alya 5\nJumlah video harus antara 1 dan 20.`);
  }

  await m.reply('Sedang mencari video...');  
  try {
    const videos = await tiktoks(query);
    const videosToSend = videos.slice(0, count);
    for (const video of videosToSend) {
      await conn.sendFile(m.chat, video.no_watermark,"eror.mp4",video.title, m);
    }
  } catch (error) {
    m.reply(error.message || "Terjadi kesalahan.");
  }
};

handler.help = ["tiktoksearch *<query> <jumlah>*"];
handler.tags = ["search"];
handler.command = /^(tiktoksearch|ttsearch|ttr)$/i;
handler.limit = 3;

module.exports = handler;
async function tiktoks(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://tikwm.com/api/feed/search',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Cookie': 'current_language=en',
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
        },
        data: {
          keywords: query,
          count: 50,
          cursor: 0,
          HD: 1
        }
      });
      const videos = response.data.data.videos;
      if (videos.length === 0) {
        reject(new Error("Tidak ada video ditemukan."));
      } else {
        // Mengambil video acak
        const randomVideos = [];
        for (let i = 0; i < videos.length; i++) {
          const chosenVideoData = videos[i];
          const result = {
            title: chosenVideoData.title,
            cover: chosenVideoData.cover,
            origin_cover: chosenVideoData.origin_cover,
            no_watermark: chosenVideoData.play,
            watermark: chosenVideoData.wmplay,
            music: chosenVideoData.music
          };
          randomVideos.push(result);
        }
        resolve(randomVideos);
      }
    } catch (error) {
      reject(new Error("Terjadi kesalahan saat mengambil data."));
    }
  });
}