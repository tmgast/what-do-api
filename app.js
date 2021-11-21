var express = require('express');
var dotenv = require('dotenv');
var path = require('path');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var locationsRouter = require('./routes/locations');

var app = express();
dotenv.config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/locations', locationsRouter);

mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDb connection error:'));

module.exports = app;
