import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { GlobalStateProvider } from './state/GlobalState';

ReactDOM.render(
  <GlobalStateProvider><App /></GlobalStateProvider>,
  document.getElementById('root')
);
