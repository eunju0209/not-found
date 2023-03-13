import { Outlet } from 'react-router-dom';
import SearchHeader from './components/SearchHeader';

function App() {
  return (
    <>
      <SearchHeader />
      <div className='flex flex-col justify-center w-full max-w-screen-xl px-3'>
        <Outlet />
      </div>
    </>
  );
}

export default App;
