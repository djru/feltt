var Queue = require('bull');
var post_queue = new Queue('post queue', 'redis://127.0.0.1:6379');

post_queue.process('./config/post_process_callback.js');

module.exports = post_queue