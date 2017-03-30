const mongoose = require('mongoose');
const config = require('../config/database');

// Vacation Schema
const VacationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  guests: {
    type: [GuestSchema],
    required: false
  },
  totalDays: {
    type: Number,
    required: false
  },
  newFlag: {
    type: Boolean,
    required: true
  }
});

const Vacation = module.exports = mongoose.model('Vacation', VacationSchema);