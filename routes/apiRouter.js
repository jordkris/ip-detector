// import all important modules
const express = require("express");
// const middleware = require("../middleware/middleware");

// declare router
const router = express.Router();

// import controller
// const pages = require("../controller/api/pagesApiController.js");
const auth = require("../controller/api/getIpController.js");

// implementation
router.get("/getIp", auth.getIp);
router.get("/sewatanah/getprovinsi", auth.getProvinsi);
module.exports = router;