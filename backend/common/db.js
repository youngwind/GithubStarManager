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

// 用户收藏的仓库
let repoSchema = mongoose.Schema({
  name: String,
  html_url: String,
  owner: {
    login: String
  }
});

// 仓库的readme资料
let readmeSchema = mongoose.Schema({
  html_url: String,
  content: String
});

let readme = mongoose.model('readme', readmeSchema, 'readme');

module.exports = {
  repoSchema,
  readme
};