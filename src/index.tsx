import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthService from './service/auth';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Posts from './components/Posts';
import PostDetail from './pages/PostDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NewPost from './pages/NewPost';

const authService = new AuthService();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App authService={authService} />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Posts authService={authService} /> },
      { path: 'posts', element: <Posts authService={authService} /> },
      { path: 'posts/:keyword', element: <Posts authService={authService} /> },
      { path: 'posts/detail/:postId', element: <PostDetail /> },
      { path: 'login', element: <Login authService={authService} /> },
      { path: 'signup', element: <Signup authService={authService} /> },
      { path: 'newpost', element: <NewPost authService={authService} /> },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
