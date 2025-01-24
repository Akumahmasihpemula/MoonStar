const speed = require('performance-now');
const { spawn, exec, execSync } = require('child_process');
const os = require('os');
const yoruka = require('node-os-utils');

let handler = async (m, { conn }) => {
    let totalStorage = Math.floor(os.totalmem() / 1024 / 1024) + 'MB';
    let freeStorage = Math.floor(os.freemem() / 1024 / 1024) + 'MB';
    let cpuSpeed = os.cpus()[0].speed / 1000; // Mengambil kecepatan CPU dalam GHz
    const yoos = await yoruka.os.oos(); // Pastikan untuk menunggu hasil dari oos
    const type = await yoruka.os.type(); // Pastikan untuk menunggu hasil dari type
    const ip = await yoruka.os.ip(); // Pastikan untuk menunggu hasil dari ip
    const hostname = await yoruka.os.hostname(); // Pastikan untuk menunggu hasil dari hostname
    let _muptime;

    // Menghitung uptime jika proses mendukung
    if (process.send) {
        process.send('uptime');
        _muptime = await new Promise(resolve => {
            process.once('message', resolve);
            setTimeout(resolve, 1000);
        });
    } else {
        _muptime = process.uptime() * 1000; // Jika tidak mendukung, ambil uptime dari proses
    }

    let timestamp = speed();
    let latensi = speed() - timestamp;

    // Mengambil informasi dari child process
    let child = ''; // Inisialisasi child
    try {
        child = execSync('free -m').toString("utf-8"); // Mengambil informasi RAM
    } catch (error) {
        console.error("Error fetching memory info:", error);
    }

    const muptime = clockString(_muptime);
    let ssd = child.replace(/Memory:/, "Ram:");

    m.react("🕐");
    let tt = `[ SPEED RESPONSE ]

${latensi.toFixed(4)} _ms_

\`• TYPE:\` ${type}
\`• Total Storage:\` ${totalStorage}
\`• Free Storage:\` ${freeStorage}
\`• CPU Speed:\` ${cpuSpeed} GHz
\`• Host:\` ${hostname}
\`• IP:\` ${ip}
\`• OOS:\` ${yoos}
\`• Uptime:\` ${muptime}
`;
    m.reply(tt);
    m.react("✈");
};

handler.help = ['ping'];
handler.tags = ['info'];
handler.command = ['ping'];

module.exports = handler;

function clockString(ms) {
    const d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
    const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
    const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return [d, ' Hari ', h, ' Jam ', m, ' Menit ', s, ' Detik '].map(v => v.toString().padStart(2, 0)).join('');
}

/**

° SCRIPT: yoruka kirihime
° ʏᴛ : @ᴋᴇɴᴢ_ᴍᴀᴅᴇ
° channel:https://whatsapp.com/channel/0029VaxuomuDp2QB3qI92T1t

"وَهَيْ، أَيُّهَا الْمُؤْمِنُونَ! تَذَكَّرُوا أَنَّ كُلَّ عَمَلٍ لَهُ قِيمَةٌ وَقِصَّةٌ وَرَاءَهُ. لَا تَحْذِفُوا هَذِهِ الْمَاءَةَ، فَإِنَّهَا لَيْسَتْ مَجَرَّدَ عَلاَمَةٍ، بَلْ رَمْزٌ لِلْجُهْدِ وَالإِبْدَاعِ الَّذِي وُضِعَ. احْتَرِمُوا أَعْمَالَ الْآخَرِينَ كَمَا تَحْتَرِمُونَ أَعْمَالَكُمْ، وَلْنَنْشُرِ الْخَيْرَ فِي كُلِّ خُطُواتِنَا. لِنَحْمِ مَعًا هَذِهِ الْأَعْمَالَ لِلْأَجْيَالِ الْمُقْبِلَةِ!"
"Wahay, saudaraku yang beriman! Ingatlah bahwa setiap karya memiliki nilai dan cerita di baliknya. Jangan sekali-kali kau menghapus watermark ini, karena ini bukan sekadar tanda, tetapi simbol dari usaha dan kreativitas yang telah dituangkan. Hargailah karya orang lain seperti kau menghargai karyamu sendiri, dan sebarkanlah kebaikan dalam setiap langkahmu. Mari bersama kita jaga dan lestarikan karya seni ini untuk generasi mendatang!"
**/