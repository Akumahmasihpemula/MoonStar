const axios = require('axios');

let handler = async (m, { conn, text }) => {
    if (!text) throw 'Mau ngomong apa kak sama simi?';
    try {
        let simi = await getMessage(text, 'id');
        m.reply(simi);
    } catch (e) {
        throw e.message;
    }
}

handler.help = ['simi'];
handler.tags = ['fun'];
handler.command = /^(simi)$/i;
handler.limit = true;

module.exports = handler;

async function getMessage(yourMessage, langCode) {
    const res = await axios.post(
        'https://api.simsimi.vn/v2/simtalk',
        new URLSearchParams({
            'text': yourMessage,
            'lc': langCode
        })
    );
    if (res.status > 200) 
        throw new Error(res.data.success);
    return res.data.message;
}