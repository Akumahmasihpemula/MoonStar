(async () => {
  require("./system/api");
  require("./system/rom_cpanel");
  require("./system/setting");  
  const {
    useMultiFileAuthState,
    DisconnectReason,
    generateForwardMessageContent,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    generateMessageID,
    downloadContentFromMessage,
    makeInMemoryStore,
    jidDecode,
    S_WHATSAPP_NET,
    fetchLatestBaileysVersion,
    proto
  } = require("@adiwajshing/baileys");
  
  const pino = require("pino");
  const WebSocket = require("ws");
  const path = require("path");
  const fs = require("fs");
  const os = require("os");
  const yargs = require("yargs/yargs");
  const childProcess = require("child_process");
  const lodash = require("lodash");
  const syntaxError = require("syntax-error");
  const fetch = require("node-fetch");
  const chalk = require("chalk");
  
  let simple = require("./lib/simple");
  let lowdb;
  
  try {
    lowdb = require("lowdb");
  } catch (error) {
    lowdb = require("./lib/lowdb");
  }
  
  const { Low, JSONFile } = lowdb;
  const mongoDB = require("./lib/mongoDB");
  const readline = require("readline");
  
  const isCodeOrPairing = process.argv.includes("--code") || process.argv.includes("--pairing");
  const isMobile = process.argv.includes("--mobile");
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  const askQuestion = (question) => new Promise(resolve => rl.question(question, resolve));
  
  global.API = (apiName, endpoint = "/", params = {}, apiKey) => {
    return (apiName in global.APIs ? global.APIs[apiName] : apiName) + endpoint + (params || apiKey ? "?" + new URLSearchParams(Object.entries({
      ...params,
      ...(apiKey ? { [apiKey]: global.APIKeys[apiName in global.APIs ? global.APIs[apiName] : apiName] } : {})
    })) : "");
  };
  
  global.timestamp = {
    start: new Date()
  };
  
  const PORT = process.env.PORT || 3000;
  global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
  global.prefix = new RegExp("^[" + (opts.prefix || "‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-").replace(/[|\\{}()[\]^$+*?.\-\^]/g, "\\$&") + "]");
  
  global.db = new Low(
    /https?:\/\//.test(opts.db || "") ? new cloudDBAdapter(opts.db) : 
    /mongodb/.test(opts.db) ? new mongoDB(opts.db) : 
    new JSONFile((opts._[0] ? opts._[0] + "_" : "") + "database.json")
  );
  
  global.DATABASE = global.db;
  
  global.loadDatabase = async function loadDatabase() {
    if (global.db.READ) {
      return new Promise(resolve => setInterval(function () {
        if (!global.db.READ) {
          clearInterval(this);
          resolve(global.db.data == null ? loadDatabase() : global.db.data);
        }
      }, 1000));
    }
    
    if (global.db.data !== null) {
      return;
    }
    
    global.db.READ = true;
    await global.db.read();
    global.db.READ = false;
    
    global.db.data = {
      users: {},
      chats: {},
      stats: {},
      msgs: {},
      sticker: {},
      ...(global.db.data || {})
    };
    
    global.db.chain = lodash.chain(global.db.data);
  };
  
  loadDatabase();
  
  const sessionPath = "" + (opts._[0] || `${sesi}`);
  global.isInit = !fs.existsSync(sessionPath);
  
  const { state, saveState, saveCreds } = await useMultiFileAuthState(sessionPath);
  const { version, isLatest } = await fetchLatestBaileysVersion();
  
  console.log(chalk.magenta("-- using WA v" + version.join(".") + ", isLatest: " + isLatest + " --"));
  
  const waSocketOptions = {
    printQRInTerminal: !isCodeOrPairing,
    syncFullHistory: true,
    markOnlineOnConnect: true,
    connectTimeoutMs: 60000,
    defaultQueryTimeoutMs: 0,
    keepAliveIntervalMs: 10000,
    generateHighQualityLinkPreview: true,
        patchMessageBeforeSending: (message) => {
      const hasButtonsMessage = !!message.buttonsMessage || !!message.templateMessage || !!message.listMessage;
      if (hasButtonsMessage) {
        message = {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadataVersion: 2,
                deviceListMetadata: {}
              },
              ...message
            }
          }
        };
      }
      return message;
    },
    auth: state,
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    logger: pino({ level: "silent" }),
    version: (await (await fetch("https://raw.githubusercontent.com/WhiskeySockets/Baileys/master/src/Defaults/baileys-version.json")).json()).version
  };
  
  global.conn = simple.makeWASocket(waSocketOptions);
  
  if (!opts.test) {
    if (global.db) {
      setInterval(async () => {
        if (global.db.data) {
          await global.db.write();
        }
        if (!opts.tmp && (global.support || {}).find) {
          const tmpDirs = [os.tmpdir(), "tmp"];
          tmpDirs.forEach(dir => childProcess.spawn("find", [dir, "-amin", "3", "-type", "f", "-delete"]));
        }
      }, 30000);
    }
  }
  
  async function connectionUpdateHandler(update) {
    const { connection, lastDisconnect } = update;
    global.timestamp.connect = new Date();
    
    if (lastDisconnect && lastDisconnect.error && lastDisconnect.error.output && lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut && conn.ws.readyState !== WebSocket.CONNECTING) {
      console.log(global.reloadHandler(true));
    }
    
    if (global.db.data == null) {
      await loadDatabase();
    }
  }
 if ((isCodeOrPairing || isMobile) && fs.existsSync(`./${sesi}/creds.json`) && !conn.authState.creds.registered) {
  console.log(chalk.yellow(`-[ TERDETEKSI SESION ]\n> senpai hapus creds.json di ${sesi} agar dapat membuat pairing baru`));
  process.exit(0);
}

