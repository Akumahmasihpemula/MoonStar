const { animeindo, animeindoep, animeindodl } = require("../scrape/anime-indo.js");

let handler = async (m, { conn, text, command }) => {
    const [commands, query] = text.split('|').map(str => str.trim().toLowerCase());
    if (!commands || !query) {
        return m.reply(`Input pencarian\n\nContoh:\n.${command} search|isekai\n\nList lainnya:\n download\n episode\n\n> tolong jangan spam yah senpai ${m.name}*`, { quoted: m });
    }
    m.react("⌛");
    if (commands === 'search') {
        let api = await animeindo(query);
        if (api && api.results.length > 0) {
            let response = api.results.map(anime => {
                return `*_\`Judul:\`_* ${anime.title}\n*_\`Link:\`_* ${anime.link}\n*_\`Gambar:\`_* ${anime.image}\n*_\`Deskripsi:\`_* ${anime.description}\n\n`;
            }).join('');
            let total = api.results.length;
            m.reply(`Hasil Pencarian: ${query}\nDitemukan: ${total}\n﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊\n\n${response}`);
        } else {
            m.reply(`\`TUTORIAL PENGGUNAAN\`\n\n1. search = .${command} search|isekai\n2. episode = .${command} episode|https://anime-indo.lol/anime/isekai-yururi-kikou-kosodateshinagara-boukensha-shimasu/\n3. download = ${command} download|https://anime-indo.lol/isekai-yururi-kikou-kosodateshinagara-boukensha-shimasu-episode-1/`, { quoted: m });
        }
    } else if (commands === 'episode') {
        let api = await animeindoep(query);
        if (api && api.data.length > 0) {
            let teks = `*${api.data[0].title}*\n\n`;
            teks += `*Gambar:* ${api.data[0].image}\n\n`;
            teks += `*Deskripsi:* ${api.data[0].description}\n\n`;
            teks += `*Genre:* ${api.data[0].genres.join(', ')}\n\n`;
            teks += `*Daftar Episode:* \n`;
            api.data[0].episodes.forEach((episode) => {
                teks += `*${episode.episodeTitle}*: ${episode.episodeLink}\n`;
            });
            await conn.sendButton(m.chat, null, teks, api.data[0].image, [[]], null, null, fkontak);
        } else {
            m.reply(`\`TUTORIAL PENGGUNAAN\`\n\n1. search = .${command} search|isekai\n2. episode = .${command} episode|https://anime-indo.lol/anime/isekai-yururi-kikou-kosodateshinagara-boukensha-shimasu/\n3. download = ${command} download|https://anime-indo.lol/isekai-yururi-kikou-kosodateshinagara-boukensha-shimasu-episode-1/`, { quoted: m });
        }
    } else if (commands === 'download') {
        let api = await animeindodl(query);
        if (api && api.data.length > 0) {
            let response = `Judul: ${api.data[0].title}\n${api.data[0].iframeSrc}\n\nServer:\n`;
            api.data[0].servers.forEach(server => {
                response += `- ${server.serverName}: ${server.videoLink}\n`;
            });
            m.reply(response);
        } else {
            m.reply(`\`TUTORIAL PENGGUNAAN\`\n\n1. search = .${command} search|isekai\n2. episode = .${command} episode|https://anime-indo.lol/anime/isekai-yururi-kikou-kosodateshinagara-boukensha-shimasu/\n3. download = ${command} download|https://anime-indo.lol/isekai-yururi-kikou-kosodateshinagara-boukensha-shimasu-episode-1/`, { quoted: m });
        }
    }
    m.react("✅");
};

handler.help = ['animeindo *[SEARCH]*'];
handler.tags = ['anime'];
handler.command = /^(animeindo|animeindosearch)$/i;
handler.premium = true
module.exports = handler;