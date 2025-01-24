const fetch = require("node-fetch") 
const FormData = require("form-data") 

let handler = async (m, { conn }) => {
let q = m.quoted ? m.quoted : m;
let mime = (q.msg || q).mimetype || '';
if (!mime) throw 'Tidak ada media yang ditemukan';
m.react("🕐") 
let media = await q.download();
let isTele = /image\/(png|jpe?g|gif)|video\/mp4|audio\/mp3/.test(mime);
let url = await uploadcatbox(media);
let ukuran = (media.length / (1024 * 1024)).toFixed(2);
let max2 = `
UPLOAD BY CATBOX MOE
❐ link: ${url}
❑ size: ${ukuran} MB
${isTele ? '(Tidak Ada Tanggal Kedaluwarsa)' : '(link eror ituh jangan di gunain)'}
`;

conn.sendMessage(m.chat, {
text: max2, 
contextInfo: {
externalAdReply: {
title: "UPLOAD FILE",
thumbnailUrl: pp,
sourceUrl: url,
mediaType: 1,
showAdAttribution: true,
renderLargerThumbnail: true
}
}
});
};
handler.help = ['tourl'];
handler.tags = ['tools'];
handler.command = /^(tourl|upload)$/i;
handler.limit = 4;
handler.register = true;
module.exports = handler;

async function uploadcatbox(buffer) {
       const fileType = require('file-type');
       let { ext } = await fileType.fromBuffer(buffer);
       let bodyForm = new FormData();
       bodyForm.append("fileToUpload", buffer, "file." + ext);
       bodyForm.append("reqtype", "fileupload");
       
       let res = await fetch("https://catbox.moe/user/api.php", {
           method: "POST",
           body: bodyForm,
       });
       
       if (!res.ok) throw new Error('Error uploading file: ' + res.statusText); // Menangani kesalahan jika upload gagal
       
       let data = await res.text();
       return data;
   }