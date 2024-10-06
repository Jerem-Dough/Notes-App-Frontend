import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';  // Optional: Your custom styles

// Render the root App component to the DOM
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')  // Renders into the div with id 'root' in public/index.html
);
