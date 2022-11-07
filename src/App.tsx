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
        <div className='flex flex-col justify-center w-full max-w-screen-xl h-full'>
          <Outlet />
        </div>
      </PostProvider>
    </>
  );
}

export default App;
