const { NekoPoi } = require("../scrape/nekopoi.js");
const axios = require("axios");
const cheerio = require("cheerio");

let handler = async (m, { conn, args, command }) => {
if (!args || args.length === 0) {
return m.reply(`*[ CARA GUNA ]*\n> Example: ${command} https://nekopoi.care/jav-cosplay-ncyf-035-cosplayer-qiqi-melayani-dengan-sepenuh-hati/`);
}
m.react("⌛");
try {
const response = await NekoPoi.down(args.join(" "));
if (!response || response.url_down.length === 0) {
m.reply(`UrL "${args.join(" ")}" TIDAK DI TEMUKAN`);
return;
}

// Kirim hasil jika ditemukan
m.reply(`Judul: ${response.judul}\nViews: ${response.views}\nUpload: ${response.upload}\nLink Download: ${response.url_down.map(item => item.name + ' - ' + item.links).join('\n\n')}\n\n\n\`PENJELASAN\`\n> cek link nya ajah :v`);
} catch (error) {
console.error("Error:", error);
m.reply("Terjadi kesalahan saat mengambil data.");
}
};

handler.help = ['nekopoidl'];
handler.tags = ['dl'];
handler.command = /^(nekopoidl|nekodl)$/i;
handler.premium = true;

module.exports = handler;