'use strict'

const {
  EMAIL_ZACK,
  SUPPRESS_ERROR_EMAILS,
  WEB_ADDRESS
} = require('../config/config')

const nodemailer = require('nodemailer')
const winston = require('winston')

const setFilename = (filePrefix='',suppress=false)=>{
  const logger = new (winston.Logger)({
    levels:{ error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 },
    colors:{ error: 'red', warn: 'magenta', info: 'yellow', verbose: 'green', debug: 'blue', silly: 'magenta'}});

  logger.add(winston.transports.Console, {
    exitOnError: false,
    level: 'verbose',
    prettyPrint: true,
    colorize: true,
    silent: false,
    timestamp: true,
  });

  logger.add(winston.transports.File, {
    name:'partial-log',
    exitOnError: false,
    level: 'silly',
    prettyPrint: true,
    silent: false,
    timestamp: true,
    filename: `./logs/${filePrefix || 'logger'}.log`,
    maxsize: 40000,
    json: false
  });

  logger.add(winston.transports.File, {
    name:'all-logs',
    exitOnError: false,
    level: 'silly',
    prettyPrint: true,
    silent: false,
    timestamp: true,
    filename: `./logs/all.log`,
    maxsize: 40000,
    json: false
  });

  logger.on('logging', function (transport, level, msg, meta) {
    if (transport.name === 'all-logs' && level === 'error' && !SUPPRESS_ERROR_EMAILS && !suppress) {
      let metaString = ''
      if (meta && meta.toString) {
        if (meta.stack) {   //error object
          metaString = meta.toString()+'\n'+meta.stack
        }
        else {
          try {   //some other object
            metaString = JSON.stringify(meta,null,4)
          }
          catch(err) {    //circular object
            console.error(err)
            metaString = meta.toString()
          }
        }
      }
      let data = ''+msg+metaString
      data = data.replace(/\{\}$/,'')
      if (!data) {
        console.error('Logger.error missing, meta=',meta)
        console.error('Logger.error missing, metaString=',metaString)
        console.error('Logger.error missing, msg=',msg)
        console.error('Logger.error missing, data=',data)
      }
      else {

        let transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: GMAILUSER,
            pass: GMAILPASS
          }
        });

        var message = {
          transport: transporter,
          from: GMAILUSER,
          subject: `[Error] [${WEB_ADDRESS}] ${subjectPrefix} ${new Date()}`,
          text: {data,format:'text/plain'},
          html: "<p>error</p>"
        }

        for (let i=0; i<EMAIL_ZACK.length; i++) {

          message.to = EMAIL_ZACK[i];
          message.transport.sendMail(message, (error, info) => {
              if(error){
                  console.log(error);
              }else{
                  console.log('Message sent: ' + info.response);
                  if (i === list.length - 1){
                    message.transport.close();
                  }
              }
          });  
        }
      }
    }
  });

  return logger
}

module.exports = setFilename
