import { Outlet } from 'react-router-dom';
import SearchHeader from './components/SearchHeader';
import { PostRepositoryProvider } from './context/PostRepositoryContext';
import AuthService from './service/auth';

type AppProps = {
  authService: AuthService;
};

function App({ authService }: AppProps) {
  return (
    <>
      <SearchHeader authService={authService} />
      <PostRepositoryProvider>
        <div className='flex flex-col justify-center w-full max-w-screen-xl h-full min-h-0'>
          <Outlet />
        </div>
      </PostRepositoryProvider>
    </>
  );
}

export default App;
