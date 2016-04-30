var express = require('express');
var router = express.Router();
import {userGroup, repoGroup} from '../common/db';

// 获取用户仓库分组信息
router.get('/:userName/all', function (req, res, next) {
  let {userName} = req.params;

  (async()=> {

    // 获取该用户所有分组
    let retGroup = await userGroup.find({
      userName
    });

    if (!retGroup.length) {
      res.send({
        code: 0,
        data: []
      });
      return;
    }

    // 获取每一个分组的所有仓库
    let retRepoGroup = [];
    for (let index = 0; index < retGroup.length; index++) {
      let ret = await repoGroup.find({
        groupId: retGroup[index]._id
      });
      retRepoGroup.push({
        id: retGroup[index]._id,
        name: retGroup[index].groupName,
        repoIds: ret ? ret : []
      });
    }

    res.send({
      code: 0,
      data: retRepoGroup
    })
    
  })();

});

// 用户添加分组
router.post('/:userName/save', function (req, res, next) {
  let {userName} = req.params;
  let {groupName} = req.body;

  if (!groupName) throw new Error('分组名称为空');

  (async()=> {

    let result = await userGroup.findOne({
      userName,
      groupName
    });

    if (result) {
      res.send({
        code: 1,
        msg: "分组已经存在"
      });
      return;
    }

    let ret = await new userGroup({
      userName,
      groupName
    }).save();

    res.send({
      code: 0,
      data: groupName  // 返回分组的名称
    })

  })()

});

// 用户删除分组
router.post('/:userName/remove', function (req, res, next) {
  let {userName} = req.params;
  let {groupName} = req.body;

  if (!groupName) throw new Error('分组名称不能为空');

  (async()=> {

    let ret = await userGroup.findOne({
      userName,
      groupName
    });


    if (!ret) {
      res.send({
        code: 1,
        msg: '分组名称不存在,删除失败'
      });
      return;
    }

    let result = await userGroup.remove({
      userName,
      groupName
    });

    res.send({
      code: 0,
      data: true
    })

  })()

});

module.exports = router;