let PhoneNumber = require('awesome-phonenumber')
let levelling = require('../lib/levelling')
const axios = require ("axios")
const fetch = require("node-fetch")
let handler = async (m, { conn, text, usedPrefix, command }) => {
	function no(number){
    return number.replace(/\s/g,'').replace(/([@+-])/g,'')
  }

	text = no(text)

  if(isNaN(text)) {
		var number = text.split`@`[1]
  } else if(!isNaN(text)) {
		var number = text
  }
  
   if(!text && !m.quoted) return conn.reply(m.chat, `[ ᴘᴇɴɢɢᴜɴᴀᴀɴ ᴄᴏᴍᴍᴇɴᴅ ]\n> ʜᴀɪ sᴇɴᴘᴀɪ ${m.name} ᴄᴀʀᴀ ᴍᴇɴɢᴀᴍʙɪʟ ᴘʀᴏғɪʟᴇ ᴋᴀᴍᴜ ᴀᴛᴀᴜ ɪɴғᴏ ᴅᴀᴛᴀ ᴋᴀᴍᴜ ʀᴇᴘʟʏ ᴘᴇsᴀɴ ᴋᴀᴍᴜ ʏᴀʜ ᴋᴀᴋ ᴀᴛᴀᴜ ᴍᴀsᴜᴋᴀɴ ɴᴏᴍᴏʀ ᴋᴀᴍᴜ ᴀᴛᴀᴜ ᴍᴀᴜ ᴍᴇɴɢᴀᴍʙɪʟ ᴅᴀᴛᴀ ᴏʀᴀɴɢ ɢᴜɴᴀᴋᴀɴ ᴛᴀɢ ᴋᴇ ᴛᴀʀɢᴇᴛ`, m)
    if(isNaN(number)) return conn.reply(m.chat, `[ ᴘᴇɴɢɢᴜɴᴀᴀɴ ᴄᴏᴍᴍᴇɴᴅ ]\n> ᴍᴀᴀғ ʜᴀɴʏᴀ ᴍᴀsᴜᴋᴀɴ ᴀɴɢᴋᴀ ᴋᴀᴋ ᴄᴏɴᴛᴏʜ 628xxxx ᴀᴛᴀᴜ ᴛᴀɢ ᴍᴇᴍᴇʙᴇʀ/ᴅɪʀɪ ᴋᴀᴍᴜ`, m)
    if(number.length > 15) return conn.reply(m.chat, `[ ᴘᴇɴɢɢᴜɴᴀᴀɴ ᴄᴏᴍᴍᴇɴᴅ ]\n> ɢᴀɢᴀʟ ᴍᴇɴɢᴀᴍʙɪʟ ᴅᴀᴛᴀ ᴋᴀʀɴᴀ ɴᴏᴍᴏʀ ᴍᴇʟᴇʙɪʜɪ 12 ɢᴀɢᴀʟ ᴀᴍʙɪʟ ᴅᴀᴛᴀ ɪɴғᴏ ᴘʀᴏғɪʟᴇ ɴʏᴀ 😔`, m) 
  try {
		if(text) {
			var who = number + '@s.whatsapp.net'
		} else if(m.quoted.sender) {
			var who = m.quoted.sender
		} else if(m.mentionedJid) {
  		  var who = number + '@s.whatsapp.net'
			} 
			pp = await conn.profilePictureUrl(who, 'image')
		} catch (e) {	
  } finally {
  	if (typeof db.data.users[who] == 'undefined') throw 'Pengguna tidak ada didalam data base'
	let groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : {}
    let participants = m.isGroup ? groupMetadata.participants : []
	let users = m.isGroup ? participants.find(u => u.jid == who) : {}
	let number = who.split('@')[0]
	//let pp = await conn.updateProfilePicture(who)
	let about = (await conn.fetchStatus(who).catch(console.error) || {}).status || ''
    let { name, pasangan, limit, exp, money, bank, lastclaim, premiumDate, premium, registered, regTime, age, level, role } = global.db.data.users[who]
    let now = new Date() * 1
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let username = conn.getName(who)
   // let buffer = await getBuffer(pp)
    let math = max - xp
    let prem = global.prems.includes(who.split`@`[0])
    let jodoh = `Berpacaran @${pasangan.split`@`[0]}`
    let str = `
დ .•*””*• PROFILE •*””*•.დ

□ɴᴀᴍᴇ: (@${who.split`@`[0]})
□ʙɪᴏ: ${about ?  + about : 'PRIVAT SAMA DIA'}
□sᴛᴀᴛᴜs: ${pasangan ? jodoh : 'jomblo dia' }
□ɴᴜᴍʙᴇʀ: ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
□ᴜʀʟ: https://wa.me/${who.split`@`[0]}
□ᴜᴍᴜʀ:${registered ? + age : 'tidak di ketahui'}
□ᴇxᴘ: ${exp} 
□ʟᴇᴠᴇʟ: ${level}
□ʀᴏʟᴇ: *${role}*
□ʟɪᴍɪᴛ: ${premium ? 'UNLIMITED' : limit}
□ᴍᴏɴᴇʏ: ${money}
□ʀᴇɢɪsᴛᴇʀ: ${registered ? "YA [✅]":"NO [❌]"}
□ᴘʀᴇᴍɪᴜᴍ: ${premium ? 'PREMIUM' : 'FFEE'}
□ᴘʀᴇᴍs ᴇxᴘɪʀᴇᴅ:${(premiumDate - now) > 1 ? msToDate(premiumDate - now) : '*Tidak diatur expired premium!*'}${lastclaim > 0 ? '\nLast Claim: ' + new Date(lastclaim) : ''}

\`PESAN\`
> ini adalah data/info dari ${registered ? '(' + name + ') ': ''}
`.trim()
     let mentionedJid = [who]
 	conn.sendFile(m.chat, pp, 'pp.jpg', str, m, false, { contextInfo: { mentionedJid: conn.parseMention(str) }})
 }
}
handler.help = ['profile [@user]']
handler.tags = ['info']
handler.command = /^profile$/i
handler.limit = true
handler.register = false

module.exports = handler

function msToDate(ms) {
		temp = ms
		days = Math.floor(ms / (24*60*60*1000));
		daysms = ms % (24*60*60*1000);
		hours = Math.floor((daysms)/(60*60*1000));
		hoursms = ms % (60*60*1000);
		minutes = Math.floor((hoursms)/(60*1000));
		minutesms = ms % (60*1000);
		sec = Math.floor((minutesms)/(1000));
		return days+" Hari "+hours+" Jam "+ minutes + " Menit";
		// +minutes+":"+sec;
  }
  
  const getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
                    'User-Agent': 'GoogleBot',
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (e) {
		console.log(`Error : ${e}`)
	}
}
