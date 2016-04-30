/**********************************************
 * Created by liangshaofeng on 2016年4月30日
 * readme组件
 **********************************************/

import React from 'react';
import './index.scss';
import ReactMarkDown from 'react-markdown'; // eslint-disable-line

const ReadMe = React.createClass({

  render: function () {


    let {params:{repoId}, readme} = this.props;

    if (!repoId || !readme[repoId]) return null;

    let {content} = readme[repoId];

    return (
      <div className='readme-container'>
        <ReactMarkDown source={atob(content)}/>
      </div>
    );
  }
});

module.exports = ReadMe;