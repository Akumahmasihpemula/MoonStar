module.exports = {
    async all(m) {
        if (!m.isGroup) return 
        let chats = global.db.data.chats[m.chat]
        if (!chats.expired) return !0
        if (+new Date() > chats.expired) {
        	const data = global.owner.filter(([id, isCreator]) => id && isCreator)
            await m.reply(`[ WAKTU EXPIRED ]\n> waktu seea telah habis terimakasih sudah menyewakan ${namebot} yah kak *${this.user.name}* saya sudah tidak di permukaan maka sayabakan out byee`)
            await this.delay(10000) 
            await this.groupLeave(m.chat)
        }
    }
}

