const fetch = require('node-fetch');
const { format } = require('util');

let handler = async (m, { text, conn, command }) => {
    if (!text) throw ` Enter the link url to get\n\n example: ${command} https://www.pixiv.net/en/artworks/122887066`;
    m.reply(wait);
    let _url = new URL(text);
    let url = global.API(_url.origin, _url.pathname, Object.fromEntries(_url.searchParams.entries()), 'APIKEY');
    let res = await fetch(url);
    
    if (res.headers.get('content-length') > 100 * 1024 * 1024 * 1024) {
        // delete res
        throw `Content-Length: ${res.headers.get('content-length')}`;
    }
    
    if (!/text|json|mp4|mp3|webs/.test(res.headers.get('content-type'))) {
        return conn.sendFile(m.chat, url, 'file', text, m);
    }
    
    let txt = await res.buffer();
    try {
        txt = format(JSON.parse(txt + ''));
    } catch (e) {
        txt = txt + '';
    } finally {
        m.reply(txt.slice(0, 65536) + '');
    }
};

handler.help = ['get'];
handler.tags = ['tools'];
handler.command = /^(fetch|get)$/i;
handler.limit = 4;

module.exports = handler;