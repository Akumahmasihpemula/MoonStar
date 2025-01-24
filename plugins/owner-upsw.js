const fetch = require("node-fetch");
const uploadImage = require('../lib/uploadImage.js');

const mimeAudio = 'audio/mpeg';
const mimeVideo = 'video/mp4';
const mimeImage = 'image/jpeg';

let handler = async (m, { conn, command, args }) => {
    let teks;
    let type;

    // Mengambil teks dari args tanpa memisahkan menggunakan '|'
    if (args.length >= 1) {
        teks = args.join(" ").trim();
    } else if (m.quoted && m.quoted.text) {
        teks = m.quoted.text;
    }

    // Jika tidak ada tipe yang ditentukan
    if (!type && m.quoted && m.quoted.mtype) {
        const mtype = m.quoted.mtype;
        if (mtype === 'audioMessage') {
            type = 'vn';
        } else if (mtype === 'videoMessage') {
            type = 'vid';
        } else if (mtype === 'imageMessage') {
            type = 'img';
        } else if (mtype === 'extendedTextMessage') {
            type = 'txt';
        } else {
            throw "❌ Media type tidak valid!";
        }
    }

    // Jika tipe tidak valid
    if (!type) {
        throw "Cara penggunaan upsw:\n\nContoh:\n" + command + " txt halo apa kabar\n" +
            command + " img\n" +
            command + " vid\n" +
            command + " vn";
    }

    const doc = {};
    let link;

    // Mengupload media berdasarkan tipe
    if (type === 'img') {
        link = await uploadImage(await m.quoted.download());
        doc.mimetype = mimeImage;
        doc.caption = teks;
        doc.image = { url: link };
    } else if (type === 'vid') {
        link = await uploadImage(await m.quoted.download());
        doc.mimetype = mimeVideo;
        doc.caption = teks;
        doc.video = { url: link };
    } else if (type === 'vn') {
        link = await uploadImage(await m.quoted.download());
        doc.mimetype = mimeAudio;
        doc.audio = { url: link } || await generateVoice("id-ID", "id-ID-ArdiNeural", teks);
    } else if (type === 'txt') {
        doc.text = teks;
    } else {
        throw "❌ Tipe tidak valid!";
    }

    // Mengirim pesan
    await conn.sendMessage('status@broadcast', doc, {
        backgroundColor: getRandomHexColor(),
        font: Math.floor(Math.random() * 9),
        statusJidList: Object.keys(global.db.data.users)
    }).then((res) => {
        conn.reply(m.chat, `Sukses upload ${type}`, res);
    }).catch(() => {
        conn.reply(m.chat, `Gagal upload ${type}`, m);
    });
};

handler.help = ['upsw'];
handler.tags = ['owner'];
handler.command = /^(upsw|postsw)$/i;
handler.limit = true;
handler.owner = true;

module.exports = handler;

async function generateVoice(Locale = "id-ID", Voice = "id-ID-ArdiNeural", Query) {
    const formData = new FormData();
    formData.append("locale", Locale);
    formData.append("content", `<voice name="${Voice}">${Query}</voice>`);
    formData.append("ip", '46.161.194.33');

    const response = await fetch('https://app.micmonster.com/restapi/create', {
        method: 'POST',
        body: formData
    });

    const responseText = await response.text();
    return Buffer.from(('data:audio/mpeg;base64,' + responseText).split(',')[1], 'base64');
}

function getRandomHexColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
}