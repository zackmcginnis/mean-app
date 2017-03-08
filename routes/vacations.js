const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

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
  res.json({vacations: req.user.vacations});
});

//Update Vacation
router.put('/vacations/:name', passport.authenticate('jwt', {session:false}), function(req, res, next) => {
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
router.delete('/vacations/:name', passport.authenticate('jwt', {session:false}), function(req, res, next) {
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

module.exports = router;
