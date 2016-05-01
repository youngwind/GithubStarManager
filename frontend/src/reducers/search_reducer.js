/**********************************************
 * Created by liangshaofeng on 2016年5月1日
 * 处理搜索相关
 **********************************************/

var ActionTypes = require('../constants/action_types');

function search(state = {}, action) {
  switch (action.type) {
    case ActionTypes.ADD_OR_REPLACE_SEARCH_GROUP:
      return {
        ...state,
        group: action.selectedGroupId
      };
    case ActionTypes.GENERATE_RESULT_REPO_IDS:
      return {
        ...state,
        repoIds: action.repoIds
      };
    default :
      return state;
  }
}

module.exports = search;

