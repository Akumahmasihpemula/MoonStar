const delay = time => new Promise(res => setTimeout(res, time));
let handler = m => m;
handler.all = async function (m) {
    if (!m.chat.endsWith('@s.whatsapp.net')) return !0;
    this.menfess = this.menfess ? this.menfess : {};
    let mf = Object.values(this.menfess).find(v => v.status === false && v.penerima == m.sender);
    if (!mf) return !0;
    console.log({ text: m.text });
    if ((m.text === 'BALAS PESAN' || m.text === '') && m.quoted.mtype == 'buttonMessage') return m.reply("Silahkan Ketik Pesan Balasan Mu");
    
    let txt = `Hai kak @${mf.dari.split('@')[0]}, Kamu Menerima Pesan Balasan\n\nPesan Kamu: \n${mf.pesan}\n\nPesan Balasannya: \n${m.text}\n`.trim();
    
    // Menambahkan gambar ke dalam balasan
    let imageUrl = 'https://i.pinimg.com/originals/a0/bf/f5/a0bff5bb044182d50627e380db918349.jpg';
    await this.reply(mf.dari, { text: txt, image: { url: imageUrl } }).then(() => {
        m.reply('Berhasil mengirim balasan!');
        delay(2000);
        delete this.menfess[mf.id];
        return !0;
    });
    return !0;
}
module.exports = handler;