var handler = async (m, {
 conn 
 }) => {
var block = await conn.fetchBlocklist()                    
conn.reply(m.chat, '[ INFO BLOCK ]\n)> ' + `Total: ${block == undefined ? '*0* Diblokir' : '*' + block.length + '* Diblokir'}\n` + block.map(v => '乂 @' + v.replace(/@.+/, '')).join`\n`, m, { mentions: block })
};
handler.help = ['blocklist'];
handler.tags = ['info'];
handler.command = /^listbloc?k|bloc?klist|daftarbloc?k|blocks$/i
handler.owner = false;
module.exports = handler;