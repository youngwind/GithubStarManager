/**********************************************
 * Created by liangshaofeng on 2016年4月30日
 * readme组件
 **********************************************/

import React from 'react';
import './index.scss';
import ReactMarkDown from 'react-markdown'; // eslint-disable-line

const ReadMe = React.createClass({

  render: function () {


    let {params:{owner, repo}, readme} = this.props;

    if (!owner || !repo || !readme[owner] || !readme[owner][repo]) return null;

    let {content} = readme[owner][repo];

    return (
      <div className='readme-container'>
        <ReactMarkDown source={atob(content)}/>
      </div>
    );
  }
});

module.exports = ReadMe;