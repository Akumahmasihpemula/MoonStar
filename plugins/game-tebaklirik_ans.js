const similarity = require('similarity');
const threshold = 0.72;

let handler = m => m;

handler.before = async function (m) {
    let id = m.chat;

    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Ketik.*teli/i.test(m.quoted.text)) {
        return true; // Mengembalikan true jika kondisi tidak terpenuhi
    }

    this.tebaklirik = this.tebaklirik ? this.tebaklirik : {};
    
    if (!(id in this.tebaklirik)) {
        return m.reply('Soal itu telah berakhir');
    }

    if (m.quoted.id === this.tebaklirik[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tebaklirik[id][1]));
        
        if (m.text.toLowerCase() === json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tebaklirik[id][2];
            m.reply(`*Benar!*\n+${this.tebaklirik[id][2]} XP`); // Menggunakan m.reply untuk mengirim pesan
            clearTimeout(this.tebaklirik[id][3]);
            delete this.tebaklirik[id];
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) {
            m.reply(`*Dikit Lagi!*`);
        } else {
            m.reply(`*Salah!*`);
        }
    }

    return true; // Mengembalikan true setelah memproses
};

handler.exp = 0;

module.exports = handler;