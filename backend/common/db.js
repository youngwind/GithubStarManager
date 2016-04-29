var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var Config = require('./config');

MongoClient.connect(Config.mongo.url, function (err, db) {
  assert.equal(null, err);
  console.log('Connected correctly to server');
});

module.exports = MongoClient;