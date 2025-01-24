const {bstation} = require("../scrape/blibli.js") 
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

const handler = async (m, { conn, usedPrefix, command, text }) => {
if (!text) return m.reply(`*_[ CARA PENGGUNAAN ]_*\n> Example: ${usedPrefix + command} https://www.bilibili.tv/id/video/2048419498`);
m.reply("*_Tunggu sebentar..._*");
try {
const response = await bstation.down(text);
// Memastikan bahwa elemen yang diinginkan ada
if (!response.down[0] || !response.down[1]) {
return m.reply("Terjadi kesalahan: Tidak dapat menemukan link video atau audio.");
}

const videoLink = response.down[0].url; // Link video
const audioLink = response.down[1].url; // Link audio

const videoPath = await downloadFile(videoLink, 'video.mp4');
const audioPath = await downloadFile(audioLink, 'audio.mp3');

const finalOutputPath = path.join(__dirname, 'final_video.mp4');
await mergeVideoAndAudio(videoPath, audioPath, finalOutputPath);

const cap = `ᴛɪᴛʟᴇ: ${response.judul}\nǫᴜᴀʟɪᴛʏ:${response.down[1].quality}\nᴛʏᴘᴇ: ${response.down[1].format}\nsɪᴢᴇ: ${response.down[1].size}\n`;
conn.sendFile(m.chat, finalOutputPath, null, cap, m);

m.react("✅");
} catch (e) {
console.error('Error fetching data:', e);
m.reply("Terjadi kesalahan: " + e.message);
}
}

handler.help = ["bstationdl *<query>*"];
handler.tags = ["dl"];
handler.command = /^(bstationdl|bliblidl)$/i;
handler.limit = 6;

module.exports = handler;

async function downloadFile(url, filename) {
const response = await axios({
method: 'GET',
url: url,
responseType: 'stream'
});
const filePath = path.join(__dirname, filename);
const writer = fs.createWriteStream(filePath);
response.data.pipe(writer);
return new Promise((resolve, reject) => {
writer.on('finish', () => resolve(filePath));
writer.on('error', reject);
});
}

async function mergeVideoAndAudio(videoPath, audioPath, outputPath) {
return new Promise((resolve, reject) => {
ffmpeg()
.input(videoPath)
.input(audioPath)
.outputOptions(['-c:v copy', '-c:a aac', '-strict experimental'])
.save(outputPath)
.on('end', () => {
fs.unlinkSync(videoPath);
fs.unlinkSync(audioPath);
resolve();
})
.on('error', (err) => {
reject(err);
});
});
}