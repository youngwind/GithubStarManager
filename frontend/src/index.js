import React from 'react';  // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';  // eslint-disable-line no-unused-vars
import store from './store/store.js';
var History = require('history');
var router = require('./router')(History.createHistory());

ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('root')
);