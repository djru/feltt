var jwt = require('jsonwebtoken');
var constants = require('./constants');


let checkJWT = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'] || req.cookies.jwt;
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    if (token) {
        jwt.verify(token, constants.jwt_secret, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                res.locals.u = decoded
                next()
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied',
        });
    }
};

module.exports = {
    checkJWT
}