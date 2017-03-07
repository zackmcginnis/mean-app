const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
  const query = {username: username}
  User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}


/*

export class Vacation {
  id = 0;
  name = '';
  price = 0;
  totalDays : number = 0;
  guests: Guests[];
}

export class Guests {
  guestName = 'Enter guest name';
  guestDays : number  = 0;
}

export const vacations: Vacation[] = [
  {
    id: 1,
    name: 'New vacation',
    price: 0,
    totalDays: 0,
    guests: [
      {guestName: 'Enter guest name',  guestDays: 0},
    ]
  },
  {
    id: 2,
    name: 'Donalds bachelor party',
    price: 125000,
    totalDays: 0,
    guests: [
      {guestName: 'Donald Trump',  guestDays: 7},
      {guestName: 'Johnny Walker', guestDays: 5},
      {guestName: 'Bill Clinton', guestDays: 4},
      {guestName: 'Bill Belichick', guestDays: 5},
      {guestName: 'Clint Eastwood', guestDays: 2},
      {guestName: 'Charles Barkley', guestDays: 7},
      {guestName: 'Lil Wayne', guestDays: 7},
    ]
  },
];

*/