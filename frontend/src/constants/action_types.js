var keyMirror = require('keymirror');

module.exports = keyMirror({

  // 请求starred仓库
  REQUEST_STARRED: null,
  // 接收starred仓库
  RECEIVE_STARRED: null,
  // 请求starred仓库失败
  FETCH_STARRED_FAIL: null,

  // 请求本地starred仓库
  REQUEST_LOCAL_STARRED: null,
  // 接收本地starred仓库
  RECEIVE_LOCAL_STARRED: null,
  // 请求本地仓库失败
  FETCH_LOCAL_STARRED_FAIL: null,

  // 请求仓库的readme文档
  REQUEST_README: null,
  // 接收仓库的readme文档
  RECEIVE_README: null,
  // 请求仓库的readme文档失败
  FETCH_README_FAIL: null

});
