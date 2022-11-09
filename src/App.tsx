import { Outlet } from 'react-router-dom';
import SearchHeader from './components/SearchHeader';
import { FirebaseProvider } from './context/FirebaseContext';

function App() {
  return (
    <FirebaseProvider>
      <SearchHeader />
      <div className='flex flex-col justify-center w-full max-w-screen-xl px-3'>
        <Outlet />
      </div>
    </FirebaseProvider>
  );
}

export default App;
