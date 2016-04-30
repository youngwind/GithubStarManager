var express = require('express');
var router = express.Router();
var fetch = require('isomorphic-fetch');
var Config = require('../common/config');
import {repo} from '../common/db';


/* 从github上获取用户star仓库 */
router.get('/:userName/starred', function (req, res, next) {
  let userName = req.params.userName;

  if (!userName) throw new Error('用户名为空');

  (async() => {
    let starredAry = [],  // 存储收藏的仓库
      page = 1,   // 请求分页
      data;     // 每次请求的数据
    while (true) {

      // 此处可以用并发,有待优化
      data = await fetch(`${Config.githubApi}/users/${userName}/starred?pageSize=100&page=${page}`)
        .then(ret => ret.json());

      if (!data.length) break;

      starredAry = starredAry.concat(data);
      page++;
    }

    let ret = await repo.remove({
      userName
    });

    starredAry = starredAry.map((starred, key) => {
      starred.userName = userName;
      return starred;
    });

    await repo.insertMany(starredAry);

    res.send({
      code: 0,
      data: true
    });

  })();

});

/* 从本地数据库中读取用户收藏的仓库 */
router.get('/:userName/localStarred', function (req, res, next) {
  let {userName} = req.params;

  if (!userName) throw new Error('用户名为空');

  (async()=> {
    let result = await repo.find({
      userName
    });

    res.send({
      code: 0,
      data: result
    })
  })();

});

module.exports = router;
