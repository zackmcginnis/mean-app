const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const Vacation = require('../models/vacation');
const User = require('../models/user');
const http = require('http');
const nodemailer = require('nodemailer')
const secret = config.SECRET;

/////////////User routes
module.exports = function(router) {

// Register
router.post('/register', (req, res, next) => {
  //regToken = jwt.sign({ username: req.body.username, email: req.body.email }, config.secret, { expiresIn: '24h' }); // Create a token for activating account through e-mail
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
    //temporarytoken: regToken
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
        const token = jwt.sign(user, secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: token,
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

///////////////////////////////////////////////////////////////////////////////////////////////////
// Middleware for Routes that checks for token - Place all routes after this route that require the user to already be logged in
///////////////////////////////////////////////////////////////////////////////////////////////////
router.use(function(req, res, next) {
    var token = req.body.token || req.body.query || req.headers['authorization']; // Check for token in body, URL, or headers

    // Check if token is valid and not expired  
    if (token) {
        // Function to verify token
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
              console.log("token error")
                res.json({ success: false, message: 'Token invalid' }); // Token has expired or is invalid
            } else {
              console.log("token success")
                req.decoded = decoded; // Assign to req. variable to be able to use it in next() route ('/me' route)
                next(); // Required to leave middleware
            }
        });
    } else {
      console.log("no token")
        res.json({ success: false, message: 'No token provided' }); // Return error if no token was provided in the request
    }
});

// Profile
router.get('/profile', (req, res, next) => {
  res.json({user: req.decoded._doc});
});

/////////////Vacation routes

//add vacation
router.post('/vacations', (req, res, next) => {
  let newVacation = new Vacation({
    name: req.body.name,
    price: req.body.price,
    guests: req.body.guests,
    totalDays: req.body.totalDays,
    newFlag: req.body.newFlag
  });
  console.log("this vacation", newVacation);

  User.getUserByUsername(req.decoded._doc.username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }
    User.addVacation(newVacation, req.decoded._doc._id, (err, user) => {
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
router.get('/vacations', (req, res, next) => {

  let id = req.decoded._doc._id;
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
router.put('/vacations/edit', (req, res, next) => {
  let updated = new Vacation({
    name: req.body.name,
    price: req.body.price,
    guests: req.body.guests,
    totalDays: req.body.totalDays,
    newFlag: req.body.newFlag,
    _id: req.body._id
  });

  User.getUserByUsername(req.decoded._doc.username, (err, thisuser) => {
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
router.put('/vacations/delete', (req, res, next) => {
  User.getUserByUsername(req.decoded._doc.username, (err, thisuser) => {
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
router.get('/guests', (req, res, next) => {
  res.json({vacations: req.decoded._doc.vacations});
});

//Update Guest


// Delete Guest
router.delete('/vacations/:name/guests', (req, res, next) => {

});


//email
router.post('/email', (req, res, next) => {
  let list = req.body.emailList;
  let pdf = req.body.pdfDoc;
  let messageArray = [];


  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: config.GMAILUSER,
      pass: config.GMAILPASS
    }
  });

    var message = {
      transport: transporter,
      from: req.user.email,
      subject: 'Pricing breakdown for upcoming vacation',
      text: 'Attached is the pricing breakdown for you upcoming vacation',
      html: '<p>Attached is the pricing breakdown for you upcoming vacation</p>',
      attachments: [{
        filename: 'vacation-price-breakdown.pdf', 
        path: pdf
      }]
  }

    //messageArray.push(message);
  

  // send mail with defined transport object
  list.forEach(function (to, i) {
    message.to = to;
    message.transport.sendMail(message, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
            if (i === list.length - 1){
              message.transport.close();
            }
        }
    });    
  })
})


return router;
};