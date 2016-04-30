/**********************************************
 * Created by liangshaofeng on 2016年4月30日
 * 设置分组
 **********************************************/

import React from 'react';

const SetGroup = React.createClass({

  render: function () {
    return (
      <div className='set-group-container'>
        {this.returnOptions()}
      </div>
    );
  },

  returnOptions: function () {

    let {group:{group}, params:{repoId}} = this.props;

    if (!group) return null;

    if (!group.length) {
      return (
        <select>
          <option disabled>无分组</option>
        </select>
      );
    }

    let repoGroupId = null;
    let options = group.map((group, key)=> {

      // 获取当前仓库所属分组id
      if (!repoGroupId) {
        repoGroupId = group.repoIds.includes(repoId) ? group.id : null;
      }

      return (
        <option value={group.id} key={key}>{group.name}</option>
      );
    });

    return (
      <select defaultValue={repoGroupId ? repoGroupId : 'null'}>
        <option value="null" disabled>未分组</option>
        {options}
      </select>
    );


  }
});

module.exports = SetGroup;