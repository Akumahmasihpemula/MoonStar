const { facebookDl } = require("../scrape/Facebook.js");

const handler = async (m, { text, conn, command }) => {
    if (!text) return conn.reply(m.chat, `*\`Masukkan link Facebook nya\`*\ncontoh : ${command} https://www.facebook.com/reel/1550677888894768?mibextid=ngobeXctTp5pD3Zm`, m);
    
    try {
        const response = await facebookDl(text);
        
        // Mengambil data secara acak
        const randomIndex = Math.floor(Math.random() * response.data.length);
        const selectedData = response.data[randomIndex];
        
        const type = selectedData.type;
        const quality = selectedData.quality;
        const dlurl = selectedData.url;
        const date = `${new Date().toLocaleDateString()}`;
        
        let cap = `\`DOWNLOAD FACEBOOK\``;
        cap += `\n\n`;
        cap += `TYPE: ${type}\n`;
        cap += `QUALITY: ${quality}\n`;
        cap += `DATA: ${date}\n\n`;
        cap += `${wm}`;
        
        conn.sendFile(m.chat, dlurl, "eror.mp4", cap, m);
    } catch (error) {
        return conn.reply(m.chat, '*`Error:` ' + error.message, m);
    }
};

handler.help = ["facebook"];
handler.tags = ["dl"];
handler.command = /^(fb|facebook|fbdl|facebookdl)$/i;
handler.limit = 6;

module.exports = handler;