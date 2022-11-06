import { Route, Routes } from 'react-router-dom';
import './App.css';
import CreateArticle from './pages/CreateArticle/CreateArticle';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import AuthService from './service/auth';

type AppProps = {
  authService: AuthService;
};

function App({ authService }: AppProps) {
  return (
    <Routes>
      <Route path='/' element={<Home authService={authService} />} />
      <Route path='signup' element={<Signup authService={authService} />} />
      <Route path='login' element={<Login authService={authService} />} />
      <Route
        path='/create'
        element={<CreateArticle authService={authService} />}
      />
    </Routes>
  );
}

export default App;
