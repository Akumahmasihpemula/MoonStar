global.APIs = {
    lol: 'https://api.lolhuman.xyz',
    loli: 'https://www.loliapi.com',
};

global.APIKeys = {
    'https://api.lolhuman.xyz': 'GataDiosV3'
};

let fs = require('fs')
let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'api.js'"))
  delete require.cache[file]
  require(file)
})