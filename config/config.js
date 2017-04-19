require('dotenv').config()

//From .env file - see blankEnv for template
const {
  ENV,
  CALLBACK_URL,
  EMAIL_ZACK,
  FB_APP_ID,
  FB_APP_SECRET,
  GMAILUSER,
  GMAILPASS,
  MONGO_DB_NAME,
  MONGO_DB_HOST,
  MONGO_DB_USER,
  MONGO_DB_PASS,
  PORT,
  PORT_DEPLOY,
  PUBLIC_DIR,
  SECRET
} = process.env

const PROFILE_FIELDS =  ['id', 'name', 'displayName', 'email'];
//const callback_url = "/auth/facebook/callback";
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
  MONGO_DB_USER,
  MONGO_DB_PASS,
  PORT,
  PORT_DEPLOY,
  PUBLIC_DIR,
  SECRET,
  CALLBACK_URL,
  PROFILE_FIELDS,
  PROCESS_TITLE
}