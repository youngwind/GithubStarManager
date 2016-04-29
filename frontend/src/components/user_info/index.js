/**********************************************
 * Created by liangshaofeng on 2016年4月29日
 * 用户信息区域
 **********************************************/

import React from 'react';
import './index.scss';

const UserInfo = React.createClass({

  render: function () {
    let {params:{userName}} = this.props;
    return (
      <div className='user-info-container'>
        <p>
          <span>用户名:</span>
          <span>{userName}</span>
        </p>
      </div>
    );
  }
});

module.exports = UserInfo;