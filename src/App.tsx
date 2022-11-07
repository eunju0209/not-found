import { Outlet } from 'react-router-dom';
import SearchHeader from './components/SearchHeader';
import { PostProvider } from './context/PostContext';
import AuthService from './service/auth';

type AppProps = {
  authService: AuthService;
};

function App({ authService }: AppProps) {
  return (
    <>
      <SearchHeader authService={authService} />
      <PostProvider>
        <div className='flex flex-col justify-center w-full max-w-screen-xl h-full min-h-0'>
          <Outlet />
        </div>
      </PostProvider>
    </>
  );
}

export default App;
