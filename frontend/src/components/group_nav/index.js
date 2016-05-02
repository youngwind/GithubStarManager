/**********************************************
 * Created by liangshaofeng on 2016年5月1日
 * 左侧分组导航
 **********************************************/

import React from 'react';
import './index.scss';

const GroupNav = React.createClass({

  getInitialState: function () {
    return {
      addActive: false
    };
  },

  render: function () {
    return (
      <div className='group-nav-container'>
        <h3>分组:</h3>
        {this.returnGroups()}
        {this.state.addActive ?
          <input autoFocus type="text" placeholder="group name" onKeyUp={this.handleAddRepoGroup} className='add-group-input'/> :
          <button onClick={this.showAddInput}>添加分类</button>
        }
      </div>
    );
  },

  returnGroups: function () {
    let {group:{group}, repo} = this.props;

    if (!group) return null;

    let groupedRepoNumber = 0;
    let groups = group.map((group, key)=> {
      let length = group.repoIds.length;
      groupedRepoNumber = groupedRepoNumber + length;
      return (
        <li key={key} onClick={this.searchThisGroup.bind(this,group.id)}>
          <span>{group.name}</span>
          <span>({length})</span>
        </li>
      );
    });


    let ungroupedRepoNumber = repo.starred.length - groupedRepoNumber;

    return (
      <ul className='group-nav-list'>
        <li onClick={this.searchThisGroup.bind(this,0)}>
          <span>未分组</span>
          <span>({ungroupedRepoNumber})</span>
        </li>
        {groups}
      </ul>
    );
  },

  showAddInput: function () {
    this.setState({
      addActive: true
    });
  },

  handleAddRepoGroup: function (e) {
    let {groupActions:{addRepoGroup}, params:{userName}} = this.props;
    let groupName = e.target.value.trim();
    if (e.which === 13) {
      if (!groupName) return;
      addRepoGroup(userName, groupName);
      this.setState({
        addActive: false
      });
    }
  },

  searchThisGroup: function (groupId) {
    let {searchActions:{addOrReplaceSearchGroup, generateResultRepoIds}} = this.props;
    addOrReplaceSearchGroup(groupId);
    generateResultRepoIds();
  }

});

module.exports = GroupNav;