/**********************************************
 * Created by liangshaofeng on 2016年4月30日
 * 处理分组相关
 **********************************************/

var ActionTypes = require('../constants/action_types');

function group(state = {isFetching: false}, action) {
  switch (action.type) {
    case ActionTypes.REQUEST_GROUP_INFO:
      return {
        ...state,
        isFetching: true
      };
    case ActionTypes.RECEIVE_GROUP_INFO:
      return {
        ...state,
        isFetching: false,
        group: action.group
      };
    case ActionTypes.FETCH_GROUP_INFO_FAIL:
      return {
        ...state,
        isFetching: false,
        fetchFail: true
      };
    default :
      return state;
  }
}

module.exports = group;

