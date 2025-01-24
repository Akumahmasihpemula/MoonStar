const { spotifydl } = require("../scrape/Spotify.js");

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return m.reply(`Cara penggunaan\n\n*Contoh :* ${usedPrefix + command} https://open.spotify.com/track/01JqqGqHK8GweU31TeaMSr`);
m.react("🕐");
try {
const { album, name, artist, upload, dl_url, image } = await spotifydl(text);

let cap = `\`DOWNLOAD SPOTIFY\`\n\n`;
cap += `ALBUM: ${album}\n`;
cap += `ARTIS: ${artist}\n`;
cap += `NAME: ${name}\n`;
cap += `UPLOAD: ${upload}\n`;
cap += `URL: ${text}\n\n`;
cap += `\`${wm}\``;

await conn.sendMessage(m.chat, {
document: { url: dl_url },
caption: cap,
mimetype: 'audio/mpeg',
fileName: name,
fileLength: 999,
pageCount: 999,
contextInfo: {
mentions: [m.sender],
forwardingScore: 1,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: idkom,
serverMessageId: null,
newsletterName: wm,
},
externalAdReply: {
title: `「 ${name} 」`,
mediaType: 1,
previewType: 0,
renderLargerThumbnail: true,
thumbnailUrl: image,
sourceUrl: sgc
}
}
}, { quoted: m });
} catch (e) {
console.error(e);
m.reply(`Terjadi kesalahan: ${e.message}`);
}
}

handler.help = ['spotifydl'];
handler.tags = ['dl'];
handler.command = /^(dlspotify|spotifydl)$/i;
handler.premium = true;

module.exports = handler;