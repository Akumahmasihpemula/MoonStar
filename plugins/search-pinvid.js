const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
const { pinvideo } = require('../scrape/pinterestvid.js');

const handler = async (m, { conn, command, text }) => {
    if (!text) return m.reply(`\`Example : ${command} makima\`\n`);
    m.react("⌛");
    try {
        let apikey = await pinvideo(text);
        const videoUrl = apikey.result[0].video;
        const durasi = apikey.result[0].durasi;
        const mp4Path = await convertM3u8ToMp4(videoUrl); 
        await conn.sendFile(m.chat, mp4Path, "video.mp4", done, m);      
        const tmpDir = path.join(__dirname, './tmp');
        if (!fs.existsSync(tmpDir)) {
            fs.mkdirSync(tmpDir);
        }
        
        const newFilePath = path.join(tmpDir, 'video.mp4');
        fs.renameSync(mp4Path, newFilePath); // Pindahkan file ke folder tmp

        m.react("✅");
    } catch (error) {
        m.reply(`Error : ${error.message}`);
    }
};

handler.help = ["pinterestvideo *<query>*"];
handler.tags = ["search"];
handler.command = /^(pinsearch|pinterestvideo|pinvid)$/i;
handler.limit = 6;

module.exports = handler;

async function convertM3u8ToMp4(m3u8Url) {
    return new Promise((resolve, reject) => {
        const outputPath = path.join(__dirname, 'video.mp4');
        ffmpeg()
            .input(m3u8Url)
            .outputOptions(["-c:v libx264", "-c:a aac"])
            .output(outputPath)
            .on("end", () => {
                resolve(outputPath);
            })
            .on("error", (err) => {
                reject(err);
            })
            .run();
    });
}