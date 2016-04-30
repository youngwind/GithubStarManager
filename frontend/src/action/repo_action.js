/**********************************************
 * Created by liangshaofeng on 2016年4月3日
 * 处理跟练习相关的
 **********************************************/

import fetch from 'isomorphic-fetch';
import ActionTypes from '../constants/action_types';
import Config from '../config.js';
import Utils from '../mixin/utils';

exports.requestStarredRepos = function (userName) {
  return {
    type: ActionTypes.REQUEST_STARRED,
    userName
  };
};

exports.receivedStarredRepos = function (userName, res) {
  return {
    type: ActionTypes.RECEIVE_STARRED,
    userName,
    starred: res.data
  };
};


exports.fetchStarredRepos = function (userName) {
  return function (dispatch) {
    dispatch(exports.requestStarredRepos(userName));
    return fetch(`${Config.api}/repo/${userName}/starred`)
      .then(Utils.checkStatus)
      .then(res => res.json())
      .then(Utils.checkCode)
      .then(json => dispatch(exports.receivedStarredRepos(userName, json)))
      .catch(err => {
        console.log(err);  // eslint-disable-line
        dispatch(exports.fetchStarredFail());
      });
  };
};

exports.fetchStarredFail = function () {
  return {
    type: ActionTypes.FETCH_STARRED_FAIL
  };
};


exports.requestLocalStarredRepos = function (userName) {
  return {
    type: ActionTypes.REQUEST_LOCAL_STARRED,
    userName
  };
};

exports.receivedLocalStarredRepos = function (userName, res) {
  return {
    type: ActionTypes.RECEIVE_LOCAL_STARRED,
    userName,
    starred: res.data
  };
};


exports.fetchLocalStarredRepos = function (userName) {
  return function (dispatch) {
    dispatch(exports.requestLocalStarredRepos(userName));
    return fetch(`${Config.api}/repo/${userName}/localStarred`)
      .then(Utils.checkStatus)
      .then(res => res.json())
      .then(Utils.checkCode)
      .then(json => dispatch(exports.receivedLocalStarredRepos(userName, json)))
      .catch(err => {
        console.log(err);  // eslint-disable-line
        dispatch(exports.fetchLocalStarredFail());
      });
  };
};

exports.fetchLocalStarredFail = function () {
  return {
    type: ActionTypes.FETCH_LOCAL_STARRED_FAIL
  };
};

