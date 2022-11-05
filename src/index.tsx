import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthService from './service/auth';
import { BrowserRouter } from 'react-router-dom';
import { ArticleProvider } from './context/ArticleContext';

const authService = new AuthService();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ArticleProvider>
      <BrowserRouter>
        <App authService={authService} />
      </BrowserRouter>
    </ArticleProvider>
  </React.StrictMode>
);

reportWebVitals();
