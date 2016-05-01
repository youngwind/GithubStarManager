/**********************************************
 * Created by liangshaofeng on 2016年4月5日
 * 欢迎页面
 **********************************************/

import React from 'react';
import {connect} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '../mixin/bind';
import classNames from 'classnames';
import {Icon} from 'antd';  // eslint-disable-line

var Welcome = React.createClass({

  getInitialState: function () {
    return {
      invalidInput: false
    };
  },

  render: function () {
    let {repo:{isFetching}} = this.props;
    let inputClassName = classNames({
      'input-your-user-name': true,
      'error': this.state.invalidInput
    });


    return (
      <div className='welcome-container'>
        <h1>Welcome to GithubStarManager</h1>
        <h2>please input your username</h2>
        {
          isFetching ? <Icon type="loading"/> :
            <input type='text' onKeyUp={this.getStarred} autoFocus={true} className={inputClassName}/>
        }
      </div>
    );
  },


  getStarred: function (e) {
    let {repoActions:{fetchStarredRepos}, history} = this.props;
    let userName = e.target.value.trim();

    if (e.which === 13) {

      if (!userName) {
        this.setState({
          invalidInput: true
        });
        return;
      }

      // press enter
      (async() => {
        await fetchStarredRepos(userName);
        history.push(`/${userName}`);
      })();
    }
  }

});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Welcome);
