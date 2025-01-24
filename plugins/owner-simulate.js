let handler = async (m, { conn, args: [event], text }) => {
  if (!event) throw `☐ LIST EVENT: add, bye, delete, promote, demote`
  let mentions = text.replace(event, "").trimStart();
  let who = mentions ? conn.parseMention(mentions) : [];
  let participants = who.length ? who : [m.sender];
  let action = false;
  m.reply(`Simulating ${event}...`);
  switch (event.toLowerCase()) {
    case "add":   
      action = "add";
      break;
    case "bye":
      action = "remove";
      break;
    case "promote":
      action = "promote";
      break;
    case "demote":
      action = "demote";
      break;
    case "delete":
      deleted = m;
      break;
    default:
      throw `☐ LIST EVENT: add, bye, delete, promote, demote`
  }
  if (action)
    return conn.participantsUpdate({
      id: m.chat,
      participants,
      action,
    });
  return conn.onDelete(m);
};
handler.help = ["simulate <event> [@mention]"];
handler.tags = ["owner"];
handler.command = /^(simulate|simulasi|sim)$/i;
handler.owner = true;
module.exports = handler;