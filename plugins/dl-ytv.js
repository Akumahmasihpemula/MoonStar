const { ytmp4 } = require("../scrape/ytdl");

let handler = async (m, { conn, text, command }) => {
if (!text) return m.reply(`[ _PEMAKAIAN FITURE_ ]\n> Example: ${command} https://youtube.com/shorts/AImXPXlMrak?si=nrHZFmwnQIel-JcV`);

m.reply(wait);

try {
const { title, views, size, type, dl } = await ytmp4(text); 
let cap = `\`YOUTUBE DOWNLOAD\``; 
cap += `\n\n`;
cap += `ᴛɪᴛʟᴇ: ${title}\n`;
cap += `ᴡɪᴇᴡs: ${views}\n`;
cap += `sɪᴢᴇ: ${size}\n\n`;
cap += wm; 

await conn.sendMessage(m.chat, {
video: { url: dl },
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
m.reply(`Error: ${e.message}`);
}
};

handler.help = ['ytmp4'];
handler.tags = ['dl'];
handler.command = ['ytmp4', 'ytv'];
handler.limit = 4;
module.exports = handler;