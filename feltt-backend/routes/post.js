var express = require('express');
var router = express.Router();
const post_queue = require('../config/fan_out_manager');
const {insert_post} = require('../config/db');
const {
    checkJWT
} = require('../config/jwt')

// how to hit
// fetch('http://lvh.me:3000/post/new', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({text: 'hello eevee', url: 'https://cdn.bulbagarden.net/upload/thumb/e/e2/133Eevee.png/500px-133Eevee.png'})})
router.post('/new', checkJWT, async (req, res) => {
    const post_data = {
        user_id: res.locals.u.id,
        text: req.body.text.substring(0, 1000),
        content_url: req.body.url, 
        repost_of: req.body.repost_of || null,
    }
    console.log(post_data)
    // 2. upload any attached files to storage
    const inserted_json = await insert_post(post_data)
    post_queue.add(inserted_json) // propogate this to the queues of all followers 
    res.json(inserted_json)
})

module.exports = router