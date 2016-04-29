var express = require('express');
var router = express.Router();
var fetch = require('isomorphic-fetch');
var Config = require('../common/config');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

/* 获取用户star仓库 */
router.get('/:userName/starred', function (req, res, next) {
  var userName = req.params.userName;
  (async() => {
    var starredAry = [],
      page = 1,
      data;
    while (true) {
      data = await fetch(Config.githubApi + '/users/' + userName + '/starred?pageSize=100&page=' + page)
        .then(ret => ret.json());
      console.log(data);
      console.log(page);
      if (!data) break;
      page++;
      starredAry = starredAry.concat(data);
    }
    res.send({
      code: 0,
      data: starredAry,
      length: starredAry.length
    })
  })();
});

module.exports = router;
