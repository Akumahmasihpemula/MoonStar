const terab9x = require("../scrape/tes"); 

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) return m.reply(`[ PENGGUNAAN ]\n Example: ${usedPrefix + command} https://terabox.com/s/1VDGV_v_Cz7s-2cCrwUi0UA`); 
    m.react("⌛");
    
    try { 
        const response = await terab9x.download(text);
        console.log('Response:', response);
        
        if (!response || !response.data) {
            m.reply('Tidak ada data yang ditemukan');
            return;
        }
        
        const totalnya = response.data.length;
        let index = 1;

        for (const v of response.data) {
            console.log('Mengirim file:', v.filename);
            
            let cap = `\`TERABOX DOWNLOAD\`\n\n`;
            cap += `TITLE: ${v.filename}\n`;
            cap += `SIZE: ${v.size}\n`;
            cap += `(${index++}/${totalnya})\n\n`;
            
            try {
                await conn.sendFile(m.chat, v.download, v.filename, cap);
                console.log('File terkirim:', v.filename);
            } catch (e) {
                console.error('Gagal mengirim file:', v.filename, e);
                m.reply(`Gagal mengirim file: ${v.filename}`);
            }
        }
        m.react("✅");    
    } catch (e) {
        console.error('Gagal mengunduh data:', e);
        m.reply('Gagal mengunduh data');
    }
}

handler.help = ['teraboxdl'];
handler.tags = ['dl'];
handler.command = /^(terabox|teradl|teraboxdl)$/i;
handler.limit = 7;

module.exports = handler;