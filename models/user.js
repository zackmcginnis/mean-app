const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

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
const Vacation = module.exports = mongoose.model('Vacation', VacationSchema);

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
      if(err) {
        throw err;
      }
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

module.exports.addVacation = function(newVacation, userid, callback){
  User.findOne({_id: userid}, function (err, user) {
  if (err) {
    throw err;
  } else {
    user.vacations.push(newVacation);
    user.save(callback);
  }
  })
}

//get vacations
module.exports.getVacationsById = function(userid, callback){
  User.findOne({_id: userid}, callback);
}

//update vacation
module.exports.updateVacation = function(updated, user, callback){
  User.update(
     { "vacations._id": updated._id }, 
     {'$set': {
    'vacations.$': updated
    //'vacations.$.value': 'two updated'
    }
  }, function(err, update) { 
    if (err) throw err;
    console.log(update);
  })
}

//delete vacation
module.exports.deleteVacation = function(vacation, user, callback){
  User.update(
  { },
  { $pull: { vacations: { _id: vacation._id } } },
  { multi: true 
  }, function(err, update) { 
    if (err) throw err;
    console.log(update);
  })
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
