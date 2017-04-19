'use strict'

require('dotenv').config();
const {PORT, MONGO_DB_HOST, PROCESS_TITLE} = require('./config/config');
//const ENV = config.ENV || 'prod';
process.title = PROCESS_TITLE;
// //require('./helpers/unhandled-exceptions.logger')
// require('./helpers/prototype-extensions')

const express = require('express');
const app = express();
const fs = require('fs');
const https = require('https');
const path = require('path');
const morgan = require('morgan'); // Import Morgan Package
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const social = require('./config/passport')(app, passport);
const router = express.Router(); // Invoke the Express Router
const routes = require('./routes/users')(router);

// const options = {
//    key  : fs.readFileSync('server.key'),
//    cert : fs.readFileSync('server.crt')
// };

app.use(cors());
app.use(morgan('dev')); // Morgan Middleware
// CORS Middleware

// Body Parser Middleware
app.use(bodyParser.json());
app.use('/api', routes);
// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Connect To Database
//config.MONGO_DB_HOST_DEPLOY
mongoose.connect(MONGO_DB_HOST, function (err) {
	if (err) {
        console.log('Not connected to the database: ' + err); // Log to console if unable to connect to database
    } else {
        console.log('Successfully connected to MongoDB'); // Log to console if able to connect to database
    }
});

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+MONGO_DB_HOST);//config.MONGO_DB_HOST_DEPLOY
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});


// Port Number

//const port = 3000;
//const port = process.env.PORT || 8080; //for deploy

const port = PORT;//3000;
//const port = process.env.PORT || 8080; //for deploy


const getIp = require('ipware')().get_ip;
app.use(function(req, res, next) {
    const ipInfo = getIp(req);
    console.log(ipInfo)
    //logger.verbose({ipInfo})
    next()
})

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});
