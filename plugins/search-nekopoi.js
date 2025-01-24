const { NekoPoi } = require("../scrape/nekopoi.js");

let handler = async (m, { conn, args, command }) => {
if (!args || args.length === 0) return m.reply(`*[ CARA GUNA ]*\n> Example: ${command} isekai`);
m.react("⌛");
try {
const response = await NekoPoi.search(args.join(" "));
if (response.result.length === 0) {
m.reply(`Pencarian "${args.join(" ")}" tidak ditemukan`);
return;
}
const data = response.result.map(v => `■ᴛɪᴛʟᴇ: ${v.title}\n■ʟɪɴᴋ: ${v.url}\n`).join("\n٭٭٭٭٭٭٭٭٭٭٭٭٭٭٭٭٭٭٭٭٭*٭٭٭٭\n");
const cap = "*[ SEARCH NEKOPOI ]*\n\n" + data;
await conn.sendMessage(m.chat, {
image: { url: response.result[0].img },
caption: cap,
contextInfo: {
forwardingScore: 1,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: idkom,
serverMessageId: null,
newsletterName: wm,
},
}
}, { quoted: m });
m.react("✅");
} catch (e) {
m.reply(e.message);
}
}

handler.help = ['nekopoi'];
handler.tags = ['search'];
handler.command = /^(nekopoi|nekopoisesrch)$/i;
handler.premium = true;

module.exports = handler;