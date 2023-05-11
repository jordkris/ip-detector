const dbModel=require("../../model/dbModel");
var request=require('request');

module.exports={
    getIp: async (req, res) => {
        let getAddress=async (lat, lon) => {
            let API_KEY='004367a28d3d47fab91b1ded0777343a';
            return (await new Promise((resolve, reject) => {
                request.get({
                    url: `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&type=street&lang=id&format=json&apiKey=${API_KEY}`,
                    json: true,
                    headers: { 'User-Agent': 'request' }
                }, (err, res, data) => {
                    if (err) reject(err);
                    if (res.statusCode==200) {
                        resolve(data);
                    } else {
                        reject('error RC '+res.statusCode);
                    }
                });
            })).results[0].formatted;
        };
        // res.json({ myIP: req.socket.remoteAddress });
        res.header('Content-Type', 'application/json');
        let ip=req.query.ip;
        let lat=req.query.latlong.split(',')[0];;
        let lon=req.query.latlong.split(',')[1];;
        let address=await getAddress(lat, lon);
        let accurateLat=req.query.accuratelatlong.split(',')[0];
        let accurateLon=req.query.accuratelatlong.split(',')[1];
        let accurateAddress=(accurateLat=='-'||accurateLon=='-')? '-':await getAddress(accurateLat, accurateLon);
        dbModel.add(req.con, res, {
            table: 'stalker',
            data: {
                ip: await ip,
                latlong: lat+','+lon,
                address: address,
                accurate_latlong: accurateLat+','+accurateLon,
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

    },
    getProvinsi: (req, res) => {
        // res.header('Content-Type', 'application/json');
        let data=[
            {
                "id": "0",
                "nama": ""
            },
            {
                "id": "11",
                "nama": "ACEH"
            },
            {
                "id": "12",
                "nama": "SUMATERA UTARA"
            },
            {
                "id": "13",
                "nama": "SUMATERA BARAT"
            },
            {
                "id": "14",
                "nama": "RIAU"
            },
            {
                "id": "15",
                "nama": "JAMBI"
            },
            {
                "id": "16",
                "nama": "SUMATERA SELATAN"
            },
            {
                "id": "17",
                "nama": "BENGKULU"
            },
            {
                "id": "18",
                "nama": "LAMPUNG"
            },
            {
                "id": "19",
                "nama": "KEPULAUAN BANGKA BELITUNG"
            },
            {
                "id": "21",
                "nama": "KEPULAUAN RIAU"
            },
            {
                "id": "31",
                "nama": "DKI JAKARTA"
            },
            {
                "id": "32",
                "nama": "JAWA BARAT"
            },
            {
                "id": "33",
                "nama": "JAWA TENGAH"
            },
            {
                "id": "34",
                "nama": "DI YOGYAKARTA"
            },
            {
                "id": "35",
                "nama": "JAWA TIMUR"
            },
            {
                "id": "36",
                "nama": "BANTEN"
            },
            {
                "id": "51",
                "nama": "BALI"
            },
            {
                "id": "52",
                "nama": "NUSA TENGGARA BARAT"
            },
            {
                "id": "53",
                "nama": "NUSA TENGGARA TIMUR"
            },
            {
                "id": "61",
                "nama": "KALIMANTAN BARAT"
            },
            {
                "id": "62",
                "nama": "KALIMANTAN TENGAH"
            },
            {
                "id": "63",
                "nama": "KALIMANTAN SELATAN"
            },
            {
                "id": "64",
                "nama": "KALIMANTAN TIMUR"
            },
            {
                "id": "65",
                "nama": "KALIMANTAN UTARA"
            },
            {
                "id": "71",
                "nama": "SULAWESI UTARA"
            },
            {
                "id": "72",
                "nama": "SULAWESI TENGAH"
            },
            {
                "id": "73",
                "nama": "SULAWESI SELATAN"
            },
            {
                "id": "74",
                "nama": "SULAWESI TENGGARA"
            },
            {
                "id": "75",
                "nama": "GORONTALO"
            },
            {
                "id": "76",
                "nama": "SULAWESI BARAT"
            },
            {
                "id": "81",
                "nama": "MALUKU"
            },
            {
                "id": "82",
                "nama": "MALUKU UTARA"
            },
            {
                "id": "91",
                "nama": "PAPUA BARAT"
            },
            {
                "id": "94",
                "nama": "PAPUA"
            }
        ];
        if (req.query.q) data=data.filter(d => d.nama.toLowerCase().includes(req.query.q));
        res.status(200).json(data);
    }
}