const db = require('../lib/database.js');
const { canLevelUp } = require('../lib/levelling.js');

function before(m) {
    let user = db.data.users[m.sender];
    if (!user.autolevelup) return true;

    let before = user.level * 1;
    while (canLevelUp(user.level, user.exp, global.multiplier)) {
        user.level++;
    }

    if (before !== user.level) {
        user.role = global.rpg.role(user.level).name;
        
        // Cek jika level sudah mencapai 70
        if (user.level === 70) {
            user.limit = 60; 
            user.premiumDa = 2;
        }

        const cap = `
Selamat, ${m.name} telah naik level!
• Level Sebelumnya : ${before}
• Level Baru : ${user.level}
• Role Kamu : ${user.role}

\`pesan\`
> Jika level kamu sudah sampai 70, kamu akan mendapatkan sejumlah limit 60 dan 2 hari premium.
        `
conn.sendMessage(m.chat, {
  image: { url: "https://files.catbox.moe/cwpwiz.jpg" },
  caption: cap,
  footer: wm,
  buttons: [
  {
    buttonId: `.levelup`,
    buttonText: { 
      displayText: 'levelUp' ,
    }
  }, {
    buttonId: `.play anime sad 30 menit`,
    buttonText: {
      displayText: "HIBURAN LAGU 🎶",
    }
  }
],
  viewOnce: true,
  headerType: 6,
}, { quoted: m });
    }
}

module.exports = before