var express = require('express');
var router = express.Router();
var fetch = require('isomorphic-fetch');
var Config = require('../common/config');
import {readme} from '../common/db';


/* 获取仓库对应的readme文档 */
router.get('/:owner/:repo', function (req, res, next) {
  let {owner, repo} = req.params;
  let {repoId} = req.query;

  if (!owner) throw new Error('仓库所有者为空');
  if (!repo) throw new Error('仓库为空');

  (async()=> {

    let readmeResult = await readme.findOne({
      repoId
    });

    // 如果数据库中有此readme,则直接返回,不必请求
    if (readmeResult) {
      res.send({
        code: 0,
        data: readmeResult
      });
      return;
    }

    readmeResult = await fetch(`${Config.realGithubApi}/repos/${owner}/${repo}/readme`)
      .then(ret => ret.json());


    let result = await new readme({
      ...readmeResult,
      repoId
    }).save();

    res.send({
      code: 0,
      data: result
    });

  })();

});


module.exports = router;
