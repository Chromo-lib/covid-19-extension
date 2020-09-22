import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { GlobalStateProvider } from './state/GlobalState';

localStorage.setItem('theme', 'dark');
let theme = localStorage.getItem('theme');

const htmlTag = document.getElementsByTagName("html")[0];

htmlTag.dataset.theme = theme && theme === 'light' ? 'light' : 'dark'


ReactDOM.render(
  <React.StrictMode>
    <GlobalStateProvider><App /></GlobalStateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
