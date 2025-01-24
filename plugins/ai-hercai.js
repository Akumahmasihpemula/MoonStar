const axios = require("axios");
const URL = "https://hercai.onrender.com/v3/hercai";

let handler = async (m, { text }) => {
  if (!text) return m.reply(`[ CARA PENGGUNAAN ]\n>${command} kenapa Indonesia mengalami kemerdekaan`);
  
  try {
    let { data } = await axios({
      method: "GET",
      url: URL,
      params: {
        question: text
      }
    });
    m.reply(data.reply);
  } catch (e) {
    console.log(e);
    m.reply("error kak");
  }
};

handler.command = handler.help = ["hercai"];
handler.tags = ["ai"];
handler.limit = 11;

module.exports = handler;