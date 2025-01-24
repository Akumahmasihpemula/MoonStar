console.log('🕔 MENJALANKAN SCRIPT...');
let { spawn } = require('child_process');
let path = require('path');
let fs = require('fs');
const CFonts = require('cfonts');

CFonts.say('WHATSAPP SIMPLE', {
  font: 'chrome',
  align: 'center',
  gradient: ['red', 'magenta']
});

CFonts.say(`yoruka kirihime`, {
  font: 'console',
  align: 'center',
  gradient: ['red', 'magenta']
});

var isRunning = false;
const dirPath = path.join(__dirname, './tmp');

const createDirectoryIfNotExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Direktori ${dirPath} telah dibuat.`);
  } else {
    console.log(`Direktori ${dirPath} sudah ada.`);
  }
};

createDirectoryIfNotExists(dirPath);

function start(file) {
  if (isRunning) return;
  isRunning = true;
  
  let args = [path.join(__dirname, file), ...process.argv.slice(2)];
  CFonts.say([process.argv[0], ...args].join(' '), {
    font: 'console',
    align: 'center',
    gradient: ['red', 'magenta']
  });

  let p = spawn(process.argv[0], args, {
    stdio: ['inherit', 'inherit', 'inherit', 'ipc']
  });

  p.on('message', data => {
    console.log('[✅ RECEIVED]', data);
    switch (data) {
      case 'reset':
        p.kill();
        isRunning = false;
        start(file);
        break;
      case 'uptime':
        p.send(process.uptime());
        break;
    }
  });

  p.on('exit', code => {
    isRunning = false;
    console.error('[❗] Exited with code:', code);
    if (code === 0) return;
    fs.watchFile(args[0], () => {
      fs.unwatchFile(args[0]);
      start(file);
    });
  });

  p.on('error', (err) => {
    console.error('[❗] Error starting process:', err);
    isRunning = false;
  });
}

start('main.js');