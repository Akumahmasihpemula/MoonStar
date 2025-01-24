const fs = require('fs');

let handler = m => m;

handler.all = async function (m, { isBlocked }) {
    if (isBlocked) return;  
    if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('Undangan untuk bergabung') || m.text.startsWith('Invitation to join') || m.text.startsWith('Buka tautan ini')) && !m.isBaileys && !m.isGroup) {
        let teks = `[ TERDETEKSI UNDANGAN GROUP ]\n> maaf yah kak aku gak bisa join kalo mau invite ke group ku 10k 2minggu jik berminat hubungin owner ku`;
        this.reply(m.chat, teks, m);
        const data = global.owner.filter(([id, isCreator]) => id && isCreator);
        this.sendContact(m.chat, data.map(([id, name]) => [id, name]), m);
    }
};

module.exports = handler;