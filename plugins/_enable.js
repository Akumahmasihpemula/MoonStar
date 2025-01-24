let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  let isEnable = /true|enable|(turn)?on|1/i.test(command)
  let chat = global.db.data.chats[m.chat]
  let user = global.db.data.users[m.sender]
  let setting = global.db.data.settings
  let type = (args[0] || '').toLowerCase()
  let isAll = false
  let isUser = false
  switch (type) {
  case 'welcome':
  if (!m.isGroup) {
   if (!isOwner) {
     global.dfail('group', m, conn)
      throw false
       }
    } else if (!(isAdmin || isOwner)) {
      global.dfail('admin', m, conn)
        throw false
      }
      chat.welcome = isEnable
      break
    case 'detect':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!(isAdmin || isOwner)) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.detect = isEnable
      break
     case 'delete': 
     case 'antidelete':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.delete = !isEnable
      break
      case 'antibadword':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiBadword = isEnable
      break
      case 'antibot':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiBot = isEnable
      break
      case 'antibuggc':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.bugc = isEnable
      break
      case 'antifoto':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiFoto = isEnable
      break
      case 'antilink':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiLink = isEnable
      break
      case 'antisticker':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.sticker = isEnable
      break
      case 'antitoxic':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.toxic = isEnable
      break
      case 'autodelvn':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.autodelvn = isEnable
      break
      case 'autosticker':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.autostiker = isEnable
      break
      case 'antivideo':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.video = isEnable
      break
      case 'nsfw':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.nsfw = isEnable
      break
    case 'autolevelup':
    case 'levelup':
      isUser = true
      user.autolevelup = isEnable
      break
      case 'gconly':
      isAll = true
      if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
      }
      opts['gconly'] = isEnable
      break
      case 'pconly':
      isAll = true
      if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
      }
      opts['pconly'] = isEnable
      break
      case "autoresetlimit":
     if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
      } 
      setting.resetlimit = isEnable      
      break
      case "anticall":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.anticall
      break
      
    default:
      if (!/[01]/.test(command)) throw `
      ❐ _*DAFTAR OPSI*_
      ╭─━─━─━─━─━──━─━─━─━─━─ད
      │ ◉> WELCOME
      │ ◉> DETECT
      │ ◉> ANTIDELETE/delete
      │ ◉> ANTIBADWORD
      │ ◉> ANTIBOT
      │ ◉> ANTIBUGGC
      │ ◉> ANTIFOTO
      │ ◉> ANTILINK
      │ ◉> ANTISTICKER
      │ ◉> ANTITOXIC
      │ ◉> AUTODELVN
      │ ◉> AUTOSTICKER
      │ ◉> ANTIVIDEO
      │ ◉> NSFW
      │ ◉> AUTOLEVELUP
      │ ◉> GCONLY
      │ ◉> PCONLY
      │ ◉> AUTORESETLIMIT
      │ ◉> AUTOLEVELUP
      │ ◉> ANTICALL
      ╰───────────ᖭ
      
     *Contoh:*
    ${usedPrefix}on welcome
    ${usedPrefix}off welcome `
    throw false
  }
   m.reply(`
*${type}* berhasil di *${isEnable ? 'nyala' : 'mati'}kan* ${isAll ? 'untuk bot ini' : isUser ? '' : 'untuk chat ini'}
`.trim())
}
handler.help = ['en', 'dis'].map(v => v + 'able <option>')
handler.tags = ['group']
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff)|[01])$/i
module.exports = handler