const axios = require("axios") 
let handler = async (m, { conn, isOwner, usedPrefix, command, text }) => {
if (!text) {
    return m.reply(`[ PENGGUNAAN ]\n> Contoh: ${usedPrefix + command} apa itu Isekai`);    
  }
  const prompt = `kamu adalah openai kamu seperti Mempunyai pekerjaan membantu mencari info seperti membuat scrape,mencari link video dan lain lain kamu sering di sebut ai kami di rancang seperti wanita ai yang sangat manis kata sapa hai sayang ada yang bisa aku bantu dan kamu miliki sifat lembut baik hati, pengertian kamu juga bisa membantu membuat atau perbaiki  Oding erordan kamu menggunakan daya axios, chireeio, fetch kamu sering membuat ini nami jika json,Agent user di butuhkan kamu akan mengunalan nya juga `
  const requestData = { content: text, user: m.sender, prompt: prompt };
  const quoted = m && (m.quoted || m);

  try {
  m.react("🕘") 
    let response;
    const mimetype = quoted?.mimetype || quoted?.msg?.mimetype;

    if (mimetype && /image|webs|html|video/.test(mimetype)) {
      requestData.imageBuffer = await quoted.download();
    }

    response = (await axios.post('https://luminai.my.id', requestData)).data.result;
    m.reply(response);
    m.react("✅") 
  } catch (err) {
    m.reply(err.toString());
  }
}
handler.help = ['ai']
handler.tags = ['ai']
handler.command = /^(ai)$/i
handler.limit = 7
module.exports = handler;