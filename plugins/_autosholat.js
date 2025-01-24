module.exports = {
  before: async function (m) {
    this.autosholat = this.autosholat || {}
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender
    let id = m.chat
    let jadwalSholat = {
      Subuh: "04:30", 
      Dzuhur: "11:30", 
      Ashar: "15:00", 
      Maghrib: "17:30", 
      Isya: "19:30"
    }

    let jadwalmakan = {
      pagi: "07:30", 
      siang: "11:20", 
      sore: "16:20", 
      malam: "20:10"
    }
    const date = new Date((new Date).toLocaleString("en-US", {
      timeZone: "Asia/Jakarta"
    }));
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    let isActive = Object.values(this.autosholat).includes(true);
    if (id in this.autosholat && isActive) {
      return false
    }

    for (const [sholat, waktu] of Object.entries(jadwalSholat)) {
      if (timeNow === waktu && !(id in this.autosholat)) {
        let caption = `Hai kak @${who.split`@`[0]},\nWaktu *${sholat}* telah tiba, ambilah air wudhu dan segeralah shalat.\n\n*${waktu}*\n_untuk wilayah Jakarta dan sekitarnya._`
        this.autosholat[id] = [
          this.reply(m.chat, caption, null, {
            contextInfo: {
              mentionedJid: [who]
            }
          }),
          setTimeout(() => {
            delete this.autosholat[id]
          }, 57000)
        ]
      }
    }

    for (const [makan, jammakn] of Object.entries(jadwalmakan)) {
      if (timeNow === jammakn && !(id in this.autosholat)) {
        let caption = `Hai kak ${m.name}, waktu makan *${makan}* segera ke dapur dan ambil lah nasi`
        this.autosholat[id] = [
          this.reply(m.chat, caption, null, {
            contextInfo: {
              mentionedJid: [who]
            }
          }),
          setTimeout(() => {
            delete this.autosholat[id]
          }, 57000)
        ]
      }
    }
  }
}