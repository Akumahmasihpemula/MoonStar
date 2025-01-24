let handler = async (m, { conn}) => {
const imtro = `
╭────────「 \`KARTU INTRO\` 」
│
│☐ ɴᴀᴍᴇ:
│☐ ᴜᴍᴜʀ:
│☐ ᴋᴏᴛᴀ: 
│☐ ɢᴀᴍᴅᴇʀ:
│☐ ʜᴏʙɪ:
│☐ sᴛᴀᴛᴜs:
│☐ ᴡᴀɪғᴜ:
╰────────
`
m.reply(imtro) 
};
handler.help = ['intro'].map(v => v + ' <identifikas>');
handler.tags = ['group'];
handler.command = /^(intro)$/i;
handler.register = true;
module.exports = handler;