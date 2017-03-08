const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Guests Schema
const GuestSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  days: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  email: {
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
  }
});

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
  },
  vacations: {
    type: [VacationSchema],
    required: false
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

/////////////User Model Functions

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

/////////////Vacation Model Functions

module.exports.addVacation = function(newVacation, callback){
      newVacation.save(callback);
}

//get vacations
module.exports.getVacations = function(vacations, callback){
  const query = {vacations: vacations}
  User.findOne(query, callback);
}

//update vacation
module.exports.updateVacation = function(username, callback){
  User.findById(req.params.vacations.name, function(err, p) {
    if (!p)
      return next(new Error('Could not load Document'));
    else {
      // do your updates here
      p.modified = new Date();

      p.save(function(err) {
        if (err)
          console.log('error')
        else
          console.log('success')
      });
    }
  });
}
//delete vacation
module.exports.deleteVacation = function(username, callback){

}
/////////////Guest Model Functions
module.exports.addGuest = function(newGuest, callback){
      newGuest.save(callback);
}

//get guests
module.exports.getGuests = function(guests, callback){
  const query = {username: username}
  User.findOne(query, callback);
}

//update guests
module.exports.updateGuests = function(guest, callback){
  
}

//delete guest
module.exports.deleteGuest = function(guest, callback){
  User.findById(req.params.name, function (err, guest) {
    if(err) { 
      return next(err); 
    }
    if(!guest) { 
      return res.send(404); 
    }
    guest.remove(function(err) {
      if(err) { 
        return handleError(res, err); 
      }
      return res.send(204);
    });
  });
};
