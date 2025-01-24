const { sizeFormatter } = require("human-readable") 
const fetch = require("node-fetch") 
let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) throw `Masukkan link drive\n\nContoh\n*${usedPrefix + command}* https://drive.google.com/file/d/1-B6Jt9C66dBvfIQ41MP9x0ZhmgSByibW/view?usp=drivesdk`;
m.react("🕘");
try {
const result = await GDriveDl(args[0]);
if (result.error) throw result.error;
const cap = `\`GDRIVE DOWNLOAD\`

◯ NAME: ${result.fileName}
◯ SIZE: ${result.fileSize}
◯ DATE: ${new Date().toLocaleDateString()}`
conn.sendMessage(m.chat, {
document: { url: result.downloadUrl },
caption: cap,
fileName: result.fileName,
mimetype: doc, 
}, { quoted: m });
m.react("✅");
} catch (e) {
m.reply(`Error: ${e}`);
}
}
handler.help = ['gdrive'];
handler.tags = ['dl'];
handler.command = ['gdrive', 'drive'];
handler.limit = 4;
module.exports = handler;
async function GDriveDl(url) {
const formatSize = sizeFormatter({
std: 'JEDEC', decimalPlaces: 2, keepTrailingZeroes: false, render: (literal, symbol) => `${literal} ${symbol}B`
});
let id, res = { "error": true };
if (!(url && url.match(/drive\.google/i))) return res;
try {
id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))[1];
if (!id) throw 'ID Tidak Ditemukan';
const response = await fetch(`https://drive.google.com/uc?id=${id}&authuser=0&export=download`, {
method: 'POST',
headers: {
'accept-encoding': 'gzip, deflate, br',
'content-length': 0,
'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
'origin': 'https://drive.google.com',
'x-client-data': 'CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=',
'x-drive-first-party': 'DriveWebUi',
'x-json-requested': 'true'
}
});
let { fileName, sizeBytes, downloadUrl } = JSON.parse((await response.text()).slice(4));
if (!downloadUrl) throw 'Link Download Limit!';
const data = await fetch(downloadUrl);
if (data.status !== 200) return { error: data.statusText };
return { downloadUrl, fileName, fileSize: formatSize(sizeBytes), mimetype: data.headers.get('content-type') };
} catch (e) {
console.log(e);
return res;
}
}



