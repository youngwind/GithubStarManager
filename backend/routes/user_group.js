var express = require('express');
var router = express.Router();
import {userGroup} from '../common/db';

router.get('/group/all', function (req, res, next) {
  res.send({
    code: 0,
    data: []
  })
});

// 用户添加分组
router.post('/:userName/add', function (req, res, next) {
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
      data: ret._id  // 返回分组的id
    })

  })()

});

module.exports = router;