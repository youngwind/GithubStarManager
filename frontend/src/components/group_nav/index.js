/**********************************************
 * Created by liangshaofeng on 2016年5月1日
 * 左侧分组导航
 **********************************************/

import React from 'react';

const GroupNav = React.createClass({

  getInitialState: function () {
    return {
      addActive: false
    }
  },

  render: function () {
    return (
      <div>
        <h3>分组</h3>
        {this.returnGroups()}
        {this.state.addActive ?
          <input type="text" placeholder="input something" onKeyUp={this.handleAddRepoGroup}/> :
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
        <li key={key}>
          <span>{group.name}</span>
          <span>({length})</span>
        </li>
      );
    });


    let ungroupedRepoNumber = repo.starred.length - groupedRepoNumber;

    return (
      <ul>
        <li>
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
    })
  },

  handleAddRepoGroup: function (e) {
    let {groupActions:{addRepoGroup}, params:{userName}} = this.props;
    let groupName = e.target.value.trim();
    if (e.which === 13) {
      if (!groupName) return;
      addRepoGroup(userName, groupName);
      this.setState({
        addActive: false
      })
    }
  }

});

module.exports = GroupNav;