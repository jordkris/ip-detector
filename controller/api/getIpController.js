const dbModel = require("../../model/dbModel");
const process = require('process');
const moment = require('moment');

module.exports = {
    getIp: async(req, res) => {
        console.log(moment().format(("YYYYMMDDHHmmssSSSSSS")));
        res.json({ myIP: req.socket.remoteAddress });

    }
}