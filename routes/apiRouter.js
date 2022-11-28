// import all important modules
const express = require("express");
// const middleware = require("../middleware/middleware");

// declare router
const router = express.Router();

// import controller
// const pages = require("../controller/api/pagesApiController.js");
const auth = require("../controller/api/getIpController.js");
const db = require("../controller/api/dbApiController.js");

// implementation
router.get("/getIp", auth.getIp);
router.post("/db/get", db.get);
router.post("/db/update", db.update);
module.exports = router;