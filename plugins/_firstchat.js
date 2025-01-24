const moment = require('moment-timezone');

async function before(m) {
    if (m.chat.endsWith('broadcast') || m.fromMe || m.isGroup) return;

    let user = global.db.data.users[m.sender];

    // Check if the user has received a private message in the last 24 hours
    if (new Date() - user.pc < 86400000) return;

    // Get the greeting message based on the current time
    const greetingMessage = ucapan();

    // Send the private message
    await m.reply(`[ P E S A N P R I V A T E ]\n${greetingMessage}\n> Selamat datang kak di ${namebot}. Ada perlu apa? Mau pake ai ketik (.menu)? Jangan spam yah, jangan lupa follow ig hayangmodol.pptx Nnti aku follback.`);

    // Update the last private message timestamp
    user.pc = new Date() * 1;
}

function ucapan() {
    const time = moment.tz('Asia/Jakarta').format('HH');
    let res = "Selamat dinihari 🌆";
    
    if (time >= 4 && time < 10) {
        res = "Selamat pagi 🌄";
    } else if (time >= 10 && time < 15) {
        res = "Selamat siang ☀️";
    } else if (time >= 15 && time < 18) {
        res = "Selamat sore 🌇";
    } else if (time >= 18) {
        res = "Selamat malam 🌙";
    }
    
    return res;
}

// Export the before function for use in other modules
module.exports = {
    before
};