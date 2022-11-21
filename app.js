// all important modules
const process = require('process');
const express = require('express');
const app = express();
require('dotenv').config();
app.set('trust proxy', true);
// entended config
app.use(express.urlencoded({ extended: true }));

// declare connection to db connection
let con = require("./config/database.js");
// connect route to database
app.use((req, res, next) => {
    req.con = con;
    return next();
});

// include router
const apiRouter = require("./routes/apiRouter");
app.use("/api", apiRouter);

// start server
let appListen = app.listen(process.env.PORT || 40000, () => {
    console.log("[%s] Express server listening on port %d in %s mode", new Date().toLocaleString(), appListen.address().port, app.settings.env);
});