let handler = async (m, { conn, participants }) => {
  let user = participants.map((x) => x.id);
  let gc = await conn.groupMetadata(m.chat);
  
  for (let a of user) {
    if (
      a !== conn.user.jid &&
      a !== gc.owner &&
      a !== nomorown + "@s.whatsapp.net"
    ) {
      await conn.groupParticipantsUpdate(m.chat, [a], "remove");
    }
  }
  
  m.reply("_*[ SUKSES KICK ALL ]*_");
};

handler.help = handler.command = ["kickall"];
handler.tags = ['group'];
handler.rowner = true;
handler.botAdmin = true;

module.exports = handler;