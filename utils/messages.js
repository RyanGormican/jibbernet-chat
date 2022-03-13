// this file formats messages into objects of username, text and time

// used to get time formatting
const moment = require('moment');

function formatMessage(userName, text) {
    return {
        userName,
        text,
        time: moment().format('HH:mm ')
    }
}
// export so it can be used in server.js
module.exports = formatMessage;