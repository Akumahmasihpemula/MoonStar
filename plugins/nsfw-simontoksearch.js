const { simontoknonton, simontok } = require("../scrape/simontok.js");
let handler = async (m, { conn, args, text, usedPrefix, command }) => {
if (!text) throw `Input URL/title\n\nContoh\n${command} url/judul`;
m.react("🕐");
if (text.includes('http://') || text.includes('https://')) {
if (!text.includes('simontokx.online')) return m.reply(`❎ Hanya link simontokx.online yang di bolehkan`);
try {
let data = await simontoknonton(text);
let {
author,
title,
description,
thumbnailUrl,
videoLink,
downloadLink
} = data;
let ress = `\`INFO SIMONTOK\`\n`;
ress += `\n\n`;
ress += `▹ TITLE: ${title}\n\n`;
ress += `${description}\n\n\n`;
ress += `URL DOWNLOAD\n`;
ress += `NONTON: ${videoLink}\n\n`;
ress += `DL: ${downloadLink}\n\n`;
conn.sendFile(m.chat, thumbnailUrl, null, ress, fkontak) 
m.react("✅");
} catch (e) {
m.reply(`🔴 ${e.message}`);
}
} else {
try {
let res = await simontok(text); // Pastikan untuk menangkap hasil dari simontok
if (res.Data.length === 0) {
return m.reply(`🔴 Tidak ada hasil yang ditemukan untuk "${text}"`);
}
let date = res.Data.map((v) => `*TITLE* : ${v.title}\n*URL:* ${v.link}\n`).join('─────────────────\n\n');
m.reply(date);
} catch (e) {
m.reply(`🔴 ${e.message}`);
}
}
};
handler.help = ['simontoksearch']
handler.tags = ['nsfw']
handler.command = /^(simontoksearch|simontok)$/i;
handler.premium = true;
module.exports = handler;