const cron = require('node-cron');
let handler = m => m;
let messageSent = false; 

handler.before = async function (m) {
  cron.schedule('11 00 * * *', () => {
    let users = global.db.data.users;

    let resetUsers = Object.entries(users).filter(([user, data]) => data.limit < 7000);

    if (resetUsers.length > 0 && !messageSent) {
      let limit = 30;

      resetUsers.forEach(([user, data]) => {
        data.limit = limit;
      });
      console.log('Reset limit');

      const q = {
        key: { remoteJid: 'status@broadcast', participant: '0@s.whatsapp.net', fromMe: false, id: '' },
        message: { conversation: 'SUKSES LIMIT DI RISET' }
      };

      conn.sendMessage(`120363164510479075@g.us`, { text: `[ NOTIFICATIONS RESTART LIMIT ]\n> perhatian member limit kamu di riset yah rata-rata limit members ${limit} limit` }, { quoted: q });

      messageSent = true;
    }
  }, {
    scheduled: true,
    timezone: 'Asia/Jakarta'
  });
};

module.exports = handler;