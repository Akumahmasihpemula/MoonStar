const { DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, jidNormalizedUser  } = require('@adiwajshing/baileys');
const qrcode = require('qrcode');
const fs = require('fs');
const pino = require('pino');
const crypto = require('crypto');
const NodeCache = require('node-cache');
const { makeWASocket } = require('../lib/simple.js');

if (!Array.isArray(global.conns)) {
  global.conns = [];
}

let handler = async (m, { conn: yoruka, args, usedPrefix, command }) => {
  m.reply(wait);
  
  async function serbot() {
    let serbotFolder = crypto.randomBytes(10).toString('hex').slice(0, 8);
    let folderSub = `./lib/jadibot-qr/${serbotFolder}`;
    
    if (!fs.existsSync(folderSub)) {
      fs.mkdirSync(folderSub, { recursive: true });
    }
    
    if (args[0]) {
      fs.writeFileSync(`${folderSub}/creds.json`, Buffer.from(args[0], 'base64').toString('utf-8'));
    }

    const { state, saveCreds } = await useMultiFileAuthState(folderSub);
    const msgRetryCounterCache = new NodeCache();
    const { version } = await fetchLatestBaileysVersion();

    const connectionOptions = {
      logger: pino({ level: 'silent' }),
      printQRInTerminal: true,
      browser: ['YORUKA-CLONE', 'Safari', '2.0.0'],
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
      },
      markOnlineOnConnect: true,
      generateHighQualityLinkPreview: true,
      getMessage: async (clave) => {
        let jid = jidNormalizedUser (clave.remoteJid);
        let msg = await store.loadMessage(jid, clave.id);
        return msg?.message || "";
      },
      msgRetryCounterCache,
      version
    };

    let conn = makeWASocket(connectionOptions);
    conn.isInit = false;
    let isInit = true;

    async function connectionUpdate(update) {
      const { connection, lastDisconnect, isNewLogin, qr } = update;
      if (isNewLogin) {
        conn.isInit = true;
      }
      if (qr) {
        let lop  = ` ✘ ᴊ ᴀ ᴅ ɪ ʙ ᴏ ᴛ || V2-QR\n\n`;
        lop += `*Langkah-langkah untuk memindai:*\n`;
        lop += `*1.- Ketuk tiga titik di sudut kanan atas di beranda WhatsApp Anda*\n`;
        lop += `*2.- Ketuk WhatsApp web atau perangkat yang sudah terhubung*\n`;
        lop += `*3.- Pindai kode QR ini*\n`;
        lop += `*Kode QR berlaku selama 60 detik!!*\n`;
        await yoruka.sendFile(m.chat, await qrcode.toDataURL(qr, { scale: 8 }), "qrcode.png", lop, null);
      }
      const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
      if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
        let i = global.conns.indexOf(conn);
        if (i < 0) {
          return console.log(await creloadHandler(true).catch(console.error));
        }
        delete global.conns[i];
        global.conns.splice(i, 1);
        if (code !== DisconnectReason.connectionClosed) {
          await yoruka.reply(conn.user.jid, "Koneksi terputus.. kirim pesan yang dikirimkan ke nomor tempat saya memindai kode QR", null);
        }
      }
      if (global.db.data == null) {
        loadDatabase();
      }
      if (connection == "open") {
        conn.isInit = true;
        global.conns.push(conn);
                await yoruka.reply(m.chat, args[0] ? 'Berhasil terhubung' : 'Berhasil terhubung ke WhatsApp\n\n*Catatan:* Ini bersifat sementara\nJika Bot utama dimulai ulang atau dinonaktifkan, semua subbot juga akan dinonaktifkan.\n\nAnda dapat masuk tanpa kode QR dengan pesan berikut, kirimkan bila bot tidak berfungsi...\n\nNomor bot mungkin berubah, simpan tautan ini:\nhttps://chat.whatsapp.com/GuUZnMCE9wf3BSkw1nmFD1', null);
        await sleep(5000);
        if (args[0]) {
          return;
        }
        await yoruka.reply(conn.user.jid, "Saat berikutnya Anda terhubung, kirim pesan berikut untuk masuk tanpa memindai kode *QR* lainnya.", null);
        await yoruka.reply(conn.user.jid, usedPrefix + command + " " + Buffer.from(fs.readFileSync(`${folderSub}/creds.json`), 'utf-8').toString('base64'), null);
      }
    }

    setInterval(async () => {
      if (!conn.user) {
        try {
          conn.ws.close();
        } catch {}
        conn.ev.removeAllListeners();
        let i = global.conns.indexOf(conn);
        if (i < 0) {
          return;
        }
        delete global.conns[i];
        global.conns.splice(i, 1);
      }
    }, 60000);

    let handler = await require("../handler.js");

    let creloadHandler = async function (restatConn) {
      try {
        const Handler = await require(`../handler.js?update=${Date.now()}`).catch(console.error);
        if (Object.keys(Handler || {}).length) {
          handler = Handler;
        }
      } catch (e) {
        console.error(e);
      }
      if (restatConn) {
        try {
          conn.ws.close();
        } catch {}
        conn.ev.removeAllListeners();
        conn = makeWASocket(connectionOptions);
        isInit = true;
      }
      if (!isInit) {
        conn.ev.off("messages.upsert", conn.handler);
        conn.ev.off("connection.update", conn.connectionUpdate);
        conn.ev.off('creds.update', conn.credsUpdate);
      }
      conn.handler = handler.handler.bind(conn);
      conn.connectionUpdate = connectionUpdate.bind(conn);
      conn.credsUpdate = saveCreds.bind(conn, true);

      conn.ev.on("messages.upsert", conn.handler);
      conn.ev.on("connection.update", conn.connectionUpdate);
      conn.ev.on("creds.update", conn.credsUpdate);
      isInit = false;
      return true;
    };
    creloadHandler(false);
  }
  serbot();
};
handler.help = ["jadibotv2"].map((a) => a + " *[CLONE YORUKA-QR]*");
handler.tags = ["jadibot"];
handler.command = ['jadibotv2'];
handler.premium = true;

module.exports = handler;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}