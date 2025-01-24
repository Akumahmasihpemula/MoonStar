let handler = async (m, { conn, isOwner, text }) => {
  if (!text) throw '*[PENGGUNAAN]*\n> di mohon masukan nomor/id group yang mau di unban';
  
  let who;
  if (m.isGroup) {
    if (isOwner) {
      who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat;
    } else {
      who = m.chat;
    }
  } else {
    if (!isOwner) {
      global.dfail('owner', m, conn);
      throw false;
    }
    who = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat;
  }

  try {
    if (text.endsWith('g.us')) {
      global.db.data.chats[text].isBanned = false;
    } else {
      global.db.data.users[who].banned = false;
    }

    m.reply(`*[SUKSES UNBAN]*\n> sukses unban ${await conn.getName(who) == undefined ? 'ini' : await conn.getName(who)}`);

    // Mengirim pesan ke pengguna yang di-unban
    conn.reply(who, `~*[SELAMAT UNBAN]*~\n> selamat yah ${await conn.getName(who)} sekarang kamu sudah di unban oleh owner, jangan spam lagi yah :)`, m);

  } catch (e) {
    throw `nomor tidak ada di database!`;
  }
}

handler.help = ['unban'];
handler.tags = ['owner'];
handler.command = /^unban(chat)?$/i;

handler.owner = true;
module.exports = handler;