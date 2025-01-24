const fetch = require('node-fetch');

const handler = async (m, { usedPrefix, command }) => {
    m.react("💥");
    try {
        let url = 'https://api.agatz.xyz/api/gempa';
        let api = await fetch(url);
        let hasil = await api.json();
        let { tanggal, waktu, potensi, magnitude, kedalaman, wilayah, lintang, bujur, koordinat, dirasakan } = hasil.data;
        let cap = `\`INFO GEMPA\``;
        cap += `\n\n\`TANGGAL :\` ${tanggal}\n`;
        cap += `\`WAKTU :\` ${waktu}\n`;
        cap += `\`DIRASAKAN :\` ${dirasakan}\n`;
        cap += `\`WILAYAH :\` ${wilayah}\n`;
        cap += `\`KEDALAMAN :\` ${kedalaman}\n`;
        cap += `\`MAGNITUDE :\` ${magnitude}\n\n`;
        m.reply(cap);
    } catch (e) {
        m.reply(`EROR : ${e}`);
    }
};

handler.command = ['gempa',"infogempa"];
handler.tags = ['info'];
handler.help = ['gempa'];
handler.limit = 4
module.exports = handler;