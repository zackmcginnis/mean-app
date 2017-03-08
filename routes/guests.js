const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

/////////////Guest routes

//add Guest
router.post('/vacations/:name/guests', (req, res, next) => {
  let newVacation = new Vacation({
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
router.get('/vacations/:name/guests', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({vacations: req.user.vacations});
});

//Update Guest
router.put('/vacations/:name/guests', passport.authenticate('jwt', {session:false}), function(req, res, next) => {
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

Place.findById(req.params.id, function(err, p) {
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

// Delete Guest
router.delete('/vacations/:name/guests', passport.authenticate('jwt', {session:false}), function(req, res, next) {

});

module.exports = router;
