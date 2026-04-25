import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CepProvider } from './contexts/CepContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CepProvider>
      <App />
    </CepProvider>
  </React.StrictMode>
);