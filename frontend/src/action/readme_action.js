/**********************************************
 * Created by liangshaofeng on 2016年4月30日
 * readme文档相关
 **********************************************/

import fetch from 'isomorphic-fetch';
import ActionTypes from '../constants/action_types';
import Config from '../config.js';
import Utils from '../mixin/utils';

exports.requestReadme = function (owner, repo) {
  return {
    type: ActionTypes.REQUEST_README,
    owner,
    repo
  };
};

exports.receivedReadme = function (owner, repo, res) {
  return {
    type: ActionTypes.RECEIVE_README,
    owner,
    repo,
    content: res.data
  };
};

exports.fetchReadme = function (owner, repo) {
  return function (dispatch) {
    dispatch(exports.requestReadme(owner, repo));
    return fetch(`${Config.api}/readme/${owner}/${repo}`)
      .then(Utils.checkStatus)
      .then(res => res.json())
      .then(Utils.checkCode)
      .then(json => dispatch(exports.receivedReadme(owner, repo, json)))
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