let handler = m => m;
handler.before = async function(m, { conn, participants, isPrems, isAdmin }) {
// Tunggu hasil dari conn.getName
let namegc = await conn.getName(m.chat);
let name = m.sender;
let fkonn = {
key: {
fromMe: false,
participant: `0@s.whatsapp.net`,
...(m.chat ? { remoteJid: '0@s.whatsapp.net' } : {})
},
message: {
contactMessage: {
displayName: `${await conn.getName(name)}`,
vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
}
}
};
// Inisialisasi state jika belum ada
if (!conn.danil_join) {
conn.danil_join = {
join: false,
time: 0,
};
}
const currentTime = Math.floor(Date.now() / 1000);
// Cek apakah pesan berasal dari grup dan apakah sudah memenuhi cooldown
if (!m.isGroup || conn.danil_join.time > currentTime) {
console.log("Not a group message or still in cooldown");
return;
}
// Cek apakah pengirim adalah user premium
const isOwners = global.db.data.users[m.chat]?.owners;
let messageText = "";
let mentionedUsers = participants.map((u) => u.id).filter((v) => v !== conn.user.jid);
// Logika sambutan berdasarkan nomor pengirim
switch (m.sender) {
case `${nomorown}@s.whatsapp.net`:
messageText = `halo owner ku yang cakep ${m.name} `;
break;
default:
if (isOwners) {
messageText = `halo owner ku yang cakep ${m.name} `;
}
break;
}
if (messageText) {
await conn.sendMessage(
m.chat,
{
text: messageText,
},
{
quoted: fkonn,
mentions: mentionedUsers,
}
);
conn.danil_join = {
join: true,
time: currentTime + 600,
};
} else {
console.log("No message to send");
}
};
module.exports = handler;

