const mongoose = require('mongoose');

// Guests Schema
const GuestSchema = mongoose.Schema({
  guestName: {
    type: String,
    required: true
  },
  guestDays: {
    type: Number,
    required: true
  },
  amountOwed: {
    type: Number,
    required: false
  },
  guestEmail: {
    type: String,
    required: false
  }
});

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