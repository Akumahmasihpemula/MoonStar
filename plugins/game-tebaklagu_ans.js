const similarity = require('similarity');
const threshold = 0.72;

let handler = m => m;

handler.before = async function (m) {
    let id = m.chat;
    
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/TEBAK JUDUL LAGU/i.test(m.quoted.text)) {
        return true; // Mengembalikan true jika kondisi tidak terpenuhi
    }

    this.tebaklagu = this.tebaklagu ? this.tebaklagu : {};
    
    if (!(id in this.tebaklagu)) {
        return m.reply('Soal itu telah berakhir');
    }

    if (m.quoted.id === this.tebaklagu[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tebaklagu[id][1]));
        
        if (m.text.toLowerCase() === json.judul.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tebaklagu[id][2];
            m.reply(`*Benar!*\n+${this.tebaklagu[id][2]} XP`); // Menggunakan m.reply untuk mengirim pesan
            clearTimeout(this.tebaklagu[id][3]);
            delete this.tebaklagu[id];
        } else if (similarity(m.text.toLowerCase(), json.judul.toLowerCase().trim()) >= threshold) {
            m.reply(`*Dikit Lagi!*`);
        } else {
            m.reply(`*Salah!*`);
        }
    }
    
    return true; // Mengembalikan true setelah memproses
};

handler.exp = 0;

module.exports = handler;