import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import PrizeArcade from './Prize-Arcade';

const root = ReactDOM.createRoot(document.getElementById('root'));
//Adding  this line for git activity
root.render(
  <React.StrictMode>
    <PrizeArcade />
  </React.StrictMode>
);

