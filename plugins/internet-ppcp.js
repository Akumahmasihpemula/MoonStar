let { Couples } = require('dhn-api')
var handler = async (m, { conn, command }) => {
m.react("🕘");
  try {
const res = await Couples() 
await conn.sendFile(m.chat, res.male, 'ppcp.jpg',  `\`RESULT : COWO\``, m) 
return conn.sendFile(m.chat, res.female, 'ppcp.jpg', `\`RESULT : CEWE\``, m)
  } catch (e) {
    m.react("❌");
  }
}

handler.help = ['ppcp'];
handler.tags = ['internet'];
handler.command = /^(papcaple|ppcp)$/i;
handler.limit = 5
module.exports = handler
