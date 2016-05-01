/**********************************************
 * Created by liangshaofeng on 2016年5月1日
 * 搜索相关
 **********************************************/

import ActionTypes from '../constants/action_types';
import Store from '../store/store';
var difference = require('lodash.difference');

// 分组之间的切换
exports.addOrReplaceSearchGroup = function (selectedGroupId) {
  return {
    type: ActionTypes.ADD_OR_REPLACE_SEARCH_GROUP,
    selectedGroupId
  };
};

// 根据搜索条件生成仓库id list
// 每一个设置完搜索条件的地方都会调用这个方法
exports.generateResultRepoIds = function () {

  // 这里代码写得好搓...有空优化一下
  let {repo:{starred}, search:{group:selectedGroup}, group:{group:groups}} = Store.getState();
  let repoIds = [];
  let AllStarredRepoIds = starred.map((repo)=> repo.id);
  let AllGroupedRepoIds = [];
  let groupIdsList = [];
  groups.forEach((group)=> {
    groupIdsList.push(group.id);
    if (selectedGroup === group.id) {
      repoIds = group.repoIds;
    }
    AllGroupedRepoIds = AllGroupedRepoIds.concat(group.repoIds);
  });

  if (!groupIdsList.includes(selectedGroup)) {
    repoIds = difference(AllStarredRepoIds, AllGroupedRepoIds);
  }


  return {
    type: ActionTypes.GENERATE_RESULT_REPO_IDS,
    repoIds
  };
};