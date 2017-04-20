const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const FacebookStrategy  = require('passport-facebook').Strategy
const jwt = require('jsonwebtoken');
const session = require('express-session'); // Import Express Session Package
const User = require('../models/user');
const Vacation = require('../models/vacation');
const {SECRET, FB_APP_ID, FB_APP_SECRET, CALLBACK_URL, PROFILE_FIELDS, CLIENT_HOST, GENERATED_PASSWORD} = require('./config');


module.exports = function(app, passport){

  // Passport Middleware
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(session({secret: SECRET, resave: false, saveUninitialized: true, cookie: {secure: false}}));

  // Serialize users once logged in   
  passport.serializeUser(function(user, done) {
    //token = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: '24h' }); // If account active, give user token
  token = jwt.sign(user, SECRET, {
    expiresIn: 604800 // 1 week
  });

      // Check if the user has an active account
/*      if (user.active) {
          // Check if user's social media account has an error
          if (user.error) {
              token = 'unconfirmed/error'; // Set url to different error page
          } else {
              token = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: '24h' }); // If account active, give user token
          }
      } else {
          token = 'inactive/error'; // If account not active, provide invalid token for use in redirecting later
      } */
      done(null, user.id); // Return user object
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // let opts = {};
  // opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  // opts.secretOrKey = config.secret;
  // passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  //   User.getUserById(jwt_payload._doc._id, (err, user) => {
  //     if(err){
  //       return done(err, false);
  //     }

  //     if(user){
  //       return done(null, user);
  //     } else {
  //       return done(null, false);
  //     }
  //   });
  // }));


  /*config is our configuration variable.*/
passport.use(new FacebookStrategy({
    clientID: FB_APP_ID,
    clientSecret: FB_APP_SECRET,
    //callbackURL: config.callback_url,
    callbackURL: CALLBACK_URL,
    profileFields: PROFILE_FIELDS
  },
  function(accessToken, refreshToken, profile, done) {
    console.log("logging profile...", profile)
    console.log("logging profile._json...", profile._json)
    User.findOne({email: profile._json.email}).select('username password email name vacations').exec(function(err, user){
      if (err) {
        console.log(err)
        done(err);
      }

      if (user && user != null){ //found user
        done(null, user);

      } else { //no user, create one
            let newUser = new User({
              name: profile._json.name,
              email: profile._json.email,
              username: profile._json.email,
              password: GENERATED_PASSWORD
              //temporarytoken: regToken
            });
            //perform validation here as well

            User.addUser(newUser, (err, user) => {

              if(err){
                console.log(err);
                //res.json({success: false, msg:'Failed to register user'});
              } else {
                console.log("added user from fb ", user);
                //res.json({success: true, msg:'User registered'});
              }
            });
      }
    })
  }));

//FACEBOOK ROUTES

app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email, public_profile'}));
 
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/facebookerror' }), function(req, res){

  //res.redirect('http://localhost:4200/facebook/'+token); //change for production
  res.redirect(CLIENT_HOST+'/facebook/'+token); //change for production

});

  return passport; // Return Passport Object
};
