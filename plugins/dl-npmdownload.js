const { exec } = require('child_process');
const fs = require('fs');
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return m.reply(`*Contoh* : ${usedPrefix + command} yt-search,versi(opsional)`);
async function npmdownloader(pkg, pkgver) {
try {
const filePath = await new Promise((resolve, reject) => {
exec(`npm pack ${pkg}@${pkgver}`, (error, stdout) => {
if (error) {
m.reply('Error atau Package tidak ditemukan');
console.error(`exec error: ${error}`);
reject(error);
return;
}
resolve(stdout.trim());
});
});
const fileName = filePath.split('/').pop();
const data = await fs.promises.readFile(filePath);
let Link;
if (pkgver === 'latest') {
Link = `https://www.npmjs.com/package/${pkg}`;
} else {
Link = `https://www.npmjs.com/package/${pkg}/v/${pkgver}`;
}
await conn.sendMessage(m.chat, {
document: data,
mimetype: "application/zip",
fileName: fileName,
caption: `- \`Nama\`: ${fileName}\n- \`Versi\`: ${pkgver}\n- \`Link\`: ${Link}`
}, {
quoted: m
});
await fs.promises.unlink(filePath);
} catch (err) {
console.error(`Error: ${err}`);
}
}
conn.sendMessage(m.chat, {
react: {
text: "⏱",
key: m.key,
}
});
try {
const [text2, ver] = text.split(",");
await npmdownloader(text2, ver || 'latest');
} catch (error) {
m.reply('Sepertinya terjadi kesalahan atau package tidak ditemukan');
}
};
handler.help = ["npmdl"];
handler.tags = ["dl"];
handler.command = ["npmdl", "npmdownload"];
module.exports = handler;