let handler = async(m, { conn, command }) => {
  let isPublic = command === "public";
  let self = global.opts["self"]

  if(self === !isPublic) return m.reply(`*[M O D E B O T]*\n> sukses ${!isPublic ? "memberhentikan" : "mengaktifkan"} ONII-CHAN`)
  global.opts["self"] = !isPublic
  m.reply(`SUKSES ${!isPublic ? "memberhentikan" : "mengaktifkan"}  ${namebot}!`)
}

handler.help = ["self", "public"]
handler.tags = ["owner"]
handler.owner = true
handler.command = /^(self|public)/i
module.exports = handler






