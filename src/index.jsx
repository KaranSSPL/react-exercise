import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import './css/movieDetail.css';
import App from './app.jsx';

const body = ReactDOM.createRoot(document.getElementById('body'));
body.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
