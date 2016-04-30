/**********************************************
 * Created by liangshaofeng on 2016年4月29日
 * 仓库搜索结果列表
 **********************************************/

import React from 'react';
import './index.scss';

const RepoList = React.createClass({

  render: function () {

    return (
      <div className='repo-list-container'>
        <ul>
          {this.mapStarred()}
        </ul>
      </div>
    );
  },

  mapStarred: function () {
    let {repo:{starred}} = this.props;

    if (!starred) return null;

    return starred.map((repo, key)=> {
      let {owner:{login}, name} = repo;
      return (
        <li key={key} onClick={this.showReadme.bind(this,login,name)}>
          {repo.name}
        </li>
      );
    });
  },

  // 显示readme
  showReadme: function (owner, name) {
    let {readmeActions:{fetchReadme}} = this.props;
    fetchReadme(owner, name);
  }

});

module.exports = RepoList;