let handler = async (m, { isBlocked }) => {
    if (isBlocked) return
    if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('Undangan untuk bergabung') || m.text.startsWith('Invitation to join') || m.text.startsWith('Buka tautan ini')) && !m.isBaileys && !m.isGroup) {
        let teks = `[ TERDETEKSI UNDANGAN GROUP ]\n> Gokenasai senpai, saya tidak bisa digunakan secara gratis. Jika kamu ingin menggunakan saya, kamu harus menyewa saya terlebih dahulu. Jika kamu ingin menyewa saya, kamu bisa menghubungi owner saya di hubungin owner di bawah ini atau bergabung dengan group saya di https://chat.whatsapp.com/GuUZnMCE9wf3BSkw1nmFD1. Terima kasih atas perhatiannya!`
        await m.reply(teks)
        let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;${nameown};;;\nFN:${nameown}\nORG:${nameown}\nTITLE:\nitem1.TEL;waid=${nomorown}:${nomorown}\nitem1.X-ABLabel:${nameown}\nX-WA-BIZ-DESCRIPTION: jangan lupa save bre\nX-WA-BIZ-NAME:${nameown}\nEND:VCARD`
        await conn.sendMessage(m.chat, {
            contacts: {
                displayName: wm,
                contacts: [{
                    vcard
                }]
            }
        })
    }
}

module.exports = handler