var express = require('express');
var path = require('path');
var logger = require('morgan');
var ejs = require('ejs');
var config = require('./src/config');


var app = express();

app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.render('index', {});
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});


var server = app.listen(config.port, function () {
  console.log('app start.\nListening on http://localhost:' + server.address().port);
});
