/**********************************************
 * Created by liangshaofeng on 2016年4月30日
 * 设置分组
 **********************************************/

import React from 'react';
import './index.scss';

const SetGroup = React.createClass({

  render: function () {
    let {group:{group}, params:{repoId}} = this.props;

    if (!group) return null;

    if (!group.length) {
      return (
        <select onChange={this.setRepoGroup} className='set-group'>
          <option disabled>无分组</option>
        </select>
      );
    }

    let repoGroupId = null;
    let options = group.map((group, key)=> {

      // 获取当前仓库所属分组id
      if (!repoGroupId) {
        repoGroupId = group.repoIds.includes(repoId * 1) ? group.id : null;
      }

      return (
        <option value={group.id} key={key}>{group.name}</option>
      );
    });

    return (
      <select value={repoGroupId ? repoGroupId : 'null'} onChange={this.setRepoGroup} className='set-group'>
        <option value="null" disabled>未分组</option>
        {options}
      </select>
    );
  },
  
  setRepoGroup: function (e) {
    let {groupActions:{setRepoGroup, fetchGroupInfo}} = this.props;
    let {params:{userName, repoId}} = this.props;
    let groupId = e.target.value;
    (async()=> {
      await setRepoGroup(userName, repoId, groupId);
      fetchGroupInfo(userName);
    })();
  }

});

module.exports = SetGroup;