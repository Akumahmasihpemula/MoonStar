const { proto } = require("@adiwajshing/baileys").default;

let handler = async (m, { conn, text, command, usedPrefix, isRowner, isPrems }) => {
    let M = proto.WebMessageInfo;
    if (!m.quoted) throw `*_[ PENGGUNAAN FITURE ]_*\n> reply pesan/image contoh: ${command} namestore`;
    if (!text) throw `[ GUNAKAN TITLE ]\n> ${usedPrefix + command} makima_md`;
    if (!isRowner && !isPrems) throw "command tersebut hanya di boleh user premium/owner bot saja";
    
    let msgs = global.db.data.msgs;
    if (text in msgs) throw `${text} sudah Ada di daftar storelist gunakan nama lain`;
    
    msgs[text] = M.fromObject(await m.getQuotedObj()).toJSON();
    return m.reply(`[ SUKSES ADDSTORE ]\n> ${text} berhasil di tabahkan gunakan ${text} untuk memanggil data jika lupa gunakan (.liststore) untuk melihat daftar store dari ${namebot}`);
};

handler.help = ["addstore"];
handler.tags = ["store"];
handler.command = ["addstore"];

module.exports = handler;