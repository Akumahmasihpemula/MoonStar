let fs = require("fs")
let fetch = require('node-fetch')
let moment = require('moment-timezone')
let listyoruka = async (m, { conn, args,usedPrefix }) => {
const perintah = args[0] || 'tags';
const tagCount = {};
const tagHelpMapping = {};

Object.keys(global.plugins)
.filter(plugin => !plugin.disabled)
.forEach(plugin => {
const tagsArray = Array.isArray(global.plugins[plugin].tags)
? global.plugins[plugin].tags
: [];

if (tagsArray.length > 0) {
const helpArray = Array.isArray(global.plugins[plugin].help)
? global.plugins[plugin].help
: [global.plugins[plugin].help];

tagsArray.forEach(tag => {
if (tag) {
if (tagCount[tag]) {
tagCount[tag]++;
tagHelpMapping[tag].push(...helpArray);
} else {
tagCount[tag] = 1;
tagHelpMapping[tag] = [...helpArray];
}}}); }});

// Ambil informasi tentang plugin
let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
return {
help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
prefix: 'customPrefix' in plugin,
limit: plugin.limit,
premium: plugin.premium,
group: plugin.group, 
owner: plugin.owner, 
vip: plugin.vip, 
enabled: !plugin.disabled,
}
});

if (perintah === 'tags') {
const daftarTag = Object.keys(tagCount)
.sort()
.join('\n│〘□〙menu ');
let { registered,money,limit,level} = global.db.data.users[m.sender]
let usrs = db.data.users[m.sender]
let premm = `${usrs.premiumTime > 1 ? 'Yes': 'No'}`
const cap = `${ucapan()}*${m.name}*\n\`ᴘᴇʀᴋᴇɴᴀʟᴋᴀɴ ɴᴀᴍᴀ sᴀʏᴀ ${namebot} sᴀʏᴀ ᴅɪ ᴄɪᴘᴛᴀᴋᴀɴ ᴏʟᴇʜ ɴᴏᴅᴇᴊs ᴅᴀɴ sᴀʏᴀ ᴅɪ ᴋᴇᴍʙᴀɴɢᴋᴀɴ ᴏʟᴇʜ ${nameown} ᴅᴀɴ sᴀʏᴀ ᴊᴜɢᴀ ᴍᴇɴʏᴇᴅɪᴀᴋᴀɴ ʙᴇʙᴇʀᴀᴘᴀ ғɪᴛᴜʀ ʏᴀɴɢ ᴍᴜɴɢᴋɪɴ ᴀᴋᴀɴ ᴍᴇᴍʙᴀɴᴛᴜ ᴋᴀᴍᴜ sᴇᴘᴇʀᴛɪ ᴍᴇɴᴅᴏᴡɴʟᴏᴀᴅ ʙᴇʙᴇʀᴀᴘᴀ ᴛᴇᴍᴘᴀᴛ sᴇᴘᴇʀᴛɪ ʏᴛ,ɪɢ,ᴛᴡɪᴛᴛᴇʀ ᴅᴀɴ ʟᴀɪɴ ʟᴀɪɴ ɴʏᴀ ᴋᴀᴍᴜ ᴊᴜɢᴀ ʙɪsᴀ ʙᴇʀᴍᴀɪɴ ɢᴀᴍᴇ ʏᴀɴɢ ᴀᴅᴀ ᴅɪ ғɪᴛᴜʀ ᴋᴀᴍɪ\`

*乂I N F O R M A T I O N*

〔➩〕NAME: ${m.name}
〔➩〕Limit: ${limit}
〔➩〕LEVEL: ${level}
〔➩〕PREMS: ${premm}
〔➩〕MONAY: ${money}
〔➩〕REGISTERED: ${registered ? "terdaftar":"tidak terdaftar"}

【 L I S T C O M M A N D 】

│〘□〙${usedPrefix}menu ${daftarTag}\n│〘□〙${usedPrefix}menuall\n\nINFO LOGO

premium: 🅟
group: 🅖
owner: 🅞
vip: 🅥

TAGS MENU : *_${Object.keys(tagCount).length}_*`
if (global.menu === 'simple') {
m.react('⌛') 
m.reply(cap) 
m.react('✅') 
} else if (global.menu === 'image') {
m.react('⌛') 
await conn.relayMessage(m.chat, {
extendedTextMessage:{
text: cap, 
contextInfo: {
mentionedJid: [m.sender],
externalAdReply: {
title: `「 ${namebot} 」`,
mediaType: 1,
previewType: 0,
renderLargerThumbnail: true,
thumbnailUrl: 'https://files.catbox.moe/x4v3gk.jpg',
sourceUrl: sgc
}
}, 
mentions: [m.sender]
}
}, {quoted: m });
m.react('✅') 
} else if (global.menu === 'video') {
m.react('⌛') 
await conn.sendMessage(m.chat, {
video: { url: "https://files.catbox.moe/7pc7e0.mp4" },
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
m.react('✅') 
 } else if (global.menu === 'payment') {
 m.react('⌛') 
await conn.relayMessage(m.chat, {
requestPaymentMessage: {
currencyCodeIso4217: 'IDR',
amount1000: 9999999999 * 1000,
requestFrom: '0@s.whatsapp.net',
noteMessage: {
extendedTextMessage: {
text: cap,
externalAdReply: {
showAdAttribution: true
}
}
}
}
}, {});
m.react('✅') 
 } else {
 m.react('⌛') 
let sections = [];
Object.keys(tagCount).map((map) => {
sections.push({
rows: [{
title: `巛 FITURE (${map})`,
description: ``,
id: `.menu ${map}`
}]
});
});

const listMessage = {
title: 'ᴄᴇᴋ ғɪᴛᴜʀ!',
sections
};

conn.sendMessage(m.key.remoteJid, {
image: { url: pp },
caption: `${ucapan()}*${m.name}*\n\`ᴘᴇʀᴋᴇɴᴀʟᴋᴀɴ ɴᴀᴍᴀ sᴀʏᴀ ${namebot} sᴀʏᴀ ᴅɪ ᴄɪᴘᴛᴀᴋᴀɴ ᴏʟᴇʜ ɴᴏᴅᴇᴊs ᴅᴀɴ sᴀʏᴀ ᴅɪ ᴋᴇᴍʙᴀɴɢᴋᴀɴ ᴏʟᴇʜ ${nameown} ᴅᴀɴ sᴀʏᴀ ᴊᴜɢᴀ ᴍᴇɴʏᴇᴅɪᴀᴋᴀɴ ʙᴇʙᴇʀᴀᴘᴀ ғɪᴛᴜʀ ʏᴀɴɢ ᴍᴜɴɢᴋɪɴ ᴀᴋᴀɴ ᴍᴇᴍʙᴀɴᴛᴜ ᴋᴀᴍᴜ sᴇᴘᴇʀᴛɪ ᴍᴇɴᴅᴏᴡɴʟᴏᴀᴅ ʙᴇʙᴇʀᴀᴘᴀ ᴛᴇᴍᴘᴀᴛ sᴇᴘᴇʀᴛɪ ʏᴛ,ɪɢ,ᴛᴡɪᴛᴛᴇʀ ᴅᴀɴ ʟᴀɪɴ ʟᴀɪɴ ɴʏᴀ ᴋᴀᴍᴜ ᴊᴜɢᴀ ʙɪsᴀ ʙᴇʀᴍᴀɪɴ ɢᴀᴍᴇ ʏᴀɴɢ ᴀᴅᴀ ᴅɪ ғɪᴛᴜʀ ᴋᴀᴍɪ\`

*乂I N F O R M A T I O N*

〔➩〕NAME: ${m.name}
〔➩〕Limit: ${limit}
〔➩〕LEVEL: ${level}
〔➩〕PREMS: ${premm}
〔➩〕MONAY: ${money}
〔➩〕REGISTERED: ${registered ? "terdaftar":"tidak terdaftar"}`,
footer: wm,
buttons: [
{
buttonId: '.ping',
buttonText: {
displayText: 'sᴘᴇᴇᴅ ʙᴏᴛ' 
},
type: 1,
},
{
buttonId: 'script',
buttonText: {
displayText: 'sᴄʀɪᴘᴛ ʙᴏᴛ'
},
type: 1,
},
{
buttonId: 'action',
buttonText: {
displayText: 'ini gai tau apa'
},
type: 4,
nativeFlowInfo: {
name: 'single_select',
paramsJson: JSON.stringify(listMessage)
}
},
],
headerType: 1,
viewOnce: true,
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
m.react('✅') 
}
} else if (tagCount[perintah]) {
const daftarHelp = tagHelpMapping[perintah].map((helpItem, index) => {
const premiumSign = help[index].premium ? '🅟' : '';
const limitSign = help[index].limit ? '🅛' : '';
const owneSign = help[index].owner ? '🅞' : '';
const groupSign = help[index].group ? '🅖' : '';
const vipSign = help[index].vip ? '🅥' : '';
return `.${helpItem} ${premiumSign}${limitSign}${owneSign}${groupSign}${vipSign}`;
}).join('\n[✰] ');
let name2 = m.pushName || conn.getName(m.sender)
let cap2 = ` _*乂menu ${perintah}*_\n\n[✰] ${daftarHelp}\n\n> *Total Item: *${tagHelpMapping[perintah].length}*`
if (global.menu === 'simple') {
m.react('⌛') 
m.reply(cap) 
m.react('✅') 
} else if (global.menu === 'image') {
m.react('⌛') 
await conn.relayMessage(m.chat, {
extendedTextMessage:{
text: cap2, 
contextInfo: {
mentionedJid: [m.sender],
externalAdReply: {
title: `「 ${namebot} 」`,
mediaType: 1,
previewType: 0,
renderLargerThumbnail: true,
thumbnailUrl: 'https://files.catbox.moe/x4v3gk.jpg',
sourceUrl: sgc
}
}, 
mentions: [m.sender]
}
}, {quoted: m });
m.react('✅') 
} else if (global.menu === 'video') {
m.react('⌛') 
await conn.sendMessage(m.chat, {
video: { url: "https://files.catbox.moe/7pc7e0.mp4" },
caption: cap2,
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
m.react('✅') 
 } else if (global.menu === 'payment') {
 m.react('⌛') 
await conn.relayMessage(m.chat, {
requestPaymentMessage: {
currencyCodeIso4217: 'IDR',
amount1000: 9999999999 * 1000,
requestFrom: '0@s.whatsapp.net',
noteMessage: {
extendedTextMessage: {
text: cap2,
externalAdReply: {
showAdAttribution: true
}
}
}
}
}, {});
m.react('✅') 
 } else {
 m.react('⌛') 
conn.sendMessage(m.chat, {
image: { url: pp },
caption: cap2,
footer: wm,
buttons: [
{
buttonId: '.menu all',
buttonText: {
displayText: 'LIST ALL FITURE'
},
type: 1
},
{
buttonId: '.ttr yoruka kirihime jj 5',
buttonText: {
displayText: 'VIDEO YORUKA'
},
type: 2
}
],
headerType: 1,
viewOnce: true,
contextInfo: {
externalAdReply: {
showAdAttribution: true,
title: namebot,
body: wm,
thumbnailUrl: pp2, 
sourceUrl: sig 
}
}
}, { quoted: null });
}
} else if (perintah === 'all') {
let name = m.pushName || conn.getName(m.sender)
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
const allTagsAndHelp = Object.keys(tagCount).map(tag => {
const daftarHelp = tagHelpMapping[tag].map((helpItem, index) => {
const premiumSign = help[index].premium ? '🅟' : '';
const limitSign = help[index].limit ? '🅛' : '';
const owneSign = help[index].owner ? '🅞' : '';
const groupSign = help[index].group ? '🅖' : '';
const vipSign = help[index].vip ? '🅥' : '';
return `.${helpItem} ${premiumSign}${limitSign}${owneSign}${groupSign}${vipSign}`}).join('\n│❏ ');
return `├──────────────────────│\n│❑ MENU ${tag}\n├──────────────────────│\n│❏ ${daftarHelp}`;
}).join('');
let name3 = m.pushName || conn.getName(m.sender)
let { money,limit,level} = global.db.data.users[m.sender]
let usrs3 = db.data.users[m.sender]
let prem3 = `${usrs3.premiumTime > 1 ? 'Yes': 'No'}`
const cap3 =`
╭──────────────────────│
│❑ I N F O M E M B E R
├──────────────────────│
│ ❍ NAME: ${name3}
│ ❍ LEVEL: ${level}
│ ❍ LIMIT: ${limit}
│ ❍ MONEY: ${money}
│ ❍ PREMS: ${prem3}
├──────────────────────│
│❑ I N F O C O M M A N D
├──────────────────────│
│premium: 🅟
│limit: 🅛
│owner: 🅞
│vip: 🅥 
│group: 🅖
${allTagsAndHelp}
├──────────────────────│
│❑ \`${namebot}\`
├──────────────────────│`
if (global.menu === 'simple') {
m.react('⌛') 
m.reply(cap) 
m.react('⌛') 
} else if (global.menu === 'image') {
m.react('⌛') 
await conn.relayMessage(m.chat, {
extendedTextMessage:{
text: cap3, 
contextInfo: {
mentionedJid: [m.sender],
externalAdReply: {
title: `「 ${namebot} 」`,
mediaType: 1,
previewType: 0,
renderLargerThumbnail: true,
thumbnailUrl: 'https://files.catbox.moe/x4v3gk.jpg',
sourceUrl: sgc
}
}, 
mentions: [m.sender]
}
}, {quoted: m });
m.react('✅') 
} else if (global.menu === 'video') {
m.react('⌛') 
await conn.sendMessage(m.chat, {
video: { url: "https://files.catbox.moe/7pc7e0.mp4" },
caption: cap3,
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
m.react('✅') 
 } else if (global.menu === 'payment') {
await conn.relayMessage(m.chat, {
requestPaymentMessage: {
currencyCodeIso4217: 'IDR',
amount1000: 9999999999 * 1000,
requestFrom: '0@s.whatsapp.net',
noteMessage: {
extendedTextMessage: {
text: cap3,
externalAdReply: {
showAdAttribution: true
}
}
}
}
}, {});
 } else {
 m.react('⌛') 
conn.sendMessage(m.chat, {
image: { url: pp },
caption: cap3,
footer: wm,
buttons: [
{
buttonId: '.menu all',
buttonText: {
displayText: 'LIST ALL FITURE'
},
type: 1
},
{
buttonId: '.ttr yoruka kirihime jj 5',
buttonText: {
displayText: 'VIDEO YORUKA'
},
type: 2
}
],
headerType: 1,
viewOnce: true,
contextInfo: {
externalAdReply: {
showAdAttribution: true,
title: namebot,
body: wm,
thumbnailUrl: pp2, 
sourceUrl: sig 
}
}
}, { quoted: null });
m.react('✅') 
}
} else {
conn.sendMessage(m.chat, { text : `Tag '${perintah}' tidak ditemukan. Gunakan 'menu' atau 'menu all' untuk melihat tag yang tersedia.` }, { quoted: m });
}}
listyoruka.command = /^(menu)$/i
module.exports = listyoruka

function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function ucapan() {
 const time = moment.tz("Asia/Jakarta").format("HH"); 
let res = "yoruka ga anata ni keikoku shimasu Sō shinai to byōki ni natte naite shimaimasu ";
if (time >= 4 && time < 10) {
res = "Ohayou"; 
} else if (time >= 10 && time < 15) {
res = "Konnichiwa"; 
} else if (time >= 15 && time < 18) {
res = "Konnichiwa"; 
} else if (time >= 18) {
res = "Konbanwa";
}
return res;
}

/**

° SCRIPT: yoruka kirihime
° ʏᴛ : @ᴋᴇɴᴢ_ᴍᴀᴅᴇ
° channel:https://whatsapp.com/channel/0029VaxuomuDp2QB3qI92T1t

"وَهَيْ، أَيُّهَا الْمُؤْمِنُونَ! تَذَكَّرُوا أَنَّ كُلَّ عَمَلٍ لَهُ قِيمَةٌ وَقِصَّةٌ وَرَاءَهُ. لَا تَحْذِفُوا هَذِهِ الْمَاءَةَ، فَإِنَّهَا لَيْسَتْ مَجَرَّدَ عَلاَمَةٍ، بَلْ رَمْزٌ لِلْجُهْدِ وَالإِبْدَاعِ الَّذِي وُضِعَ. احْتَرِمُوا أَعْمَالَ الْآخَرِينَ كَمَا تَحْتَرِمُونَ أَعْمَالَكُمْ، وَلْنَنْشُرِ الْخَيْرَ فِي كُلِّ خُطُواتِنَا. لِنَحْمِ مَعًا هَذِهِ الْأَعْمَالَ لِلْأَجْيَالِ الْمُقْبِلَةِ!"
"Wahay, saudaraku yang beriman! Ingatlah bahwa setiap karya memiliki nilai dan cerita di baliknya. Jangan sekali-kali kau menghapus watermark ini, karena ini bukan sekadar tanda, tetapi simbol dari usaha dan kreativitas yang telah dituangkan. Hargailah karya orang lain seperti kau menghargai karyamu sendiri, dan sebarkanlah kebaikan dalam setiap langkahmu. Mari bersama kita jaga dan lestarikan karya seni ini untuk generasi mendatang!"
**/