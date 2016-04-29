/**********************************************
 * Created by liangshaofeng on 2016年4月5日
 * 练习首页
 **********************************************/

import React from 'react';
import {connect} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '../mixin/bind';

const Index = React.createClass({

  render: function () {

    return (
      <div>
        {this.mapStarred()}
      </div>
    )
  },

  componentDidMount: function () {
    console.log(window.location.href);
  },

  mapStarred: function () {
    let {repo:{starred}} = this.props;

    console.log(starred);

    // if (!starred) return null;

    return starred.map((repo, key)=> {
      return (
        <p key={key}>
          {repo.name}
        </p>
      );
    });
  }


});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Index);




