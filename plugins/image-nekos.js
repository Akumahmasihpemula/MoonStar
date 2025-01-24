const fetch = require("node-fetch");
const fs = require("fs");

const handler = async (m, {
  conn,
  usedPrefix,
  text,
  args,
  command
}) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  let template = (args[0] || "").toLowerCase();

  if (!args[0]) {
    let caption = `*Contoh Penggunaan Single*\n${usedPrefix + command} cecan\n\n*Contoh Penggunaan Multi*\n${usedPrefix + command} pinterest |wibu\n\n*List:*\n• ${usedPrefix + command} hug\n• ${usedPrefix + command} kiss\n• ${usedPrefix + command} lizard\n• ${usedPrefix + command} neko\n• ${usedPrefix + command} pat\n• ${usedPrefix + command} 8ball\n• ${usedPrefix + command} cat\n• ${usedPrefix + command} smug\n• ${usedPrefix + command} woof\n• ${usedPrefix + command} gasm\n• ${usedPrefix + command} goose\n• ${usedPrefix + command} cuddle\n• ${usedPrefix + command} avatar\n• ${usedPrefix + command} slap\n• ${usedPrefix + command} v3\n• ${usedPrefix + command} gecg\n• ${usedPrefix + command} feed\n• ${usedPrefix + command} fox_girl\n• ${usedPrefix + command} meow\n• ${usedPrefix + command} wallpaper\n• ${usedPrefix + command} tickle\n• ${usedPrefix + command} spank\n• ${usedPrefix + command} waifu\n• ${usedPrefix + command} lewd\n• ${usedPrefix + command} ngif\n`;
    await conn.sendFile(m.chat, logo, "", caption, m);
  }

  if (command) {
    try {
      switch (template) {
        case "8ball":
        case "cat":
          let cb = await fetch(`https://nekos.life/api/v2/${args[0]}`);
          let cc = await cb.json();
          await conn.sendFile(m.chat, cc.url, "", author, m);
          break;
        case "hug":
        case "kiss":
        case "lizard":
        case "neko":
        case "pat":
          let db = await fetch(`https://nekos.life/api/${args[0]}`);
          let urlgif = (await db.json()).url;
          await conn.sendMessage(m.chat, {
            video: {
              url: urlgif
            },
            gifPlayback: true,
            gifAttribution: ~~(2 * Math.random()),
            caption: author
          }, {
            quoted: m
          });
          break;
        default:
          let eb = await fetch(`https://nekos.life/api/v2/img/${args[0]}`);
          let ec = await eb.json();
          await conn.sendFile(m.chat, ec.url, "", author, m);
      }
    } catch {
      m.react('❌'); // Mengganti eror dengan emoji
    }
  }
};

handler.help = ["nekos <command> <teks>"];
handler.tags = ["image"];
handler.command = /^nekos$/i;

module.exports = handler;