var express = require('express');
var router = express.Router();
var fetch = require('isomorphic-fetch');
var Config = require('../common/config');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

/* 获取用户star仓库 */
router.get('/:userName/starred', function (req, res, next) {
  let userName = req.params.userName;

  (async() => {
    let starredAry = [],  // 存储收藏的仓库
      page = 1,   // 请求分页
      data;     // 每次请求的数据
    while (true) {
      data = await fetch(`${Config.githubApi}/users/${userName}/starred?pageSize=100&page=${page}`)
        .then(ret => ret.json());

      if (!data.length) break;

      starredAry = starredAry.concat(data);
      page++;
    }


    var insertStarredRepos = function (db, callback) {
      var collection = db.collection('github');
      collection.insertMany(starredAry, function (err, result) {
        console.log('insert sucessfuly');
        callback(result);
      })
    };

    MongoClient.connect(Config.mongo.url, function (err, db) {
      assert.equal(null, err);
      console.log('Connected correctly to server');
      insertStarredRepos(db, function () {
        db.close();
      })
    });


    res.send({
      code: 0,
      data: []
    })
  })();

});

module.exports = router;
