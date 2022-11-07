import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { PostProvider } from './context/PostContext';
import AuthService from './service/auth';

type AppProps = {
  authService: AuthService;
};

function App({ authService }: AppProps) {
  return (
    <>
      <Header authService={authService} />
      <PostProvider>
        <Outlet />
      </PostProvider>
    </>
  );
}

export default App;
