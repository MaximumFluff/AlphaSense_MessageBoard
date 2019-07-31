const mongoose = require('mongoose');

const Channel = mongoose.model('channel', {
  name: { type: String, required: true, },
  symbol: { type: String, required: true, },
  max_threads: { type: Number, required: true, },
})

module.exports = Channel;