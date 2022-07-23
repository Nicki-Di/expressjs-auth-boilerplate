const express = require('express');
const router = express.Router();
const config = require("config")

router.get('/', function (req, res) {
    res.send(`API of ${config.get("appName")} is running...`);
});

module.exports = router;
