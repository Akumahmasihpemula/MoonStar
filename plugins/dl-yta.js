const { ytmp3 } = require("../scrape/ytdl");

let handler = async (m, { conn, text, command }) => {
if (!text) return m.reply(`[ _PEMAKAIAN FITURE_ ]\n> Example: ${command} https://youtube.com/shorts/AImXPXlMrak?si=nrHZFmwnQIel-JcV`);

m.reply(wait);

try {
const { title, views, size, type, dl } = await ytmp3(text); 

conn.sendMessage(m.chat, {
audio: { url: dl },
mimetype: type,
contextInfo: {
forwardingScore: 1,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: idkom,
serverMessageId: null,
newsletterName: wm, 
},
},
}, { quoted: m });

m.react("✅");
} catch (e) {
m.reply(`Error: ${e.message}`);
}
};

handler.help = ['ytmp3'];
handler.tags = ['dl'];
handler.command = ['ytmp3', 'yta'];
handler.limit = 4;

module.exports = handler;