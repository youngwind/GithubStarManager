/**********************************************
 * Created by liangshaofeng on 2016年4月30日
 * 分组相关
 **********************************************/


import fetch from 'isomorphic-fetch';
import ActionTypes from '../constants/action_types';
import Config from '../config.js';
import Utils from '../mixin/utils';

exports.requestGroupInfo = function (userName) {
  return {
    type: ActionTypes.REQUEST_GROUP_INFO,
    userName
  };
};

exports.receivedGroupInfo = function (userName, res) {
  return {
    type: ActionTypes.RECEIVE_GROUP_INFO,
    group: res.data
  };
};

exports.fetchGroupInfo = function (userName) {
  return function (dispatch) {
    dispatch(exports.requestGroupInfo(userName));
    return fetch(`${Config.api}/group/${userName}/all`)
      .then(Utils.checkStatus)
      .then(res => res.json())
      .then(Utils.checkCode)
      .then(json => dispatch(exports.receivedGroupInfo(userName, json)))
      .catch(err => {
        console.log(err);  // eslint-disable-line
        dispatch(exports.fetchGroupInfoFail());
      });
  };
};

exports.fetchGroupInfoFail = function () {
  return {
    type: ActionTypes.FETCH_GROUP_INFO_FAIL
  };
};

/**
 * 设置仓库分组
 * @returns {{type: null}}
 */
exports.setRepoGroup = function (userName, repoId, groupId) {
  return function () {
    return fetch(`${Config.api}/group/${userName}/repo/${repoId}/group/${groupId}`, {
      method: 'post'
    })
      .then(Utils.checkStatus)
      .then(res => res.json())
      .then(Utils.checkCode);
  };
};