let isToxic = /(anj[kg]|ajn[gk]|a?njin[gk]|bajingan|b[a]?[n]?gsa?t|ko?nto?l|me?me?[kq]|pe?pe?[kq]|meki|titi[t,d]|pe?ler|tetek|toket|ngewe|go?blo?k|to?lo?l|idiot|[kng]e?nto?[t,d]|jembut|bego|dajjal|janc[uo]k|pantek|puki?(mak)?|kimak|kampang|lonte|col[i,mek]|pelacur|henceut|nigga|fuck|dick|bitch|tits|bastard|asshole|a[su,w,yu])/i;
let handler = m => m;
handler.before = async function(m, { isBotAdmin, text = "" }) {
if (m.isBaileys && m.fromMe) return;
let chat = global.db.data.chats[m.chat];
let user = global.db.data.users[m.sender];
let isAntiToxic = isToxic.exec(m.text);
if (chat.toxic && isAntiToxic) {
user.warn += 1;
m.reply(`*[ANTI TOXIC]*\n\n> terdeteksi toxic member ${await conn.getName(m.sender)} dan kamu terkena peringatan ( ${user.warn} / 7 ) jika peringatan sampai 7 maka kamu akan di keluarkan dari group ini`);
if (user.warn >= 7) {
user.warn = 0;
await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
}
}
return true;
};
module.exports = handler;