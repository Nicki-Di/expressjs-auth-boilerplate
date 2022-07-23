const jwt = require("jsonwebtoken");
const config = require("config");

const generateJWT = (user) => {
    return jwt.sign({
        email: user.email,
        role: user.role
    }, config.get("privateKey"), {expiresIn: config.get("expiresIn")})
}
module.exports = generateJWT