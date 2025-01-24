const {
samehandokusearch, 
samehandokudl, 
samehandokuepisode
} = require("../scrape/samehandoku.js") 
const { proto, generateWAMessageFromContent, generateWAMessageContent } = require('@adiwajshing/baileys') 
let handler = async (m, { conn, text, command }) => {
const [commands, query] = text.split('|').map(str => str.trim().toLowerCase());
if (!commands || !query) return m.reply(`IMPUT PESAN\n\nCONTOH\n${command} title|text\n\nLIST LAIN\n1. search\n2. episode\n3. download\n> jangan spam yahh...`) 
m.react("⌛") 
if (commands === 'search') {
let push = []
const reasone = await samehandokusearch(query) 
if (reasone.success) {
for (let i = 0; i < reasone.data.length; i++) {
let { title, link, score,type,genres, image} = reasone.data[i];
let no_watermark = image;
push.push({
body: proto.Message.InteractiveMessage.Body.fromObject({
text: ` [ SAMEHANDOKU HASIL ]
 
 ❏ *TITLE:* ${title}
 ❏ *TYPE:* ${type}
 ❏ *SCORE:* ${score}
 ❏ *GENRES:* ${genres}
 ❏ *URL:* ${link}`
}),
footer: proto.Message.InteractiveMessage.Footer.fromObject({
text: "Your footer text"
}),
header: proto.Message.InteractiveMessage.Header.fromObject({
title: "",
hasMediaAttachment: true,
imageMessage: await createimage(no_watermark)
}),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
buttons: [
{
name: "cta_copy",
buttonParamsJson: `{"display_text":"CEK LIST EPISODE","id":"123456789","copy_code":".${command} episode|${link}"}`
}
]
})
});
}
const msg = generateWAMessageFromContent(m.chat, {
viewOnceMessage: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2
},
interactiveMessage: proto.Message.InteractiveMessage.fromObject({
body: proto.Message.InteractiveMessage.Body.create({
text: `pencarian: *"${text}"*
di temukan: *"${push.length}"*
`
}),
footer: proto.Message.InteractiveMessage.Footer.create({
text: "Your bot name"
}),
header: proto.Message.InteractiveMessage.Header.create({
hasMediaAttachment: false
}),
carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
cards: [
...push
]
})
})
}
}
}, {});
await conn.relayMessage(m.chat, msg.message, {
messageId: msg.key.id
});
} else {
conn.reply(m.chat, `pencarian: ${text} tidak di temukan`, m);
}
} else if (commands === 'download') {
const resdate = await samehandokudl(query);
if (resdate && resdate.data.length > 0) {
let responseMessage = resdate.data.map(item => {
return `*Title:* ${item.title}\n*Description:* ${item.desc}\n*Downloads:*\n${item.Download.map(dl => `${dl.resolution}: ${dl.links.map(link => link.name + ' (' + link.url + ')').join(', ')}`).join('\n')}\n\n`;
}).join('---\n');
conn.reply(m.chat, responseMessage, m);
} else {
conn.reply(m.chat, `Kesalahan: ${responseMessage.error}`, m);
}
} else if (commands === 'episode') {
const result = await samehandokuepisode(query);
if (result && result.eps.length > 0) {
let response = `resultInformasi Anime:\n`;
response += `*Judul:* ${result.Data.title}\n`;
response += `*Jepang:* ${result.Data.Jepang}\n`;
response += `*Sinonim:* ${result.Data.sinonim}\n`;
response += `*Bahasa:* ${result.Data.bahasa}\n`;
response += `*Status:* ${result.Data.status}\n`;
response += `*Type:* ${result.Data.type}\n`;
response += `*Source:* ${result.Data.source}\n`;
response += `*Duration:* ${result.Data.duration}\n`;
response += `*Total Episode:* ${result.Data.totalepisode}\n`;
response += `*Season:* ${result.Data.season}\n`;
response += `*Studio:* ${result.Data.studio}\n`;
response += `*Produser:* ${result.Data.produser}\n`;
response += `*Released:* ${result.Data.released}\n`;
response += `*Image:* ${result.Data.image}\n`;
response += `\nDaftar Episode:\n`;
result.eps.forEach(episode => {
response += `\n**Episode ${episode.number}:** ${episode.title} - ${episode.link} - ${episode.date}\n`;
});
m.reply(response) 
} else {
m.reply(` maaf kamu salah link\n\ncontoh ${command + commands}|https://samehadaku.email/anime/isekai-de-cheat-skill-wo-te-ni-shita-ore-wa-genjitsu-sekai-wo-mo-musou-suru-level-up-wa-jinsei-wo-kaeta/`) 
}
}
m.react("✅") 
};
handler.help = ['samehandoku *[SEARCH]*'];
handler.tags = ['anime'];
handler.command = /^(samehandoku|handoku|doku)$/i;
handler.limit = 4
module.exports = handler;
async function createimage(url) {
const { imageMessage } = await generateWAMessageContent({
image: {
url
}
}, {
upload: conn.waUploadToServer
});
return imageMessage;
}