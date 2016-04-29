/**********************************************
 * Created by liangshaofeng on 2016年4月5日
 * 从state中拿数据绑定到prop上
 * 每次新建action文件或reducer文件都需要修改这个地方
 **********************************************/

import {bindActionCreators} from 'redux';
import actions from '../action/root_action';

const mapStateToProps = (state) => ({
  repo: state.repo
  // more
});

const mapDispatchToProps = (dispatch) => ({
  repoActions: bindActionCreators(actions.repo, dispatch)
  //more
});

module.exports = {
  mapStateToProps,
  mapDispatchToProps
};