// view user
// follow user
// unfollow_user
// block_user
// edit my user
// my_profile

var express = require('express');
var router = express.Router();
const {
    checkJWT
} = require('../config/jwt')

router.get('/me', checkJWT, (req, res) => {
    res.json(res.locals.u)
})

module.exports = router