const {Cerpen} = require("dhn-api") 
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  m.react(wait);
  try {
    let cap = `🔍 *[ RESULT ]*\n\n${await Cerpen()}\n`;
    m.reply(cap);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["cerpen"], handler.tags = ["internet"], handler.command = /^(cerpen)$/i;
handler.limit = 3;

module.exports = handler