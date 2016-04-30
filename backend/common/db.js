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

// 仓库分组映射表
let repoGroupSchema = mongoose.Schema({
  userName: String,  // 用户名
  repId: Number,      // 仓库id
  groupId: String      // 分组id
});

let repoGroup = mongoose.model('repoGroup', repoGroupSchema, 'repoGroup');

// 分组表
let userGroupSchema = mongoose.Schema({
  userName: String,   // 用户名
  groupName: String    // 分组名
});

let userGroup = mongoose.model('user_group', userGroupSchema, 'user_group');

module.exports = {
  repoSchema,
  readme,
  repoGroup,
  userGroup
};