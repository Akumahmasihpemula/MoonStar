//   ═════〘 INFO CPANEL 〙═════   //
global.domain = "_isi domain mu bre";
global.apikey = "ptla_dari domain mu yak";

let fs = require('fs')
let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'api.js'"))
  delete require.cache[file]
  require(file)
})