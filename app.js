var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require('client-sessions');
var formidable = require('formidable');
var fs = require('fs');
var count=0;
var app = express();
var multer = require('multer');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongodb = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
var index = require('./routes/index');
var users = require('./routes/users');
var session = require('client-sessions');
var app = express();
//data base
var monk = require('monk');
var db=monk('localhost:27017/aditya');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//session
app.use(session({
  cookieName: 'session',
  secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
  duration: 120 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true
}));
// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});
app.use('/', index);
app.use('/users', users);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
});


module.exports = app;
