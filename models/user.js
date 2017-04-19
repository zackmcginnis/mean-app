const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const titlize = require('mongoose-title-case'); // Import Mongoose Title Case Plugin
const validate = require('mongoose-validator'); // Import Mongoose Validator Plugin

// User Name Validator
var nameValidator = [
    validate({
        validator: 'matches',
        arguments: /^(([a-zA-Z]{3,20})+[ ]+([a-zA-Z]{3,20})+)+$/,
        message: 'Name must be at least 3 characters, max 30, no special characters or numbers, must have space in between name.'
    }),
    validate({
        validator: 'isLength',
        arguments: [3, 20],
        message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];

// User E-mail Validator
var emailValidator = [
    validate({
        validator: 'matches',
        arguments: /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/,
        message: 'Name must be at least 3 characters, max 40, no special characters or numbers, must have space in between name.'
    }),
    validate({
        validator: 'isLength',
        arguments: [3, 40],
        message: 'Email should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];

// Username Validator
var usernameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 25],
        message: 'Username should be between {ARGS[0]} and {ARGS[1]} characters'
    }),
    validate({
        validator: 'isAlphanumeric',
        message: 'Username must contain letters and numbers only'
    })
];

// Password Validator
var passwordValidator = [
    validate({
        validator: 'matches',
        arguments: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/,
        message: 'Password needs to have at least one lower case, one uppercase, one number, one special character, and must be at least 8 characters but no more than 35.'
    }),
    validate({
        validator: 'isLength',
        arguments: [8, 35],
        message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];

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
    type: String,
    required: true,
    //validate: nameValidator
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    //validate: emailValidator
  },
  // active: { 
  //   type: Boolean, 
  //   required: true, 
  //   default: false 
  // },
  // temporarytoken: { 
  //     type: String, 
  //     required: true 
  //   },
  username: {
    type: String,
    required: true,
    unique: true, 
    //validate: usernameValidator
  },
  password: {
    type: String,
    required: true,
    //validate: passwordValidator
  },
  vacations: {
    type: [VacationSchema],
    required: false
  }
});

// Mongoose Plugin to change fields to title case after saved to database (ensures consistency)
UserSchema.plugin(titlize, {
    paths: ['name']
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
  //console.log("from model...", newUser)
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
