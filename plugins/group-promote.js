const { areJidsSameUser} = require("@adiwajshing/baileys");

let handler = async (m, { conn, participants }) => {
let users = participants.map(participant => participant.id);
let promoteUser= [];
for (let user of users) {
if (
user.endsWith("@s.whatsapp.net") &&
!(
participants.find((v) => areJidsSameUser (v.id, user)) || { admin: true }
).admin
) {
promoteUser .push(user);
const res = await conn.groupParticipantsUpdate(m.chat, [user], "promote");
await delay(1 * 1000);
}
}

if (promoteUser .length > 0) {
m.reply(`[ PROMOTE SUKSES ]\n Sukses sekarang ${promoteUser .join(', ')} telah menjadi admin [✅]`);
} else {
m.reply(`[ PROMOTE GAGAL ]\n Tidak ada pengguna yang dipromosikan.`);
}
};

handler.help = ["promote @tag"];
handler.tags = ["group"];
handler.command = /^(promote)$/i;
handler.admin = true;
handler.group = true;
handler.botAdmin = true;
module.exports = handler;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));