const fetch = require("node-fetch");
const fs = require("fs");

const handler = async (m, {
  conn,
  isOwner,
  usedPrefix,
  command,
  args
}) => {
  const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && (m.quoted.text || m.quoted.caption || m.quoted.description) || null;
  
  if (!text) return m.reply(`_*[ CARBON IMAGE ]*_\n> Contoh penggunaan:\n*${usedPrefix}${command} ${namebot}`);
  
  m.reply(wait);
  
  CarbonifyV1(text)
    .then(async result => await conn.sendFile(m.chat, result, "", "*V1 by:*\n" + m.name, m))
    .catch(() => 
      CarbonifyV2(text)
        .then(async result => await conn.sendFile(m.chat, result, "", "*V2 by:*\n" + m.name, m))
        .catch(error => {
          throw error;
        })
    );
};

handler.help = ["carbon"];
handler.tags = ["image"];
handler.command = /^carbon(ify)?$/i;

module.exports = handler;

async function CarbonifyV1(input) {
  let Blobs = await fetch("https://carbonara.solopov.dev/api/cook", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      code: input
    })
  }).then(response => response.blob());
  
  let arrayBuffer = await Blobs.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function CarbonifyV2(input) {
  let Blobs = await fetch("https://carbon-api.vercel.app/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      code: input
    })
  }).then(response => response.blob());
  
  let arrayBuffer = await Blobs.arrayBuffer();
  return Buffer.from(arrayBuffer);
}