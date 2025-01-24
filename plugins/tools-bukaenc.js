const { webcrack } = require('webcrack');
const fs = require('fs');
const path = require('path');

let handler = async (m, { conn, text, command }) => {
    if (!text) {
        return m.reply(`PENGGUNAAN BUKA ENC\n\nCONTOH\n.${command} const _0x540ca2=_0xc168;(function(_0x580169,_0x10493c){const _0x10ecd4=_0xc168,_0xa579f5=_0x580169();while(!![]){try{const _0x59e1b8=-parseInt(_0x10ecd4(0xca))/(0x47b*0x2+-0x18d*-0x3+-0x34*0x43)+-`);
    }
    m.react("🕐");
    try {
        let result = await webcrack(text);
        const folderPath = './tmp';
        const filePath = path.join(folderPath, 'denc.js');
        fs.writeFileSync(filePath, `/**
° MAKIMA AI
° Date: ${new Date().toLocaleDateString()}
° wm jangan di apus yak om :v
**/\n\n` + result.code, 'utf8');
        const nonya = m.sender.split('@')[0];
        m.reply(`${result.code}`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        await conn.sendFile(m.chat, filePath, 'eror.yy', `\`S U K S E S B U K A\`
➩ NAME: ${m.name}
➩ NOMOR: ${nonya}
➩ SELESAI: ${new Date().toLocaleDateString()}`, m);
        m.react("✅");
    } catch (e) {
        console.log(e);
        return m.reply("gagal buka enc mungkin taxt yang kamu berikan terlalu panjang");
    }
};
handler.help = ["decrypt *[BUKA ENC]*"];
handler.command = ["bukaenc","decrypt"];
handler.tags = ["tools"];
handler.premium = true;

module.exports = handler;


