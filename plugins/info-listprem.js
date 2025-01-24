let handler = async (m, { conn, usedPrefix }) => {
    let users = global.db.data.users;
    let usrs = users[m.sender];
    let text = "";
    let i = 1;
  
    let now = new Date(2024, 9, 12); 

    for (let jid in users) {
        if (users[jid].premium) {
            let premiumDate = new Date(users[jid].premiumDate);
            if (isNaN(premiumDate.getTime())) {
                premiumDate = now;
            }

            let premiumExpiryDate = new Date(premiumDate.getTime() + (30 * 24 * 60 * 60 * 1000)); 
            let timeLeft = premiumExpiryDate - now;
            let formattedTimeLeft = msToCountdown(timeLeft);
            let formattedPremiumDate = premiumDate.toLocaleDateString();
            let formattedExpiryDate = premiumExpiryDate.toLocaleDateString();
            text += `\n━━━━━━━━━━━━━━━━━━━━━━━━\nNO: ${i}\nNAME: ${await conn.getName(jid)}\nLINK: wa.me/${jid.replace(/@.+/, '')}\nwaktu premium: ${formattedPremiumDate}\nEXPIRED: ${formattedExpiryDate}\nWaktu tersisa: ${formattedTimeLeft}\n━━━━━━━━━━━━━━━━━━━━━━━━`;
            i += 1;
        }
    }

    if (i === 1) {
        text = "Tidak ada pengguna premium.";
    }
    return conn.reply(m.chat, `*❏ \`D A F D A R U S E R\`
☐ Premium: ${i - 1} user
${text}

\`KETERANGAN\`

apakah akan ada di daftar user premium? jika tidak kamu bisa chat owner ku untuk update ke premium update pertama 10k 1 bulan pertama update dan seterusnya jika update ke 2 kali akan di kenakan harga normal yahkamu bisa mengecek harga dengan ketik  *_.sewa_* ✅`, false, { contextInfo: { mentionedJid: jid } });
}

handler.help = ['listptem'];
handler.tags = ['info'];
handler.command = /^(premslist|premlist|listptem)$/i;
handler.limit = true;

module.exports = handler;

function msToCountdown(ms) {
    if (ms < 0) return "MASA PREMIUM KAMU SUDAH EXPAIRED/HABIS";
    let days = Math.floor(ms / (24 * 60 * 60 * 1000));
    let hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    let minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
    let seconds = Math.floor((ms % (60 * 1000)) / 1000);
    return `${days} Hari : ${hours} Jam : ${minutes} Menit : ${seconds} Detik`;
}