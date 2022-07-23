const jwt = require('jsonwebtoken');
const config = require("config");

module.exports = (req, res, next) => {
    jwt.verify(req.body.token, config.get("privateKey"), (error, decoded) => {
        if (error) {
            res.status(401).send(error.message)
        } else if (decoded.role === "admin") {
            next()
        } else {
            res.status(403).send("Not admin!")
        }
    });


}
