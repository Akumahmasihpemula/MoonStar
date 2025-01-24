const moment = require('moment-timezone');

/*============= WAKTU =============*/
let wibh = moment.tz('Asia/Jakarta').format('HH');
let wibm = moment.tz('Asia/Jakarta').format('mm');
let wibs = moment.tz('Asia/Jakarta').format('ss');
let wktuwib = `\`${wibh} : ${wibm} : ${wibs}\``;

let locale = 'id'    
let d = new Date(new Date + 3600000)
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let date = d.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
});

global.owner = ['6285283806261', 'Moon'];
global.mods = [];
global.prems = [];

//   ═════〘 INFO Sosial 〙═════   //
global.sig = 'https://instagram.com/hayangmodol.pptx';
global.sgh = 'https://github.com/Akumahmasihpemula';
global.sgc = 'https://g.co/kgs/DzbfdnU';
global.syt = "https://g.co/kgs/DzbfdnU";

//   ═════〘 INFO BOT 〙═════   //
global.namebot = "Moon Md";
global.nameown = "Mas Moon";
global.nomorown = "6285283806261";
global.nomorbot = "62 83194968200";
global.versi = "v 2.4.8";
global.sesi = "sesion";


//   ═════〘 INFO WM BOT 〙═════   //
global.packname = "「 𝑴𝒐𝒐𝒏 𝑿 𝑴𝒆𝒅𝒊𝒂𝑨𝒊 」";
global.wm = "Cʀᴇᴀᴛᴇᴅ Bʏ COPAS DOT COM";
global.author = "𝑴𝒐𝒐𝒏 𝑿 𝑴𝒆𝒅𝒊𝒂𝑨𝒊";
global.botdate = `${week} ${date}`;
global.bottime = `${wktuwib}`;
global.day = `${week}`;

//   ═════〘 INFO AWAIT 〙═════   //
global.wait = "「 ʟ ᴏ ᴀ ᴅ ɪ ɴ ɢ........... 」\n> SEDANG MENJALANKAN PERINTAH";
global.eror = "Fitur ini sedang dalam perbaikan. Kami akan segera mengembalikannya ke keadaan normal. Terima kasih atas pengertiannya.";
global.done = `\`Senpai desu, data wa seikou ni te ni irimashita!\`

☐ HARI: ${week}
☐ DISELESAIKAN: ${new Date().toLocaleDateString()}`;
//   ═════〘 INFO STICKER 〙═════   //
global.stickpack = '〔𝑴𝒐𝒐𝒏 > sticker〕';
global.stickauth = `「•>」`;
global.multiplier = 3;

//   ═════〘 INFO SALURAN 〙═════   //
global.namekom = "-";
global.idkom = "-";

global.rpg = {
  emoticon(string) {
    string = string.toLowerCase()
    let emot = {
      level: '🧬',
      limit: '🌌',
      health: '❤️',
      exp: '✉️',
      money: '💵',
      potion: '🥤',
      diamond: '💎',
      common: '📦',
      uncommon: '🎁',
      mythic: '🗳️',
      legendary: '🗃️',
      pet: '🎁',
      trash: '🗑',
      armor: '🥼',
      sword: '⚔️',
      wood: '🪵',
      rock: '🪨',
      string: '🕸️',
      horse: '🐎',
      cat: '🐈',
      dog: '🐕',
      fox: '🦊',
      petFood: '🍖',
      iron: '⛓️',
      gold: '👑',
      emerald: '💚'
    }
    let results = Object.keys(emot).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
    if (!results.length) return ''
    else return emot[results[0][0]]
  }
}

let fs = require('fs')
let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})