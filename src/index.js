import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import './index.css';
import AppRouter from './AppRouter'; // Import your AppRouter component

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRouter /> {/* Render your AppRouter component inside BrowserRouter */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
