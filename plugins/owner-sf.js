const fs = require('fs');
const syntaxError = require('syntax-error');
const path = require('path');
const util = require('util');

const _fs = fs.promises;

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `
Penggunaan: ${usedPrefix}${command} <name file>
Contoh: ${usedPrefix}savefile main.js
        ${usedPrefix}saveplugin owner
`.trim();
    
    if (!m.quoted) throw `Reply Kodenya`;
    
    if (/p(lugin)?/i.test(command)) {
        let filename = text.replace(/plugin(s)?\//i, '') + (/\.js$/i.test(text) ? '' : '.js');
        const error = syntaxError(m.quoted.text, filename, {
            sourceType: 'module',
            allowReturnOutsideFunction: true,
            allowAwaitOutsideFunction: true
        });
        
        if (error) throw error;
        const pathFile = `plugins/${text}.js`
        await _fs.writeFile(pathFile, m.quoted.text);
        
        m.reply(`
Sukses Menyimpan Di *${filename}*

\`\`\`
${util.format(m.quoted.text)}
\`\`\`
`.trim());
    } else {
        const isJavascript = m.quoted.text && !m.quoted.mediaMessage && /\.js/.test(text);
        
        if (isJavascript) {
            const error = syntaxError(m.quoted.text, text, {
                sourceType: 'module',
                allowReturnOutsideFunction: true,
                allowAwaitOutsideFunction: true
            });
            
            if (error) throw error;
            await _fs.writeFile(text, m.quoted.text);
            
            m.reply(`
Sukses Menyimpan Di *${text}*

\`\`\`
${util.format(m.quoted.text)}
\`\`\`
`.trim());
        } else if (m.quoted.mediaMessage) {
            const media = await m.quoted.download();
            await _fs.writeFile(text, media);
            m.reply(`
Sukses Menyimpan Di *${text}*
`.trim());
        } else {
            throw 'Tidak Support!!';
        }
    }
};

handler.help = ['saveplugin'];
handler.tags = ['owner'];
handler.command = /^(sf|saveplugin)$/i;

handler.rowner = true;

module.exports = handler;

/**

° SCRIPT: yoruka kirihime
° ʏᴛ : @ᴋᴇɴᴢ_ᴍᴀᴅᴇ
° channel:https://whatsapp.com/channel/0029VaxuomuDp2QB3qI92T1t

"وَهَيْ، أَيُّهَا الْمُؤْمِنُونَ! تَذَكَّرُوا أَنَّ كُلَّ عَمَلٍ لَهُ قِيمَةٌ وَقِصَّةٌ وَرَاءَهُ. لَا تَحْذِفُوا هَذِهِ الْمَاءَةَ، فَإِنَّهَا لَيْسَتْ مَجَرَّدَ عَلاَمَةٍ، بَلْ رَمْزٌ لِلْجُهْدِ وَالإِبْدَاعِ الَّذِي وُضِعَ. احْتَرِمُوا أَعْمَالَ الْآخَرِينَ كَمَا تَحْتَرِمُونَ أَعْمَالَكُمْ، وَلْنَنْشُرِ الْخَيْرَ فِي كُلِّ خُطُواتِنَا. لِنَحْمِ مَعًا هَذِهِ الْأَعْمَالَ لِلْأَجْيَالِ الْمُقْبِلَةِ!"
"Wahay, saudaraku yang beriman! Ingatlah bahwa setiap karya memiliki nilai dan cerita di baliknya. Jangan sekali-kali kau menghapus watermark ini, karena ini bukan sekadar tanda, tetapi simbol dari usaha dan kreativitas yang telah dituangkan. Hargailah karya orang lain seperti kau menghargai karyamu sendiri, dan sebarkanlah kebaikan dalam setiap langkahmu. Mari bersama kita jaga dan lestarikan karya seni ini untuk generasi mendatang!"
**/