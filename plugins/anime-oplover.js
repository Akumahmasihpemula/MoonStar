const { oploverzdownload, oploverzInfo, oploverz } = require("../scrape/oplover.js");
const { proto, generateWAMessageFromContent, generateWAMessageContent } = require('@adiwajshing/baileys')

let handler = async (m, { conn, text, command }) => {
    const [commands, query] = text.split('|').map(str => str.trim().toLowerCase());
    if (!commands || !query) {
        return conn.sendFile(m.chat, 'https://i.imgur.com/3zqV9ZK.jpg', 'image.jpg',
            `Input pencarian\n\nContoh:\n.${command} search|isekai\n\nList lainnya:\n download\n episode\n\n> tolong jangan spam yah senpai ${m.name}*`, m);
    }
    m.react("⌛");
    if (commands === 'search') {
        let push = [];
        const reasone = await oploverz(query);
        if (reasone.status === "aktif") {
            for (let i = 0; i < reasone.ResUlt.length; i++) {
                let { title, link, image } = reasone.ResUlt[i];
                let no_watermark = image;
                push.push({
                    body: proto.Message.InteractiveMessage.Body.fromObject({
                        text: ` [ SAMEHANDOKU HASIL ]

❏ *TITLE:* ${title}
❏ *URL:* ${link}`
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.fromObject({
                        text: null
                    }),
                    header: proto.Message.InteractiveMessage.Header.fromObject({
                        title: "",
                        hasMediaAttachment: true,
                        imageMessage: await createImage(no_watermark, conn) // Pass conn to createImage
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                        buttons: [
                            {
                                name: "cta_copy",
                                buttonParamsJson: `{"display_text":"CEK LIST EPISODE","id":"123456789","copy_code":".${command} episode|${link}"}`
                            }
                        ]
                    })
                });
            }
            const msg = generateWAMessageFromContent(m.chat, {
                viewOnceMessage: {
                    message: {
                        messageContextInfo: {
                            deviceListMetadata: {},
                            deviceListMetadataVersion: 2
                        },
                        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                            body: proto.Message.InteractiveMessage.Body.create({
                                text: `Pencarian: *"${text}"*
Di temukan: *"${push.length}"*`
                            }),
                            footer: proto.Message.InteractiveMessage.Footer.create({
                                text: "Your bot name"
                            }),
                            header: proto.Message.InteractiveMessage.Header.create({
                                hasMediaAttachment: false
                            }),
                            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                                cards: [
                                    ...push
                                ]
                            })
                        })
                    }
                }
            }, {});
            await conn.relayMessage(m.chat, msg.message, {
                messageId: msg.key.id
            });
        } else {
            await conn.sendFile(m.chat, 'https://i.imgur.com/3zqV9ZK.jpg', 'image.jpg',
                `\`TUTORIAL PENGGUNAAN\`

1.search = .${command} search|isekai
2.episode = .${command} episode|https://oploverz.my/anime/isekai-de-cheat-skill-wo-te-ni-shita-ore-wa-genjitsu-sekai-wo-mo-musou-suru-level-up-wa-jinsei-wo-kaeta/
3.download = ${command} download|https://oploverz.my/isekai-de-cheat-skill-wo-te-ni-shita-ore-wa-genjitsu-sekai-wo-mo-musou-suru-episode-12-subtitle-indonesia/`, m);
        }
} else if (commands === 'episode') {
            let api = await oploverzInfo(query);
            // Pastikan api tidak null dan memiliki properti ListEps
            if (api && Array.isArray(api.ListEps) && api.ListEps.length > 0) {
                let { title, image, rating, status, studio, released, synopsis, ListEps } = api;
                let eps = ListEps.map(v => `JUDUL: ${v.eptitle}\nDATE: ${v.releaseDate}\nEPISODE: ${v.Episode}\nURL: ${v.episodeLink}`).join("\n\n");
                let message = `
*Title:* ${title}
*Rating:* ${rating}
*Status:* ${status}
*Studio:* ${studio}
*Released:* ${released}
*Synopsis:* ${synopsis}`;
                await conn.sendFile(m.chat, image, 'image.jpg', message, m);
                m.reply(eps);
            } else {
                m.reply("Hanya diperbolehkan link awal contoh link https://oploverz.my/anime/isekai-de-cheat-skill-wo-te-ni-shita-ore-wa-genjitsu-sekai-wo-mo-musou-suru-level-up-wa-jinsei-wo-kaeta/ atau gunakan .oplover search|judul yang mau cari");
            }
        } else if (commands === 'download') {
            let api = await oploverzdownload(query);
            if (api.status === "aktif") {
                let teks = `╔┈┈┈┈┈┈┈┄┄┄┄┈┈┈┈╾\n`;
                teks += `║ DOWNLOAD OPLOVER\n`;
                teks += `╚┈┈┈┈┈┈┈┄┄┄┄┈┈┈┈╾\n`;
                teks += `TITLE: *${api.title}*\n`;
                teks += `RATING: *${api.rating}*\n`;
                for (let key in api.info) {
                    teks += `*${key}:* ${api.info[key]}\n`;
                }
                teks += `\nLINK DOWNLOAD\n`;
                for (let i = 0; i < api.Download.length; i++) {
                    teks += `From: ${api.Download[i].format}`;
                    for (let j = 0; j < api.Download[i].resolutions.length; j++) {
                        teks += `Resolution: ${api.Download[i].resolutions[j].resolution}\n`;
                        for (let k = 0; k < api.Download[i].resolutions[j].links.length; k++) {
                            teks += `(${api.Download[i].resolutions[j].links[k].linkText}):\n${api.Download[i].resolutions[j].links[k].link}\n`;
                        }
                    }
                }
                m.reply(teks);
            } else {
                m.reply("hanya di perbolehkan link kedua setelah awal contoh link https://oploverz.my/suicide-squad-isekai-episode-05-subtitle-indonesia/ atau kamu juga bisa gunakan .oplover episode|dari link awal");
            }
        }
        m.react("✅");
    };

    handler.help = ['oplover *[SEARCH]*'];
    handler.tags = ['anime'];
    handler.command = /^(oplover)$/i;
    module.exports = handler;

    async function createImage(url, conn) { // Added conn parameter
        const { imageMessage } = await generateWAMessageContent({
            image: {
                url
            }
        }, {
            upload: conn.waUploadToServer 
        });
        return imageMessage;
    }