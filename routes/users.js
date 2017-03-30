const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Vacation = require('../models/user');
const User = require('../models/user');

/////////////User routes

// Register
router.post('/register', (req, res, next) => {
  let newUser = new user({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });
  //perform validation here as well

  User.addUser(newUser, (err, user) => {

    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'User registered'});
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

/////////////Vacation routes

//add vacation
router.post('/vacations', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  let newVacation = new Vacation({
    name: req.body.name,
    price: req.body.price,
    guests: req.body.guests,
    totalDays: req.body.totalDays,
    newFlag: req.body.newFlag
  });
  console.log("this vacation", newVacation);

  User.getUserByUsername(req.user.username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }
    User.addVacation(newVacation, user._id, (err, user) => {
      if(err){
        console.log("error ->>", err)
        res.json({success: false, msg:'Failed to add vacation'});
      } else {
        res.json({success: true, msg:'vacation created'});
      }
    });
  });
})

// get vacations
router.get('/vacations', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  //console.log("get vacations", req.user)
  let id = req.user._id;
  User.getVacationsById(id, (err, user) => {
    if (err) {
      console.log(err);
        res.status(500).send(err)
    } else {
      //works, now need to save some vacations
       return res.send(user.vacations);
       //return res.json({vacations: user.vacations})
    }
  })
})

//Update Vacation
router.put('/vacations/edit', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  let updated = new Vacation({
    name: req.body.name,
    price: req.body.price,
    guests: req.body.guests,
    totalDays: req.body.totalDays,
    newFlag: req.body.newFlag,
    _id: req.body._id
  });

  User.getUserByUsername(req.user.username, (err, thisuser) => {
    if(err) throw err;
    if(!thisuser){
      return res.json({success: false, msg: 'User not found'});
    }

    User.updateVacation(updated, thisuser, (err, user) => {
      if(err){
        res.json({success: false, msg:'Failed to update vacation'});
      } else {
        res.json({success: true, msg:'vacation updated'});
      }
    });
  });
})

// Delete Vacation
router.put('/vacations/delete', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  User.getUserByUsername(req.user.username, (err, thisuser) => {
    if(err) throw err;
    if(!thisuser){
      return res.json({success: false, msg: 'User not found'});
    }

    User.deleteVacation(req.body, thisuser, (err, user) => {
      if(err){
        res.json({success: false, msg:'Failed to delete vacation'});
      } else {
        res.json({success: true, msg:'vacation deleted'});
      }
    });
  });
});

/////////////Guest routes

//add Guest

// get Guest
router.get('/guests', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({vacations: req.user.vacations});
});

//Update Guest


// Delete Guest
router.delete('/vacations/:name/guests', passport.authenticate('jwt', {session:false}), (req, res, next) => {

});

module.exports = router;
