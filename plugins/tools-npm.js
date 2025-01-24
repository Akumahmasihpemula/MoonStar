const fetch = require('node-fetch');

let handler = async (m, { text }) => {
    if (!text) throw 'cari apa kak contoh\n.npmsearch anime';
    m.react("⌛");
    let res = await fetch(`http://registry.npmjs.com/-/v1/search?text=${text}`);
    let { objects } = await res.json();
    
    if (!objects.length) throw `Query "${text}" tidak di temukan di daftar npmjs senpai`;
    
    let txt = objects.map(({ package: pkg }) => {
        return `*${pkg.name}* (v${pkg.version})\n_${pkg.links.npm}_\n_${pkg.description}_`;
    }).join`\n\n`;
    
    m.reply(txt);
};

handler.help = ['npmsearch'];
handler.tags = ['tools'];
handler.command = /^(npmsearch|npm)$/i;
handler.limit = 3;

module.exports = handler;