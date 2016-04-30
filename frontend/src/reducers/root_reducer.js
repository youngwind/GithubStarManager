/**********************************************
 * Created by liangshaofeng on 2016年4月5日
 * 组合reducers
 * 每次新添加reducer都要修改这个文件
 **********************************************/

import {combineReducers} from 'redux';
import repo from './repo_reducer';
import readme from './readme_reducer';
import group from './group_reducer';

var rootReducer = combineReducers({
  repo,
  readme,
  group
  // more
});

module.exports = rootReducer;
