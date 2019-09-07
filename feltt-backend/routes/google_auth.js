var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var constants = require('../config/constants');
const uuid = require('uuid');
const {get_user_by_email, create_user} = require('../config/db')
const {
    OAuth2Client
} = require('google-auth-library');
const client = new OAuth2Client(constants.google_client_id);

async function decodeGoogleToken(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: constants.google_client_id
    });
    const payload = ticket.getPayload();
    return {
        name: payload.name,
        email: payload.email
    }
}

router.post('/get_jwt', async (req, res) => {
    
    const google_account_info = await decodeGoogleToken(req.body.token)
    const google_email = google_account_info.email

    let user = await get_user_by_email(google_email);
    if (!user){
        user = await create_user(google_email);
    }

    console.log(user)

    const token_data = {
        email: user.email,
        id: user.id,
        username: user.uname
    };
    console.log(token_data);
    const jwt_token = jwt.sign(google_account_info, constants.jwt_secret, {
        expiresIn: 60 * 120
    });
    res.setHeader('x-auth-token', jwt_token);
    return res.status(200).cookie('jwt', jwt_token, {
        httpOnly: true
    }).json({
        token: jwt_token
    });
})

module.exports = router;