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
    let {repo:{starred}, search:{repoIds}} = this.props;

    if (!starred) return null;

    return starred.map((repo, key)=> {
      let {owner:{login}, name, id} = repo;
      
      if (repoIds && !repoIds.includes(id))return null;

      return (
        <li key={key} onClick={this.showReadme.bind(this,login,name,id)}>
          {repo.name}
        </li>
      );
    });
  },

  // 显示readme
  showReadme: function (owner, repo, repoId) {
    let {readmeActions:{fetchReadme}, history, params:{userName}} = this.props;
    (async()=> {
      await fetchReadme(owner, repo, repoId);
      history.push(`/${userName}/${repoId}`);
    })();

  }

});

module.exports = RepoList;