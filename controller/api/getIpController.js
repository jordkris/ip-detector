const dbModel = require("../../model/dbModel");
const process = require('process');

module.exports = {
    getIp: async(req, res) => {
        res.json({ myIP: req.socket.remoteAddress });

    }
}