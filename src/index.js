import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom"
import CryptoContext from './CryptoContext';
import 'react-alice-carousel/lib/alice-carousel.css';

ReactDOM.render(
  <Router>
    <CryptoContext>
      <App />
    </CryptoContext>
  </Router>,
  document.getElementById('root')
);
