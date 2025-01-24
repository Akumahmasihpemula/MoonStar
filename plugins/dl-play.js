const yts = require('yt-search');

let handler = async (m, { conn, text, command }) => {
    if (!text) return m.reply(`Masukan input judul lagu\n\nContoh: .play kenangan`);
    
    m.reply(wait);
    
    try {
        let result = await yts.search(text);
        
        if (!result || !result.videos || result.videos.length === 0) {
            return m.reply("Tidak ditemukan video untuk judul tersebut.");
        }

        let video = result.videos[Math.floor(Math.random() * result.videos.length)];
        let sections = [];
        
        result.all.map((map) => {
            sections.push({
                rows: [{
                    title: `${map.title}`,
                    description: `${map.description}`,
                    id: `.yta ${map.url}`
                }]
            });
        });

        const listMessage = {
            title: 'ᴄᴇᴋ ʟɪɴᴋ ᴀᴜᴅɪᴏ!',
            sections
        };

        conn.sendMessage(m.key.remoteJid, {
            image: { url: video.image},
            caption: `ᴛɪᴅᴋ sᴇsᴜᴀɪ ᴋʟɪᴄᴋ ʙᴜᴛᴏɴ ᴄᴇᴋ ʟɪɴᴋ ᴀɢᴀʀ sᴇsᴜᴀɪ ʏᴀɴɢ ᴋᴀᴍᴜ ᴍᴀᴜ ʏᴀʜ ;)\n\n`,
            footer: wm,
            buttons: [
                {
                    buttonId: `.yta ${video.url}`,
                    buttonText: {
                        displayText: 'sᴇɴᴅ ᴍʏ ᴀᴜᴅɪᴏ'
                    },
                    type: 1,
                },
                {
                    buttonId: `.ytv ${video.url}`,
                    buttonText: {
                        displayText: 'sᴇɴᴅ ᴍʏ ᴠɪᴅᴇᴏ'
                    },
                    type: 1,
                },
                {
                    buttonId: 'action',
                    buttonText: {
                        displayText: 'ini gai tau apa'
                    },
                    type: 4,
                    nativeFlowInfo: {
                        name: 'single_select',
                        paramsJson: JSON.stringify(listMessage)
                    }
                },
            ],
            headerType: 1,
            viewOnce: true,
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: idkom, 
                    serverMessageId: null,
                    newsletterName: wm,
                },
            }
        }, { quoted: m });
        
        m.react("✅");
    } catch (error) {
        console.log("Gagal mengunduh video", error);
        m.reply("Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.");
    }
};

handler.help = ['play'];
handler.tags = ['dl'];
handler.command = ['play', 'song'];
handler.limit = 4;

module.exports = handler;