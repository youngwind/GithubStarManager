/**********************************************
 * Created by liangshaofeng on 2016年4月30日
 * readme文档相关
 **********************************************/

import fetch from 'isomorphic-fetch';
import ActionTypes from '../constants/action_types';
import Config from '../config.js';
import Utils from '../mixin/utils';

exports.requestReadme = function (owner, repo, repoId) {
  return {
    type: ActionTypes.REQUEST_README,
    owner,
    repo,
    repoId
  };
};

exports.receivedReadme = function (owner, repo, repoId, res) {
  return {
    type: ActionTypes.RECEIVE_README,
    owner,
    repo,
    repoId,
    content: res.data
  };
};

exports.fetchReadme = function (owner, repo, repoId) {
  return function (dispatch) {
    dispatch(exports.requestReadme(owner, repo, repoId));
    return fetch(`${Config.api}/readme/${owner}/${repo}?repoId=${repoId}`)
      .then(Utils.checkStatus)
      .then(res => res.json())
      .then(Utils.checkCode)
      .then(json => dispatch(exports.receivedReadme(owner, repo, repoId, json)))
      .catch(err => {
        console.log(err);  // eslint-disable-line
        dispatch(exports.fetchReadmeFail());
      });
  };
};

exports.fetchReadmeFail = function () {
  return {
    type: ActionTypes.FETCH_README_FAIL
  };
};