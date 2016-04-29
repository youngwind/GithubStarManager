/**********************************************
 * Created by liangshaofeng on 2016年4月29日
 * 搜索框
 **********************************************/

import React from 'react';
import './index.scss';

const SearchRepo = React.createClass({

  render: function () {
    return (
      <div className='search-repo-container'>
        <input type="text" placeholder="search repo...."/>
      </div>
    );
  }
});

module.exports = SearchRepo;