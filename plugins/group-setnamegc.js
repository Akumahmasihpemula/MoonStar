let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args.length) {
        return m.reply(`Mana nama grub nya? Contoh: *${usedPrefix + command}* grub himpunan ngawi`);
    }

    try {
        await conn.groupUpdateSubject(m.chat, args.join(" "));
        m.reply('Sukses mengubah nama grup!');
    } catch (err) {
        m.reply('Gagal mengubah nama grup. Pastikan bot memiliki izin Admin.');
        console.error(err);
    }
};

handler.help = ['setnamegc'];
handler.tags = ['group'];
handler.command = /^setnamegc$/i;
handler.group = true
handler.admin = true; 
handler.botAdmin = true; 

module.exports = handler;
