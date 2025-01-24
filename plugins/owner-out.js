let handler = async (m, { conn, args, command }) => {
    let group = m.chat;
    await m.reply(`sayonara group : ${await conn.getName(group)} ( ཀ͝ ∧ ཀ͝ )`);
    await conn.groupLeave(group);
}

handler.help = ['leavegc'];
handler.tags = ['owner'];
handler.command = /^(out|leavegc)$/i;
handler.rowner = true;

module.exports = handler;