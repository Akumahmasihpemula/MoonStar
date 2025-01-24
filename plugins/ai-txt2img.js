const axios = require("axios");

let handler = async (m, { text, conn }) => {
  if (!text) return m.reply(`masukan input judul\n\ncontoh\n> ${command} makima anime, grill`);
  m.react('⌛');
  
  try {
    var URL = "https://hercai.onrender.com/v3/text2image";
    let { data } = await axios({
      method: "GET",
      url: URL,
      params: {
        prompt: text
      }
    });
    
    conn.sendMessage(m.chat, { image: { url: data.url }, caption: "done" }, { quoted: m });
    m.react("✅");
  } catch (e) {
    console.log(e);
    m.reply("error kak");
  }
};

handler.help = ["txt2img"];
handler.tags = ["ai"];
handler.command = ["txtimg", "textimg", "txt2img"];
handler.limit = 3;

module.exports = handler;