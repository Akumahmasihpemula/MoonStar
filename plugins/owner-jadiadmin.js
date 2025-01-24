let handler = async (m, { conn, isAdmin }) => {
  if (m.fromMe) throw '*[ OWNER JINTU ]*\n maaf owner tersayang saya bukan admin jadi gak bisa akses :v'
  if (isAdmin) throw '*[ OWNER JINTU ]*\n kamu udah admin di group ini'
  await conn.groupParticipantsUpdate(m.chat, [m.sender], "promote")
}
handler.command = /^jadiadmin$/i
handler.rowner = true
handler.botAdmin = true
module.exports = handler