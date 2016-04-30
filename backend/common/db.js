var mongoose = require('mongoose');
import Config from './config';


mongoose.connect(Config.mongo.url);

let db = mongoose.connection;

db.on('error', function () {
  console.log('connecting error')
});

db.once('open', function () {
  // we're connected
});

let repoSchema = mongoose.Schema({
  name: String,
  html_url: String
});

module.exports = {
  repoSchema
};