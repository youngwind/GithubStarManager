/**********************************************
 * Created by liangshaofeng on 2016年4月5日
 * 欢迎页面
 **********************************************/

import React from 'react';
import {Link} from 'react-router';
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
    let {repoActions:{fetchStarredRepos}} = this.props;
    if (e.which === 13) {
      let userName = e.target.value.trim();
      // press enter
      (async() => {
        let {starred} = await fetchStarredRepos(userName);
        this.props.history.push(`/${userName}`);
      })()

    }
  },

  componentDidMount: function () {
    this.refs.inputUserName.focus();
    console.log(window.location.href);  // eslint-disable-line
  }
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Welcome);
