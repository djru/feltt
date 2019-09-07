var express = require('express');
var router = express.Router();
const post_queue = require('../config/fan_out_manager');
const {
    checkJWT
} = require('../config/jwt')

router.post('/new', checkJWT, (req, res) => {
    const url = null
    const post_data = {
        user_id: res.locals.u.id,
        text: req.body.content.substring(0, 1000),
        content_url: url, // 1k character max
        repost_of: req.body.content.repost_of,
    }
    // 2. upload any attached files to storage
    // 3. insert into db
    post_queue.add(post_data) // propogate this to the queues of all followers 
    res.json(post_data)
})

module.exports = router