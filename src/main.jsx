import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// Create the root element and render the React application. Wrapping the
// application in BrowserRouter allows the use of client‑side routing via
// react-router-dom. StrictMode is omitted here to keep the console output
// clean when users run `npm run dev`.
const rootEl = document.getElementById('root');
ReactDOM.createRoot(rootEl).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <App />
  </BrowserRouter>
);