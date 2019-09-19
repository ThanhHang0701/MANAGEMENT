var moment = require('moment');

module.exports.formatUTC = (datetime) => {
    return moment(datetime).format("YYYY-MM-DD HH:mm:ss");
}

module.exports.formatHourUTC = (datetime) => {
    return moment(datetime).format("HH:mm:ss");
}

module.exports.formatDayUTC = (datetime) => {
    return moment(datetime).format("YYYY-MM-DD");
}