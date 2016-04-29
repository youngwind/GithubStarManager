/**********************************************
 * Created by liangshaofeng on 2016年4月5日
 * store定义
 **********************************************/

import {createStore, compose, applyMiddleware} from 'redux';
import rootReducer from '../reducers/root_reducer.js';
import thunkMiddleware from 'redux-thunk';
import DevTools from '../components/DevTools';

var createStoreWithMiddleware = compose(
  applyMiddleware(thunkMiddleware),
  DevTools.instrument(),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
)(createStore);

var store = createStoreWithMiddleware(rootReducer);

module.exports = store;