const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

let handler = async (m, { conn }) => {
  try {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let name = await conn.getName(who);
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    if (!mime) throw `REPLY VIDEO YANG MAU DI HD`;

    let videoData = await q.download();
    await conn.sendMessage(m.chat, {
      react: {
        text: '🕒',
        key: m.key,
      }
    });

    let outputPath = `./tmp/video_${Date.now()}.mp4`;
    fs.writeFileSync(outputPath, videoData);

    ffmpeg.ffprobe(outputPath, async (err, metadata) => {
      if (err) {
        console.error(err);
        m.reply('Terjadi kesalahan saat memeriksa metadata video. ' + err);
        return;
      }

      let width = metadata.streams[0].width;
      let height = metadata.streams[0].height;

      let aspectRatio = width > height ? 'landscape' : 'portrait';
      let outputSize = aspectRatio === 'landscape' ? '1280x720' : '720x1280';

      ffmpeg(outputPath)
        .outputOptions(`-s`, outputSize)
        .outputOptions('-crf', '20') // Atur nilai crf sesuai kebutuhan (semakin rendah, semakin tinggi kualitas)
        .save(outputPath.replace('.mp4', '_hd.mp4'))
        .on('end', () => {
          conn.sendFile(m.chat, outputPath.replace('.mp4', '_hd.mp4'), '', done, m);
        })
        .on('error', (err) => {
          console.error(err);
          m.reply('Terjadi kesalahan saat meningkatkan resolusi video. ' + err);
        });
    });
  } catch (error) {
    console.error(error);
    m.reply('Terjadi kesalahan. ' + error);
  }
};

handler.help = ["hdvideo"];
handler.command = ["hdvideo", "hdvid"];
handler.tags = ["ai"];
handler.premium = true;

module.exports = handler;