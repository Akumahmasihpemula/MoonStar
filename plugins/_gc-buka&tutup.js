const moment = require('moment-timezone');
const schedule = require('node-schedule');
const timeZone = 'Asia/Jakarta';
const closeTime = '01:00';
const openTime = '05:00'; 
const groupChats = [
    '120363164510479075@g.us'
];
let groupStatus = {};
let originalGroupNames = {};
let reminderSent = {};

const checkGroupsStatus = async (conn) => {
    const currentTime = moment().tz(timeZone).format('HH:mm');

    for (const chatId of groupChats) {
        const groupMetadata = await conn.groupMetadata(chatId);
        const currentGroupName = await conn.getName(chatId); // Menggunakan getName untuk mendapatkan nama grup

        if (!originalGroupNames[chatId]) {
            originalGroupNames[chatId] = currentGroupName;
        }

        const closeReminderTime = moment(closeTime, 'HH:mm').subtract(5, 'minutes').format('HH:mm');
        const openReminderTime = moment(openTime, 'HH:mm').subtract(5, 'minutes').format('HH:mm');

        if (currentTime === closeReminderTime && !reminderSent[`${chatId}-close`]) {
            await conn.sendMessage(chatId, { text: `[ NOTIFICATION ]\n> group akan di tutup dalam 5 menit` });
            reminderSent[`${chatId}-close`] = true;
        }

        if (currentTime === openReminderTime && !reminderSent[`${chatId}-open`]) {
            await conn.sendMessage(chatId, { text: `[ NOTIFICATION ]\n> group akan di buka dalam 5 menit` });
            reminderSent[`${chatId}-open`] = true;
        }

        if (currentTime === closeTime && groupStatus[chatId] !== 'closed') {
            await conn.groupSettingUpdate(chatId, 'announcement');
            await conn.groupUpdateSubject(chatId, `${originalGroupNames[chatId]}`);
            await conn.sendMessage(chatId, { text: `[ NOTIFICATION CLOSE ]\n> group sudah di tutup akan di buka kembali di jam ${openTime} 𝖶𝖨𝖡` });
            groupStatus[chatId] = 'closed';
            reminderSent[`${chatId}-close`] = false;
        }

        if (currentTime === openTime && groupStatus[chatId] !== 'opened') {
            await conn.groupSettingUpdate(chatId, 'not_announcement');
            await conn.groupUpdateSubject(chatId, `${originalGroupNames[chatId]} (buka)`);
            await conn.sendMessage(chatId, { text: `[ NOTIFICATION OPEN ]\n> group ini sudah di buka kembali akan di tutup di jam ${closeTime} 𝖶𝖨𝖡` });
            groupStatus[chatId] = 'opened';
            reminderSent[`${chatId}-open`] = false;             
        }
    }
};

schedule.scheduleJob('* * * * *', () => {
    checkGroupsStatus(conn);
});

module.exports = {
    checkGroupsStatus
};