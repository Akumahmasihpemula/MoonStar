const { S_WHATSAPP_NET } = require('@adiwajshing/baileys');
const Jimp = require('jimp');

let handler = async (m, { conn }) => {
   try {
    var image = m.quoted ? m.quoted : m
    var mime = (image.msg || image).mimetype || ''
    var media = await image.download()
    const group = m.chat;
    var { img } = await generateProfilePicture(media);
    await conn.query({
        tag: 'iq',
        attrs: {
            target: group,
            to: S_WHATSAPP_NET,
            type: 'set',
            xmlns: 'w:profile:picture'
        },
        content: [
            {
                tag: 'picture',
                attrs: { type: 'image' },
                content: img
            }
        ]
    });
    m.reply(`*[UPLOAD IMAGE]*\n> sukses mengubah foto dari group :${await conn.getName(m.chat)}`)
   } catch (e) {
   await m.reply('*[ERROR]* Reply gambar untuk mengganti profile group!')
  }
};

handler.help = ['setppgc']
handler.tags = ['group']
handler.command = /^(setppgc|setppgrup|setppgroup)$/i

handler.group = true
handler.admin = true
handler.botAdmin = true
module.exports = handler

async function generateProfilePicture(buffer) {
    const jimp_1 = await Jimp.read(buffer);
    const minz = jimp_1.getWidth() > jimp_1.getHeight() ? jimp_1.resize(720, Jimp.AUTO) : jimp_1.resize(Jimp.AUTO, 720);
    const jimp_2 = await Jimp.read(await minz.getBufferAsync(Jimp.MIME_JPEG));
    return {
        img: await minz.getBufferAsync(Jimp.MIME_JPEG)
    };
}