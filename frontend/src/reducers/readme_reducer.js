/**********************************************
 * Created by liangshaofeng on 2016年4月30日
 * 处理readme相关
 **********************************************/

var ActionTypes = require('../constants/action_types');

function readme(state = {isFetching: false}, action) {
  switch (action.type) {
    case ActionTypes.REQUEST_README:
      return {
        ...state,
        isFetching: true
      };
    case ActionTypes.RECEIVE_README:
      let {repoId, content} = action;
      return {
        ...state,
        isFetching: false,
        [repoId]: content
      };
    case ActionTypes.FETCH_README_FAIL:
      return {
        ...state,
        isFetching: false,
        fetchFail: true
      };
    default :
      return state;
  }
}

module.exports = readme;

