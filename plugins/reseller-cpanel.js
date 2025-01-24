const crypto = require("crypto") 
const fs = require("fs") 
const fetch = require("node-fetch") 
let handler = async (m, {conn,text, args, command, usedPrefix, isOwner, isGroup, groupMetadata}) => {

const eggid = 15
const location = 1
const prefix = usedPrefix 
const tanggal = new Date()
const makima = conn
const ken = JSON.parse(fs.readFileSync('./database/idgrup.json').toString())
const jangan = m.isGroup ? ken.includes(m.chat) : false	
switch (command) {
case "sh":{
   if (!isOwner) return m.reply(`Khusus Owner`)
            if (!text) throw `Contoh Penggunaan :\n\n.pushmember text nya`;
            let getGroups = await conn.groupFetchAllParticipating();
            let groups = Object.entries(getGroups)
              .slice(0)
              .map((entry) => entry[1]);
            let anu = groups.map((v) => v.id);
           m.reply(`*Proses*`);
            for (let i of anu) {
              await sleep(2000);
              let txt = `${text}`;
              conn.sendText(i, txt);
            }
            m.reply(`*Sukses*`);
}
break
case 'ramlist':{
if (!isOwner) return m.reply(`1gb
2gb
3gb
4gb
5gb
6gb
7gb
8gb
unli`)
let pannel = `1gb username,62xxx

1gb-8gb/unli`
m.reply(pannel)
}
break
case 'addgc':         
if (!isOwner) return m.reply(`Khusus Owner`)
ken.push(m.chat)
fs.writeFileSync('./database/idgrup.json', JSON.stringify(ken))
m.reply(`*GROUP ${groupMetadata.subject}*\n_Sukses Addgc_`)
break
  case 'delgc':
if (!isOwner) return m.reply(`Khusus Owner`)
var ini = ken.indexOf(m.chat)
ken.splice(ini, 1)
fs.writeFileSync('./database/idgrup.json', JSON.stringify(ken))
m.reply(`*GROUP ${groupMetadata.subject}*\n_Sukses Delgc_`)
         
break
case "1gb": {
if (!jangan) return m.reply("Harus Di Group Bg Terus Di .addgc Agar Kamu Bisa Akses Fitur Ini")
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
 ${usedPrefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "1024"
let cpu = "30"
let disk = "1024"
let email = username + "@gmail.com"
if (!u) return
let d = (await makima.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})  
let { key } = await makima.sendMessage(m.chat, {text: '* SEDANG MEMBUAT SERVER...*'},{quoted: m})
let ctf = `*DATA AKUN SERVER PANNEL ANDA *
=====================================================
 Username : ${user.username}
 Password : ${password.toString()}
 Login : ${domain}
 Gc Bot: ${sgc}

 NOTE: ADMIN HANYA MENGIRIM 1X AJA, MOHON DI SIMPAN BAIK BAIK, CLAIM GARANSI?? SS BUKTI TF + CHAT 
========================================================`
makima.sendMessage(u, {text: `${ctf}`}, {quoted:null})
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = `*SERVER TELAH DI BUAT*

ID USER : ${user.id}
ID SERVER : ${server.id}
RAM : 1200
DISK : 1200
CPU ${cpu}

*USR & PASSWORD TELAH DI KIRIM KE*
*PRIVATE MESSAGE ! SILAHKAN DI CEK*`
await conn.sendMessage(m.chat, {text: p, edit: key},{quoted: m})
}
break
case "2gb": {
if (!jangan) return m.reply("Harus Di Group Bg Terus Di .addgc Agar Kamu Bisa Akses Fitur Ini")
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
 ${usedPrefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "2048"
let cpu = "60"
let disk = "2048"
let email = username + "@gmail.com"
if (!u) return
let d = (await makima.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})  
let { key } = await makima.sendMessage(m.chat, {text: '* SEDANG MEMBUAT SERVER...*'},{quoted: m})
let ctf = `*DATA AKUN SERVER PANNEL ANDA *
=====================================================
 Username : ${user.username}
 Password : ${password.toString()}
 Login : ${domain}
 Gc Bot: ${sgc}

 NOTE: ADMIN HANYA MENGIRIM 1X AJA, MOHON DI SIMPAN BAIK BAIK, CLAIM GARANSI?? SS BUKTI TF + CHAT 
========================================================`
makima.sendMessage(u, {text: `${ctf}`}, {quoted:null})
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = `*SERVER TELAH DI BUAT*

ID USER : ${user.id}
ID SERVER : ${server.id}
RAM : ${memo}
DISK : ${disk}
CPU ${cpu}

*USR & PASSWORD TELAH DI KIRIM KE*
*PRIVATE MESSAGE ! SILAHKAN DI CEK*`
await conn.sendMessage(m.chat, {text: p, edit: key},{quoted: m})
}
break
case "2gb": {
if (!jangan) return m.reply("Harus Di Group Bg Terus Di .addgc Agar Kamu Bisa Akses Fitur Ini")
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
 ${usedPrefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "2048"
let cpu = "60"
let disk = "2048"
let email = username + "@gmail.com"
if (!u) return
let d = (await makima.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})  
let { key } = await makima.sendMessage(m.chat, {text: '* SEDANG MEMBUAT SERVER...*'},{quoted: m})
let ctf = `*DATA AKUN SERVER PANNEL ANDA *
=====================================================
 Username : ${user.username}
 Password : ${password.toString()}
 Login : ${domain}
 Gc Bot: ${sgc}

 NOTE: ADMIN HANYA MENGIRIM 1X AJA, MOHON DI SIMPAN BAIK BAIK, CLAIM GARANSI?? SS BUKTI TF + CHAT 
========================================================`
makima.sendMessage(u, {text: `${ctf}`}, {quoted:null})
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = `*SERVER TELAH DI BUAT*

ID USER : ${user.id}
ID SERVER : ${server.id}
RAM : ${memo}
DISK : ${disk}
CPU ${cpu}

*USR & PASSWORD TELAH DI KIRIM KE*
*PRIVATE MESSAGE ! SILAHKAN DI CEK*`
await conn.sendMessage(m.chat, {text: p, edit: key},{quoted: m})
}
break
case "3gb": {
if (!jangan) return m.reply("Harus Di Group Bg Terus Di .addgc Agar Kamu Bisa Akses Fitur Ini")
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
 ${usedPrefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "3096"
let cpu = "70"
let disk = "3096"
let email = username + "@gmail.com"
if (!u) return
let d = (await makima.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})  
let { key } = await makima.sendMessage(m.chat, {text: '* SEDANG MEMBUAT SERVER...*'},{quoted: m})
let ctf = `*DATA AKUN SERVER PANNEL ANDA *
=====================================================
 Username : ${user.username}
 Password : ${password.toString()}
 Login : ${domain}
 Gc Bot: ${sgc}

 NOTE: ADMIN HANYA MENGIRIM 1X AJA, MOHON DI SIMPAN BAIK BAIK, CLAIM GARANSI?? SS BUKTI TF + CHAT 
========================================================`
makima.sendMessage(u, {text: `${ctf}`}, {quoted:null})
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = `*SERVER TELAH DI BUAT*

ID USER : ${user.id}
ID SERVER : ${server.id}
RAM : ${memo}
DISK : ${disk}
CPU ${cpu}

*USR & PASSWORD TELAH DI KIRIM KE*
*PRIVATE MESSAGE ! SILAHKAN DI CEK*`
await conn.sendMessage(m.chat, {text: p, edit: key},{quoted: m})
}
break
case "5gb": {
if (!jangan) return m.reply("Harus Di Group Bg Terus Di .addgc Agar Kamu Bisa Akses Fitur Ini")
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
 ${usedPrefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "4200"
let cpu = "80"
let disk = "4200'"
let email = username + "@gmail.com"
if (!u) return
let d = (await makima.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})  
let { key } = await makima.sendMessage(m.chat, {text: '* SEDANG MEMBUAT SERVER...*'},{quoted: m})
let ctf = `*DATA AKUN SERVER PANNEL ANDA *
=====================================================
 Username : ${user.username}
 Password : ${password.toString()}
 Login : ${domain}
 Gc Bot: ${sgc}

 NOTE: ADMIN HANYA MENGIRIM 1X AJA, MOHON DI SIMPAN BAIK BAIK, CLAIM GARANSI?? SS BUKTI TF + CHAT 
========================================================`
makima.sendMessage(u, {text: `${ctf}`}, {quoted:null})
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = `*SERVER TELAH DI BUAT*

ID USER : ${user.id}
ID SERVER : ${server.id}
RAM : ${memo}
DISK : ${disk}
CPU ${cpu}

*USR & PASSWORD TELAH DI KIRIM KE*
*PRIVATE MESSAGE ! SILAHKAN DI CEK*`
await conn.sendMessage(m.chat, {text: p, edit: key},{quoted: m})
}
break
case "4gb": {
if (!jangan) return m.reply("Harus Di Group Bg Terus Di .addgc Agar Kamu Bisa Akses Fitur Ini")
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
 ${usedPrefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "5200"
let cpu = "100"
let disk = "5200'"
let email = username + "@gmail.com"
if (!u) return
let d = (await makima.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})  
let { key } = await makima.sendMessage(m.chat, {text: '* SEDANG MEMBUAT SERVER...*'},{quoted: m})
let ctf = `*DATA AKUN SERVER PANNEL ANDA *
=====================================================
 Username : ${user.username}
 Password : ${password.toString()}
 Login : ${domain}
 Gc Bot: ${sgc}

 NOTE: ADMIN HANYA MENGIRIM 1X AJA, MOHON DI SIMPAN BAIK BAIK, CLAIM GARANSI?? SS BUKTI TF + CHAT 
========================================================`
makima.sendMessage(u, {text: `${ctf}`}, {quoted:null})
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = `*SERVER TELAH DI BUAT*

ID USER : ${user.id}
ID SERVER : ${server.id}
RAM : ${memo}
DISK : ${disk}
CPU ${cpu}

*USR & PASSWORD TELAH DI KIRIM KE*
*PRIVATE MESSAGE ! SILAHKAN DI CEK*`
await conn.sendMessage(m.chat, {text: p, edit: key},{quoted: m})
}
break
case "6gb": {
if (!jangan) return m.reply("Harus Di Group Bg Terus Di .addgc Agar Kamu Bisa Akses Fitur Ini")
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
 ${usedPrefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "6200"
let cpu = "120"
let disk = "6200'"
let email = username + "@gmail.com"
if (!u) return
let d = (await makima.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})  
let { key } = await makima.sendMessage(m.chat, {text: '* SEDANG MEMBUAT SERVER...*'},{quoted: m})
let ctf = `*DATA AKUN SERVER PANNEL ANDA *
=====================================================
 Username : ${user.username}
 Password : ${password.toString()}
 Login : ${domain}
 Gc Bot: ${sgc}

 NOTE: ADMIN HANYA MENGIRIM 1X AJA, MOHON DI SIMPAN BAIK BAIK, CLAIM GARANSI?? SS BUKTI TF + CHAT 
========================================================`
makima.sendMessage(u, {text: `${ctf}`}, {quoted:null})
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = `*SERVER TELAH DI BUAT*

ID USER : ${user.id}
ID SERVER : ${server.id}
RAM : ${memo}
DISK : ${disk}
CPU ${cpu}

*USR & PASSWORD TELAH DI KIRIM KE*
*PRIVATE MESSAGE ! SILAHKAN DI CEK*`
await conn.sendMessage(m.chat, {text: p, edit: key},{quoted: m})
}
break
case "8gb": {
if (!jangan) return m.reply("Harus Di Group Bg Terus Di .addgc Agar Kamu Bisa Akses Fitur Ini")
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
 ${usedPrefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "7200"
let cpu = "140"
let disk = "7200'"
let email = username + "@gmail.com"
if (!u) return
let d = (await makima.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})  
let { key } = await makima.sendMessage(m.chat, {text: '* SEDANG MEMBUAT SERVER...*'},{quoted: m})
let ctf = `*DATA AKUN SERVER PANNEL ANDA *
=====================================================
 Username : ${user.username}
 Password : ${password.toString()}
 Login : ${domain}
 Gc Bot: ${sgc}

 NOTE: ADMIN HANYA MENGIRIM 1X AJA, MOHON DI SIMPAN BAIK BAIK, CLAIM GARANSI?? SS BUKTI TF + CHAT 
========================================================`
makima.sendMessage(u, {text: `${ctf}`}, {quoted:null})
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = `*SERVER TELAH DI BUAT*

ID USER : ${user.id}
ID SERVER : ${server.id}
RAM : ${memo}
DISK : ${disk}
CPU ${cpu}

*USR & PASSWORD TELAH DI KIRIM KE*
*PRIVATE MESSAGE ! SILAHKAN DI CEK*`
await conn.sendMessage(m.chat, {text: p, edit: key},{quoted: m})
}
break
case "7gb": {
if (!jangan) return m.reply("Harus Di Group Bg Terus Di .addgc Agar Kamu Bisa Akses Fitur Ini")
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
 ${usedPrefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "8200"
let cpu = "200"
let disk = "8200'"
let email = username + "@gmail.com"
if (!u) return
let d = (await makima.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})  
let { key } = await makima.sendMessage(m.chat, {text: '* SEDANG MEMBUAT SERVER...*'},{quoted: m})
let ctf = `*DATA AKUN SERVER PANNEL ANDA *
=====================================================
 Username : ${user.username}
 Password : ${password.toString()}
 Login : ${domain}
 Gc Bot: ${sgc}

 NOTE: ADMIN HANYA MENGIRIM 1X AJA, MOHON DI SIMPAN BAIK BAIK, CLAIM GARANSI?? SS BUKTI TF + CHAT 
========================================================`
makima.sendMessage(u, {text: `${ctf}`}, {quoted:null})
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = `*SERVER TELAH DI BUAT*

ID USER : ${user.id}
ID SERVER : ${server.id}
RAM : ${memo}
DISK : ${disk}
CPU ${cpu}

*USR & PASSWORD TELAH DI KIRIM KE*
*PRIVATE MESSAGE ! SILAHKAN DI CEK*`
await conn.sendMessage(m.chat, {text: p, edit: key},{quoted: m})
}
break
case "unli": {
if (!jangan) return m.reply("Harus Di Group Bg Terus Di .addgc Agar Kamu Bisa Akses Fitur Ini")
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
 ${usedPrefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "0"
let cpu = "0"
let disk = "0"
let email = username + "@gmail.com"
if (!u) return
let d = (await makima.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})  
let { key } = await makima.sendMessage(m.chat, {text: '* SEDANG MEMBUAT SERVER...*'},{quoted: m})
let ctf = `*DATA AKUN SERVER PANNEL ANDA *
=====================================================
 Username : ${user.username}
 Password : ${password.toString()}
 Login : ${domain}
 Gc Bot: ${sgc}

 NOTE: ADMIN HANYA MENGIRIM 1X AJA, MOHON DI SIMPAN BAIK BAIK, CLAIM GARANSI?? SS BUKTI TF + CHAT 
========================================================`
makima.sendMessage(u, {text: `${ctf}`}, {quoted:null})
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = `*SERVER TELAH DI BUAT*

ID USER : ${user.id}
ID SERVER : ${server.id}
RAM : UNLIMITED 
DISK : UNLIMITED 
CPU UNLIMITED 

*USR & PASSWORD TELAH DI KIRIM KE*
*PRIVATE MESSAGE ! SILAHKAN DI CEK*`
await conn.sendMessage(m.chat, {text: p, edit: key},{quoted: m})
}
break
case "delusr": {

if (!jangan) return m.reply("Harus Di Group Bg Terus Di .addgc Agar Kamu Bisa Akses Fitur Ini")
let usr = args[0]
if (!usr) return m.reply('Id User nya mana?')
let f = await fetch(domain + "/api/application/users/" + usr, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res = f.ok ? {
errors: null
} : await f.json()
if (res.errors) return m.reply('*GADA*')
m.reply('*SUKSES HAPUS USER*')
}
break
case "delsrv": {
if (!jangan) return m.reply("Harus Di Group Bg Terus Di .addgc Agar Kamu Bisa Akses Fitur Ini")

let srv = args[0]
if (!srv) return m.reply('Id Server nya mana?')
let f = await fetch(domain + "/api/application/servers/" + srv, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
}
})
let res = f.ok ? {
errors: null
} : await f.json()
if (res.errors) return m.reply('*GADA*')
m.reply('*SUKSES HAPUS SERVER*')
}
break
case "listusr": {
  if (!isOwner) return m.reply("Khusus Owner")
  let page = args[0] ? args[0] : '1';
  let f = await fetch(domain + "/api/application/users?page=" + page, {
    "method": "GET",
    "headers": {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apikey
    }
  });
  let res = await f.json();
  let users = res.data;
  let messageText = "Berikut list user:\n\n";
  
  for (let user of users) {
    let u = user.attributes;
    messageText += `ID: ${u.id} - Status: ${u.attributes?.user?.server_limit === null ? 'Inactive' : 'Active'}\n`;
    messageText += `${u.username}\n`;
    messageText += `${u.first_name} ${u.last_name}\n\n`;
  }
  
  messageText += `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
  messageText += `Total Users: ${res.meta.pagination.count}`;
  
  await makima.sendMessage(m.chat, { text: messageText }, { quoted: m });
  
  if (res.meta.pagination.current_page < res.meta.pagination.total_pages) {
    m.reply(`Gunakan perintah ${prefix}listusr ${res.meta.pagination.current_page + 1} untuk melihat halaman selanjutnya.`);
  }
}
break;
case "crateadmin": {
let s = args.split(',')
let email = s[0];
let username = s[0]
let nomor = s[1]
if (s.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
if (!username) return m.reply(`Ex : ${prefix+command} Username,@tag/nomor\n\nContoh :\n${prefix+command} example,@user`)
if (!nomor) return m.reply(`Ex : ${prefix+command} Username,@tag/nomor\n\nContoh :\n${prefix+command} example,@user`)
let password = username + "019"
let nomornya = nomor.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": username + "@gmail.com",
"username": username,
"first_name": username,
"last_name": "Memb",
"language": "en",
 "root_admin" : true,  
"password": password.toString()
})

})

let data = await f.json();

if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));

let user = data.attributes

let tks = `
TYPE: user

ID: ${user.id}
UUID: ${user.uuid}
USERNAME: ${user.username}
EMAIL: ${user.email}
NAME: ${user.first_name} ${user.last_name}
LANGUAGE: ${user.language}
ADMIN: ${user.root_admin}
CREATED AT: ${user.created_at}

LOGIN: ${domain}
`
    const listMessage = {

        text: tks,

    }

	

    await makima.sendMessage(m.chat, listMessage)

    await makima.sendMessage(nomornya, {

        text: `*BERIKUT DETAIL AKUN ADMIN  PANEL ANDA*\n

USERNAME :  ${username}
PASSWORD: ${password}
LOGIN: ${domain}


*NOTE : OWNER HANYA MENGIRIM 1X DATA AKUN ANDA MOHON DI SIMPAN BAIK BAIK KALAU DATA AKUN ANDA HILANG OWNER TIDAK DAPAT MENGIRIM AKUN ANDA LAGI*


`,

    })

} 
        break
        case "listadmin": {
  if (!isOwner) return m.reply(`Maaf, Anda tidak dapat melihat daftar pengguna.`);
  let page = args[0] ? args[0] : '1';
  let f = await fetch(domain + "/api/application/users?page=" + page, {
    "method": "GET",
    "headers": {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apikey
    }
  });
  let res = await f.json();
  let users = res.data;
  let messageText = "Berikut list admin:\n\n";

  for (let user of users) {
    let u = user.attributes;
    if (u.root_admin) {
      messageText += `ID: ${u.id} - Status: ${u.attributes?.user?.server_limit === null ? 'Inactive' : 'Active'}\n`;
      messageText += `${u.username}\n`;
      messageText += `${u.first_name} ${u.last_name}\n\n`;
    }
  }

  messageText += `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
  messageText += `Total Admin: ${res.meta.pagination.count}`;

  await makima.sendMessage(m.chat, { text: messageText }, { quoted: m });

  if (res.meta.pagination.current_page < res.meta.pagination.total_pages) {
    m.reply(`Gunakan perintah ${prefix}listusr ${res.meta.pagination.current_page + 1} untuk melihat halaman selanjutnya.`);
  }
}
break;
                case "adminpanel": {

if (!isOwner) return m.reply(`Maaf Command Tersebut Khusus Developer Bot WhatsApp`)
let t = text.split(',');
if (t.length < 3) return m.reply(`* Format salah!*
Penggunaan:
${prefix + command} email,username,name,number/tag`);
let email = t[0];
let username = t[1];
let name = t[2];
let u = m.quoted ? m.quoted.sender : t[3] ? t[3].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
if (!u) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} email,username,name,number/tag`);
let d = (await conn.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": name,
"last_name": "Memb",
"language": "en",
"root_admin" : true,  
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let p = await conn.sendMessage(m.chat, { text: `
*SUCCESSFULLY ADD USER ADMIN*

 * USER INFO *
  *ID* : ${user.id}
  *USERNAME* : ${user.username}
  *EMAIL* : ${user.email}
  *NAME* : ${user.first_name} ${user.last_name}
 *PASSWORD BERHASIL DI KIRIM KE @${u.split`@`[0]}*`, mentions:[u],
})
conn.sendMessage(u, { text: `*BERIKUT DETAIL AKUN ADMIN PANEL ANDA*\n
 * USER INFO *
  *EMAIL* : ${email}
  *USERNAME* : ${username}
  *PASSWORD* : ${password.toString()}
  *LOGIN* : ${domain}
`,
})
}
break
  }
}
handler.command = handler.help = ['sh','ramlist','addgc','delgc','1gb','2gb','3gb','4gb','5gb','6gb','7gb','8gb','unli','delusr','delsrv','listusr','crateadmin','listadmin','adminpanel']
handler.tags = ['reseller']
module.exports = handler;