require('dotenv').config()

//From .env file - see blankEnv for template
const {
  ENV,
  EMAIL_ZACK,
  FB_APP_ID,
  FB_APP_SECRET,
  GMAILUSER,
  GMAILPASS,
  MONGO_DB_NAME,
  MONGO_DB_HOST,
  MONGO_DB_HOST_DEPLOY,
  MONGO_DB_USER,
  MONGO_DB_PASS,
  PORT,
  PORT_DEPLOY,
  PUBLIC_DIR,
  SECRET
} = process.env

const profileFields =  ['id', 'name', 'displayName', 'email'];
const callback_url =   "http://localhost:3000/auth/facebook/callback";
const PROCESS_TITLE = 'Vacation Calculator';
//const callback_url =  "http://vacation-calc.herokuapp.com/auth/facebook/callback"; //for heroku deploy

module.exports = {
  ENV,
  EMAIL_ZACK,
  FB_APP_ID,
  FB_APP_SECRET,
  GMAILUSER,
  GMAILPASS,
  MONGO_DB_NAME,
  MONGO_DB_HOST,
  MONGO_DB_HOST_DEPLOY,
  MONGO_DB_USER,
  MONGO_DB_PASS,
  PORT,
  PORT_DEPLOY,
  PUBLIC_DIR,
  SECRET,
  callback_url,
  profileFields,
  PROCESS_TITLE
}