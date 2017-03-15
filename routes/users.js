const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

/////////////User routes

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    vacations: null
  });

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
router.post('/vacations', (req, res, next) => {
  let newVacation = new Vacation({
    name: req.body.name,
    price: req.body.price,
    guests: req.body.guests
  });

  User.addVacation(newVacation, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to add vacation'});
    } else {
      res.json({success: true, msg:'vacation created'});
    }
  });
});

// get vacations
router.get('/vacations', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  //console.log("get vacations", req.user)
  let id = req.user._id;
  console.log(req.user)
  User.getVacationsById(id, (err, user) => {
    if (err) {
      console.log(err);
        res.status(500).send(err)
    } else {
      console.log(user.email)
      console.log(user.vacations)
      console.log(user)


      //works, now need to save some vacations
       return res.send(user.vacations);
       //return res.json({vacations: user.vacations})
    }
  })
})

//Update Vacation
router.put('/vacations/:name', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  let updated = new Vacation({
    name: req.body.name,
    price: req.body.price,
    guests: req.body.guests
  });

  User.updateVacation(updated, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to update vacation'});
    } else {
      res.json({success: true, msg:'vacation updated'});
    }
  });
});

// Delete Vacation
router.delete('/vacations/:name', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  Article.findById(req.params.name, function (err, vacation) {
    if(err) { 
      return next(err); 
    }
    if(!vacation) { 
      return res.send(404); 
    }
    vacation.remove(function(err) {
      if(err) { 
        return handleError(res, err); 
      }
      return res.send(204);
    });
  });
});

/////////////Guest routes

//add Guest
router.post('/guests', (req, res, next) => {
  let newGuest = new Guest({
    name: req.body.name,
    price: req.body.price,
    guests: req.body.guests
  });

  User.addVacation(newVacation, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'User registered'});
    }
  });
});

// get Guest
router.get('/guests', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({vacations: req.user.vacations});
});

//Update Guest
router.put('/vacations/:name/guests', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  let updated = new Vacation({
    name: req.body.name,
    price: req.body.price,
    guests: req.body.guests
  });

  User.updateVacation(updated, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'User registered'});
    }
  });
});


// Delete Guest
router.delete('/vacations/:name/guests', passport.authenticate('jwt', {session:false}), (req, res, next) => {

});

module.exports = router;
