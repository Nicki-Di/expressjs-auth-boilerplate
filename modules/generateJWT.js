const jwt = require("jsonwebtoken");
const config = require("config");

const generateJWT = (user) => {
    return jwt.sign({
        id: user.id,
        role: user.role
    }, config.get("privateKey"), {expiresIn: '1000'})
}
module.exports = generateJWT