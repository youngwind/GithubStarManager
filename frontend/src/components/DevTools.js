import React from 'react';  // eslint-disable-line
import {createDevTools} from 'redux-devtools';
import DockMonitor from 'redux-devtools-dock-monitor'; // eslint-disable-line
import LogMonitor from 'redux-devtools-log-monitor'; // eslint-disable-line

export default createDevTools(
  <DockMonitor toggleVisibilityKey='ctrl-h'
               changePositionKey='ctrl-q'
               changeMonitorKey='ctrl-m'>
    <LogMonitor />
  </DockMonitor>
);