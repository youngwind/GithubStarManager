/**********************************************
 * Created by liangshaofeng on 2016年4月5日
 * 练习首页
 **********************************************/

import React from 'react';
import {connect} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '../mixin/bind';
import UserInfo from '../components/user_info'; // eslint-disable-line
import SearchRepo from '../components/search_repo';  // eslint-disable-line
import '../mixin/basic.scss';

const Index = React.createClass({

  render: function () {

    return (
      <div>
        <div className='clear-fix'>
          <UserInfo {...this.props}/>
          <SearchRepo />
        </div>
        {this.mapStarred()}
      </div>
    );
  },

  componentDidMount: function () {
    let {params:{userName}, repoActions:{fetchStarredRepos}} = this.props;
    fetchStarredRepos(userName);
  },

  mapStarred: function () {
    let {repo:{starred}} = this.props;

    if (!starred) return null;

    return starred.map((repo, key)=> {
      return (
        <p key={key}>
          {repo.name}
        </p>
      );
    });
  }


});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Index);




