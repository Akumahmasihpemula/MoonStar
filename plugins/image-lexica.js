const fetch = require("node-fetch") 
const handler = async (m, {
  args,
  command,
  usedPrefix,
  conn
}) => {
  const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply(`[ LEXICA IMAGE ]\nContoh penggunaan:\n*${usedPrefix}${command} grils nime kawai`);
  try {
   let resul = (await (await fetch("https://lexica.art/api/v1/search?q=" + text)).json()).images.getRandom();
      m.react(wait), await conn.sendFile(m.chat, resul.src,null,done, m);
    } catch (e) {
    return e.message
    }
};
handler.help = ["lexica"], handler.tags = ["image"], handler.command = ["lexica"];
handler.limit = 4
module.exports = handler;