if (isCodeOrPairing && !conn.authState.creds.registered) {
  if (isMobile) {
    throw new Error("gagal membuat code pairing api eror");
  }

  let phoneNumber = "";

  if (!S_WHATSAPP_NET) {
    console.error(chalk.red("tidak di temukan S_WHATSAPP_NET undefined perbaiki"));
    process.exit(1);
  }

  do {
    phoneNumber = await askQuestion(chalk.blueBright("[ TUTORIAL PENGGUNAAN ]\n> senpai masukan nomor telpon kamu yang mau di jadikan bot whatsapp contoh: 62857xxx\n"));
    phoneNumber = phoneNumber.replace(/\D/g, ""); // Remove non-digit characters
  } while (!phoneNumber || !Object.keys(S_WHATSAPP_NET).some(code => phoneNumber.startsWith(code)));

  rl.close();
  console.log(chalk.bgWhite(chalk.blue("[ MEMPROSES ]\n> wait.... sedang menjalankan printah tunggu sebentar sedang membuat code pairing ⚠︎")));

  setTimeout(async () => {
    try {
      let pairingCode = await conn.requestPairingCode(phoneNumber);
      pairingCode = pairingCode?.match(/.{1,4}/g)?.join("-") || pairingCode;
      console.log(chalk.black(chalk.bgGreen("[ CODE PAIRING ]\n> your code: ")), chalk.black(chalk.white(pairingCode)));
    } catch (error) {
      console.error(chalk.red("[ GAGAL MEMBUAT ]\n> pairing code tidak di buat eror coba lagi atau hapus session terlebih dahulu"), error.message);
    }
  }, 3000);
}
  process.on("uncaughtException", console.error);
  
  const requireAndReload = (modulePath) => {
    modulePath = require.resolve(modulePath);
    let module;
    let attempts = 0;
    
    do {
      if (modulePath in require.cache) {
        delete require.cache[modulePath];
      }
      module = require(modulePath);
      attempts++;
    } while ((!module || Array.isArray(module) || module instanceof String ? !(module || []).length : typeof module === "object" && !Buffer.isBuffer(module) ? !Object.keys(module || {}).length : true) && attempts <= 10);
    
    return module;
  };
  
  let isFirstReload = true;
  
  global.reloadHandler = function (forceReload) {
    let handlerModule = requireAndReload("./handler");
    
    if (forceReload) {
      try {
        global.conn.ws.close();
      } catch {}
      global.conn = {
        ...global.conn,
        ...simple.makeWASocket(waSocketOptions)
      };
    }
    
    if (!isFirstReload) {
      conn.ev.off("messages.upsert", conn.handler);
      conn.ev.off("group-participants.update", conn.participantsUpdate);
      conn.ev.off("message.delete", conn.onDelete);
      conn.ev.off("connection.update", conn.connectionUpdate);
      conn.ev.off("creds.update", conn.credsUpdate);
    }
    
    conn.welcome = `[ 🅆 🄴 🄻 🄲 🄾 🄼 🄴 ]

ᴍᴇᴍʙᴇʀ: \`@user\`
ɢʀᴏᴜᴘ: \`@subject\`
ᴊᴏɪɴ: \`${new Date().toLocaleDateString()}\`

❑ ᴅᴇsᴄʀɪᴘᴛɪᴏɴ
@desc`
        conn.bye = `[ 🄶 🄾 🄾 🄳 🄱 🅈 🄴 ]

ᴍᴇᴍʙᴇʀ: \`@user\`
ᴏᴜᴛ: \`${new Date().toLocaleDateString()}\`

hari ini berduka atas kepergian dia semoga dia bahagia di alam sana :(`
    conn.promote = "[ PROMOTE MEMBER ]\n> selamat yah kak @user sekarang kamu telah menjadi admin group ini ⚠︎";
    conn.demote = "[ DEMOTE MEMBER ]\n> SEPERTINYA KAK @user MELANGGAR PERATURAN DAN KAMU DI BERHENTIKAN OLEH ADMIN LAIN";
   conn.sDesc = 'Deskripsi Telah Diubah Ke \n@desc'
  conn.sSubject = 'Nama Grup Telah Diubah Ke \n@subject'
  conn.sIcon = 'Foto Grup Telah Diubah!'
  conn.sRevoke = 'Link Group Telah Diubah Ke \n@revoke'
  conn.sAnnounceOn = 'Group telah di tutup!\nsekarang hanya admin yang dapat mengirim pesan.'
  conn.sAnnounceOff = 'Group telah di buka!\nsekarang semua peserta dapat mengirim pesan.'
  conn.sRestrictOn = 'Edit Info Grup di ubah ke hanya admin!'
  conn.sRestrictOff = 'Edit Info Grup di ubah ke semua peserta!'
    conn.handler = handlerModule.handler.bind(conn);
    conn.participantsUpdate = handlerModule.participantsUpdate.bind(conn);
    conn.onDelete = handlerModule.delete.bind(conn);
    conn.connectionUpdate = connectionUpdateHandler.bind(conn);
    conn.credsUpdate = saveCreds.bind(conn);
    
    conn.ev.on("messages.upsert", conn.handler);
    conn.ev.on("group-participants.update", conn.participantsUpdate);
    conn.ev.on("message.delete", conn.onDelete);
    conn.ev.on("connection.update", conn.connectionUpdate);
    conn.ev.on("creds.update", conn.credsUpdate);
    
    isFirstReload = false;
    return true;
  };
  
  const pluginsDir = path.join(__dirname, "plugins");
  const isJavaScriptFile = (fileName) => /\.js$/.test(fileName);
  
  global.plugins = {};
  
  for (let pluginFile of fs.readdirSync(pluginsDir).filter(isJavaScriptFile)) {
    try {
      global.plugins[pluginFile] = require(path.join(pluginsDir, pluginFile));
    } catch (error) {
      conn.logger.error(error);
      delete global.plugins[pluginFile];
    }
  }
  
  console.log(Object.keys(global.plugins));
  
  global.reload = (modulePath, fileName) => {
    if (isJavaScriptFile(fileName)) {
      let fullPath = path.join(pluginsDir, fileName);
      
      if (fullPath in require.cache) {
        delete require.cache[fullPath];
        if (fs.existsSync(fullPath)) {
          conn.logger.info("Re-requiring plugin '" + fileName + "'");
        } else {
          conn.logger.warn("Deleted plugin '" + fileName + "'");
          return delete global.plugins[fileName];
        }
      } else {
        conn.logger.info("Requiring new plugin '" + fileName + "'");
      }
      
      let error = syntaxError(fs.readFileSync(fullPath), fileName);
      if (error) {
        conn.logger.error("Syntax error while loading '" + fileName + "'\n" + error);
      } else {
        try {
          global.plugins[fileName] = require(fullPath);
        } catch (error) {
          conn.logger.error(error);
        } finally {
          global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([_a], [_b]) => _a.localeCompare(_b)));
        }
      }
    }
  };
  
  Object.freeze(global.reload);
  
  fs.watch(path.join(__dirname, "plugins"), global.reload);
  
  global.reloadHandler();
  
  async function checkDependencies() {
    let results = await Promise.all([
      childProcess.spawn("ffmpeg"),
      childProcess.spawn("ffprobe"),
      childProcess.spawn("ffmpeg", ["-hide_banner", "-loglevel", "error", "-filter_complex", "color", "-frames:v", "1", "-f", "webp", "-"]),
      childProcess.spawn("convert"),
      childProcess.spawn("magick"),
      childProcess.spawn("gm"),
      childProcess.spawn("find", ["--version"])
    ].map(proc => {
      return Promise.race([
        new Promise(resolve => {
          proc.on("close", exitCode => {
            resolve(exitCode !== 127);
          });
        }),
        new Promise(resolve => {
          proc.on("error", () => resolve(false));
        })
      ]);
    }));
    
    let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = results;
    console.log(results);
    
    let support = global.support = {
      ffmpeg,
      ffprobe,
      ffmpegWebp,
      convert,
      magick,
      gm,
      find
    };
    
    Object.freeze(global.support);
    
    if (!support.ffmpeg) {
      conn.logger.warn("Please install ffmpeg for sending videos (pkg install ffmpeg)");
    }
    if (support.ffmpeg && !support.ffmpegWebp) {
      conn.logger.warn("Stickers may not be animated without libwebp on ffmpeg (--enable-libwebp while compiling ffmpeg)");
    }
    if (!support.convert && !support.magick && !support.gm) {
      conn.logger.warn("Stickers may not work without imagemagick if libwebp on ffmpeg isn't installed (pkg install imagemagick)");
    }
  }
  
  checkDependencies().then(() => conn.logger.info("Quick Test Done")).catch(console.error);
})();
