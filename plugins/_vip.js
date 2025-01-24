let handler = m => m;
handler.before = async function (m) {
let user = db.data.users[m.sender];
if (user.vipTime > 0 && new Date() - user.vipTime > 0) {
user.vipTime = 0;
user.vip = false;
return m.reply("[ WAKTU EXPIRED ]\n> waktu vip kamu sudah habis mau perpanjang waktu chat owner ku yah");
}
};
module.exports = handler;


