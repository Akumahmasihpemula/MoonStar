let handler = m => m;
handler.before = async function(m, { conn, participants, isPrems, isAdmin }) {
let usrs = global.db.data.users[m.sender];
let premiumExpired = usrs.premium ? new Date(usrs.premiumDate).toDateString() : "belum premium no expired";
if (!conn.danil_join) {
conn.danil_join = {
join: false,
time: 0,
};
}
const currentTime = Math.floor(Date.now() / 1000);
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
case `${global.nomorown}@s.whatsapp.net`:
messageText = global.status.sapa;
break;
default:
if (isPrems) {
messageText = `Konnichiwa, anata desu, ${m.name}. ${premiumExpired} made desu.`;
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
quoted: m,
mentions: mentionedUsers,
}
);
conn.danil_join = {
join: true,
time: currentTime + 600, // Set waktu expired 10 menit ke depan
};
} else {
console.log("No message to send");
}
};
module.exports = handler;