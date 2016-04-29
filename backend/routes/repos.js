var express = require('express');
var router = express.Router();
var fetch = require('isomorphic-fetch');
var Config = require('../common/config');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');


/* GET home page. */
router.get('/:owner/:repo/readme', function (req, res, next) {
  let {owner, repo} = req.params;

  if (!owner) throw new Error('owner为空');
  if (!repo) throw new Error('仓库为空');

  var findReadme = function (db, callback) {
    var collection = db.collection('readme');
    var cursor = collection.find({
      html_url: `https://github.com/${owner}/${repo}/blob/master/README.md`
    });
    cursor.each(function (err, doc) {
      callback(doc);
    });
  };

  var insertReadme = function (db, callback, json) {
    var collection = db.collection('readme');
    collection.insertOne(json, function (err, result) {
      console.log('insert sucessfuly');
      callback(result);
    })
  };

  MongoClient.connect(Config.mongo.url, function (err, db) {
    console.log('Connected correctly to server');
    findReadme(db, function (ret) {
      console.log(ret);
      if (!ret) {
        fetch(`${Config.realGithubApi}/repos/${owner}/${repo}/readme`)
          .then(res => res.json())
          .then(json => {
            console.log(json);
            insertReadme(db, function (ret) {
              console.log(ret);
              res.send({
                code: 0,
                data: json
              })
            }, json)
          })
      }

    })
  });

});


module.exports = router;
