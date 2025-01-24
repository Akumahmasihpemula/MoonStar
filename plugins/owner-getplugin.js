const cp = require('child_process');
const { promisify } = require('util');
let exec = promisify(cp.exec).bind(cp);
let handler = async (m, { conn, isROwner, usedPrefix, command, text }) => {
if (!text) {
return m.reply("Harap masukkan nomor tujuan dan nama plugin. Contoh: .getplugin taguser|jadibot");
}
let who = m.chat;
let [phoneNumber, pluginName] = text.split('|').map(v => v.trim());
if (m.mentionedJid && m.mentionedJid.length > 0) {
who = m.mentionedJid[0];
}
if (!who) {
return m.reply(`Tolong tag member yang ingin diberi pengguna fitur!`);
}
if (!pluginName) {
return m.reply("Format tidak valid. Harap gunakan format: .getplugin nomor_tujuan|nama_plugin");
}
let ar = Object.keys(plugins);
let ar1 = ar.map(v => v.replace('.js', ''));
if (!ar1.includes(pluginName)) {
return m.reply(`♡  ∩_∩
（„• ֊ •„)♡
┏ • UU • - • - • - • - • - • - • ღ❦ღ┓
ʙᴇʀʙᴀɢɪ ᴘʟᴜɢɪɴ
ɴᴀᴍᴀ: ${nameown}
ᴠᴇʀsɪᴏɴ: ${versi}
ᴛᴏᴛᴀʟ: ${ar1.length}
┗ღ❦ღ • - • - • - • - • - • - • - •- •  ┛
${ar1.map((v, index) => `${index + 1}. ${v}`).join('\n')}`);
}
let o;
try {
o = await exec(`cat plugins/${pluginName}.js`);
} catch (e) {
o = { stdout: '', stderr: e.message };
} finally {
let { stdout, stderr } = o || {};
if (stdout && stdout.trim()) {
await conn.reply(who, stdout.trim(), m);
}
if (stderr && stderr.trim()) {
await conn.reply(who, stderr.trim(), m);
}
m.react("✅");
}
};
handler.help = ['getplugin *[BERBAGI GUNA NOMOR]*'];
handler.tags = ['owner'];
handler.command = /^(getplugin)$/i;
handler.rowner = true;
module.exports = handler;