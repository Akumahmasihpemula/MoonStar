let handler = async (m, { conn }) => {
    let now = new Date() * 1;
    let groups = Object.entries(conn.chats).filter(([jid, chat]) => 
        jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce
    ).map(v => v[0]);
    
    let txt = '';
    let index = 0; // Inisialisasi index

    for (let [jid, chat] of Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats)) {
        index++; // Increment index
        txt += `NO: ${index}\nNAME: ${await conn.getName(jid)}\nID: ${jid} [${chat?.metadata?.read_only ? 'Left' : 'Joined'}]\n${db.data.chats[jid] == undefined ? db.data.chats[jid] = {
            isBanned: false,
            welcome: false,
            antiLink: false,
            delete: true,
        } : db.data.chats[jid].expired ? "EXPIRED: " + msToDate(db.data.chats[jid].expired - now) : '*EXPIRED: Tidak Diatur Expired Group*'}
${db.data.chats[jid].isBanned ? '✅' : '❌'} _Group Banned_\n
${db.data.chats[jid].welcome ? '✅' : '❌'} _Auto Welcome_\n
${db.data.chats[jid].antiLink ? '✅' : '❌'} _Anti Link_\n\n`;
    }

    m.reply(`*[ LIST GROUP BOTZ ]*\n> Total Group: ${groups.length}\n\n${txt}`.trim());
}

handler.help = ['grouplist'];
handler.tags = ['info'];
handler.command = /^(grouplist|listgroup|listgc)$/i;
module.exports = handler;

function msToDate(ms) {
    let days = Math.floor(ms / (24 * 60 * 60 * 1000));
    let daysms = ms % (24 * 60 * 60 * 1000);
    let hours = Math.floor((daysms) / (60 * 60 * 1000));
    let hoursms = daysms % (60 * 60 * 1000);
    let minutes = Math.floor((hoursms) / (60 * 1000));
    let minutesms = hoursms % (60 * 1000);
    let sec = Math.floor((minutesms) / (1000));
    return days + " hari " + hours + " jam " + minutes + " menit";
}