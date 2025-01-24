const { areJidsSameUser} = require("@adiwajshing/baileys");

let handler = async (m, { conn, participants }) => {
let users = m.mentionedJid.filter((u) => !areJidsSameUser (u, conn.user.id));
let user = m.mentionedJid && m.mentionedJid[0];
if (!user) {
return m.reply("Silakan sebutkan pengguna yang ingin di-demote.");
}
await conn.groupParticipantsUpdate(m.chat, [user], "demote");
m.reply(`[ DEMOTE Sukses ]\n> Sukses menghapus ${user} dari admin ke member`);
};

handler.help = ["demote @tag"];
handler.tags = ["group"];
handler.command = /^(demote)$/i;

handler.admin = true;
handler.group = true;
handler.botAdmin = true;

module.exports = handler;