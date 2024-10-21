import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css'; // Your main CSS
import './css/bootstrap.css'; // Bootstrap styles
// import './css/font-awesome.min.css'; // Font Awesome styles
import './css/responsive.css'; // Responsive design styles
import './css/style.css'; // Additional custom styles
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: For performance measuring
reportWebVitals();
