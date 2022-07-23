const jwt = require('jsonwebtoken');
const config = require("config");

module.exports = (req, res, next) => {
    jwt.verify(req.body.token, config.get("privateKey"), (error, decoded) => {
        if (error) {
            res.status(401).send(error.message)
        } else {
            req.email = decoded.email
            next()
        }
    });


}
