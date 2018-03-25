const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  client: {
    type: String,
    required: true
  },

  state: {
    type: String,
    required: true
  },

  title: {
    type: String,
    require: true
  },

  description: {
    type: String,
    required: true
  },

  total_price: {
    type: Number,
    require: true
  },

  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  },

  items: [{}]
});

mongoose.model('Budget', Schema);
