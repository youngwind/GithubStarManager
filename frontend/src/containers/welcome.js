/**********************************************
 * Created by liangshaofeng on 2016年4月5日
 * 欢迎页面
 **********************************************/

import React from 'react';
import {connect} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '../mixin/bind';

var Welcome = React.createClass({

  render: function () {
    let {repo:{isFetching}} = this.props;
    return (
      <div>
        <h1>Welcome to GithubStarManager</h1>
        <h2>please input your username</h2>
        <input type="text" onKeyUp={this.getStarred} ref="inputUserName"/>
        <p>{isFetching ? '加载中请稍后' : ''}</p>
      </div>
    );
  },

  getStarred: function (e) {
    let {repoActions:{fetchStarredRepos}, history} = this.props;
    if (e.which === 13) {
      let userName = e.target.value.trim();
      // press enter
      (async() => {
        await fetchStarredRepos(userName);
        history.push(`/${userName}`);
      })();
    }
  },

  componentDidMount: function () {
    this.refs.inputUserName.focus();
  }
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Welcome);
