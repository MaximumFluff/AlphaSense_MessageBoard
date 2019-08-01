const mongoose = require('mongoose');

const Thread = mongoose.model('thread', {
  post_number: { type: Number, required: true, },
  username: { type: String, required: true },
  body: { type: String, required: true, },
  replies: { type: Array, required: true, },
  timestamp: { type: Number, required: true, },
  board: { type: String, required: true, },
})

module.exports = Thread;