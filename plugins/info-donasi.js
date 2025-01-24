let handler = async (m, {
    conn,
    command,
    usedPrefix
}) => {
    let str = `${conn.getName(m.sender)} Mau Donasi ? Cukup Follow ig hayangmodol.pptx , tpi kalo mau donasi bnran gas 085974779581 >gopay 
`
    await conn.relayMessage(m.chat, {
        requestPaymentMessage: {
            currencyCodeIso4217: 'USD',
            amount1000: 100,
            requestFrom: '0@s.whatsapp.net',
            noteMessage: {
                extendedTextMessage: {
                    text: str,
                    contextInfo: {
                        mentionedJid: [m.sender],
                        externalAdReply: {
                            showAdAttribution: true
                        }
                    }
                }
            }
        }
    }, {})
}
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^(donasi)$/i
module.exports = handler;