/**********************************************
 * Created by liangshaofeng on 2016年4月3日
 * 处理练习相关,每做一次算是一个新的test
 **********************************************/


var ActionTypes = require('../constants/action_types');

function repo(state = {isFetching: false}, action) {
  switch (action.type) {
    case ActionTypes.REQUEST_STARRED:
      return {
        ...state,
        isFetching: true
      };
    case ActionTypes.RECEIVE_STARRED:
      return {
        ...state,
        isFetching: false
      };
    case ActionTypes.FETCH_STARRED_FAIL:
      return {
        ...state,
        isFetching: false,
        fetchFail: true
      };
    case ActionTypes.REQUEST_LOCAL_STARRED:
      return {
        ...state,
        isFetching: true
      };
    case ActionTypes.RECEIVE_LOCAL_STARRED:
      return {
        ...state,
        isFetching: false,
        starred: {
          ...action.starred
        }
      };
    default :
      return state;
  }
}

module.exports = repo;

