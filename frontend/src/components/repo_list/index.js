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
      return (
        <li key={key}>
          <a href={repo.html_url} target="_blank"> {repo.name}</a>
        </li>
      );
    });
  }

});

module.exports = RepoList;