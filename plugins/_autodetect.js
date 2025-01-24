module.exports = {
    async handleGroupsUpdate(groupsUpdate, opts, conn) {  
        if (opts['self']) return;

        for (const ChatId of groupsUpdate) {
            const id = ChatId.id;
            if (!id) continue;
            let chats = global.db.data.chats[id];
            let text = '';
            if (!chats?.detect) continue;

            if (ChatId.desc) {
                text = (chats.sDesc || this.sDesc || conn.sDesc || '```Description has been changed to```\n@desc').replace('@desc', ChatId.desc);
            }

            if (ChatId.subject) {
                text = (chats.sSubject || this.sSubject || conn.sSubject || '```Subject has been changed to```\n@subject').replace('@subject', ChatId.subject);
            }

            // Memeriksa perubahan ikon grup
            if (ChatId.icon) {
                text = (chats.sIcon || this.sIcon || conn.sIcon || '```Icon has been changed to```').replace('@icon', ChatId.icon);
            }
            if (ChatId.revoke) {
                text = (chats.sRevoke || this.sRevoke || conn.sRevoke || '```Group link has been changed to```\n@revoke').replace('@revoke', ChatId.revoke);
            }
            if (ChatId.announce === true) {
                text = (chats.sAnnounceOn || this.sAnnounceOn || conn.sAnnounceOn || '*Group has been closed!*');
            } else if (ChatId.announce === false) {
                text = (chats.sAnnounceOff || this.sAnnounceOff || conn.sAnnounceOff || '*Group has been open!*');
            }
            if (ChatId.restrict === true) {
                text = (chats.sRestrictOn || this.sRestrictOn || conn.sRestrictOn || '*Group has been all participants!*');
            } else if (ChatId.restrict === false) {
                text = (chats.sRestrictOff || this.sRestrictOff || conn.sRestrictOff || '*Group has been only admin!*');
            }
            if (!text) continue;
            await this.reply(id, text.trim(), fkontak);
        }
    }
};