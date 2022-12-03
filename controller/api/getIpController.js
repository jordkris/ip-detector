const dbModel = require("../../model/dbModel");
var request = require('request');

module.exports = {
    getIp: async(req, res) => {
        let getAddress = async(lat, lon) => {
            let API_KEY = '004367a28d3d47fab91b1ded0777343a';
            return (await new Promise((resolve, reject) => {
                request.get({
                    url: `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&type=street&lang=id&format=json&apiKey=${API_KEY}`,
                    json: true,
                    headers: { 'User-Agent': 'request' }
                }, (err, res, data) => {
                    if (err) reject(err);
                    if (res.statusCode == 200) {
                        resolve(data);
                    } else {
                        reject('error RC ' + res.statusCode);
                    }
                });
            })).results[0].formatted;
        };
        // res.json({ myIP: req.socket.remoteAddress });
        res.header('Content-Type', 'application/json');
        let ip = req.query.ip;
        let lat = req.query.latlong.split(',')[0];;
        let lon = req.query.latlong.split(',')[1];;
        let address = await getAddress(lat, lon);
        let accurateLat = req.query.accuratelatlong.split(',')[0];
        let accurateLon = req.query.accuratelatlong.split(',')[1];
        let accurateAddress = (accurateLat == '-' || accurateLon == '-') ? '-' : await getAddress(accurateLat, accurateLon);
        dbModel.add(req.con, res, {
            table: 'stalker',
            data: {
                ip: await ip,
                latlong: lat + ',' + lon,
                address: address,
                accurate_latlong: accurateLat + ',' + accurateLon,
                accurate_address: accurateAddress,
                date_created: new Date() // moment().format(("YYYY-MM-DDTHH:mm:ss"))
            },
            server: true
        }, (results) => {
            console.log(`Success insert data from table stalker`);
            res.status(200).json({
                status: 'success',
                message: results
            });
        });

    }
}