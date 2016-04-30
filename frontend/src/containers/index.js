/**********************************************
 * Created by liangshaofeng on 2016年4月5日
 * 练习首页
 **********************************************/

import React from 'react';
import {connect} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '../mixin/bind';
import UserInfo from '../components/user_info'; // eslint-disable-line
import SearchRepo from '../components/search_repo';  // eslint-disable-line
import ClassifyNav from '../components/classify_nav'; // eslint-disable-line
import RepoList from '../components/repo_list'; // eslint-disable-line
import ReadMe from '../components/readme'; // eslint-disable-line
import SetGroup from '../components/set_group'; // eslint-disable-line

import '../mixin/basic.scss';

const Index = React.createClass({

  render: function () {

    return (
      <div>
        <div className='clear-fix'>
          <UserInfo {...this.props}/>
          <SearchRepo />
        </div>
        <ClassifyNav {...this.props}/>
        <RepoList {...this.props}/>
        <div className='repo-detail-container'>
          <SetGroup {...this.props}/>
          <ReadMe {...this.props} />
        </div>
      </div>
    );
  },

  componentDidMount: function () {
    let {params:{userName, owner, repo}, repoActions:{fetchLocalStarredRepos}} = this.props;
    let {readmeActions:{fetchReadme}} = this.props;
    fetchLocalStarredRepos(userName);

    if (owner && repo) {
      fetchReadme(owner, repo);
    }
  }


});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Index);




