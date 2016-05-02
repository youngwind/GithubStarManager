/**********************************************
 * Created by liangshaofeng on 2016年4月5日
 * 页头页脚部分
 **********************************************/

import React from 'react';
import {connect} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '../mixin/bind';
//import DevTools from '../components/DevTools'; // eslint-disable-line
import 'normalize.css';

var Layout = React.createClass({

  render: function () {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Layout);




