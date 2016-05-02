/**********************************************
 * Created by liangshaofeng on 2016年4月5日
 * 练习首页
 **********************************************/

import React from 'react';
import {connect} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '../mixin/bind';
import UserInfo from '../components/user_info'; // eslint-disable-line
import SearchRepo from '../components/search_repo';  // eslint-disable-line
import RepoList from '../components/repo_list'; // eslint-disable-line
import ReadMe from '../components/readme'; // eslint-disable-line
import SetGroup from '../components/set_group'; // eslint-disable-line
import GroupNav from '../components/group_nav'; // eslint-disable-line

let find = require('lodash.find');

import '../mixin/basic.scss';

const Index = React.createClass({

  render: function () {

    return (
      <div className='index-container'>
        <div className='clear-fix top-area-container'>
          <UserInfo {...this.props}/>
        </div>
        <div className='classify-nav-container'>
          <GroupNav {...this.props}/>
        </div>
        <RepoList {...this.props}/>
        <div className='repo-detail-container'>
          <div className="repo-basic-info-container">
            <SetGroup {...this.props}/>
            {this.returnRepoUrl()}
          </div>
          <ReadMe {...this.props} />
        </div>
      </div>
    );
  },

  componentDidMount: function () {
    let {params:{userName, repoId}, repoActions:{fetchLocalStarredRepos}} = this.props;
    let {readmeActions:{fetchReadme}, groupActions:{fetchGroupInfo}} = this.props;
    fetchLocalStarredRepos(userName);
    fetchGroupInfo(userName);

    if (repoId) {
      fetchReadme(null, null, repoId);
    }
  },

  returnRepoUrl: function () {
    let {params:{repoId}, repo:{starred}} = this.props;
    console.log(repoId)
    let currentRepo = find(starred, {id: repoId * 1});
    console.log(currentRepo)

    if (!currentRepo) return null;
    return (
      <a href={currentRepo.html_url} target="_blank">{currentRepo.html_url}</a>
    );
  }


});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Index);




