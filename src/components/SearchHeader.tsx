import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AuthService from '../service/auth';
import { BsFillExclamationCircleFill, BsSearch } from 'react-icons/bs';

type HeaderProps = {
  authService: AuthService;
};

export default function SearchHeader({ authService }: HeaderProps) {
  const { keyword } = useParams();
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId('');
      }
    });
  }, [authService]);

  useEffect(() => setText(keyword || ''), [keyword]);

  const handleLogout = () => {
    authService.logout();
    setUserId('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim().length === 0) {
      return;
    }
    navigate(`posts/${text}`);
  };

  return (
    <header className='w-full flex p-4 bg-slate-200 justify-between'>
      <Link to='/' className='flex items-center text-3xl'>
        <BsFillExclamationCircleFill className='text-main' />
        <h1 className='font-bold ml-1 text-slate-600'>NotFound</h1>
      </Link>
      <form className='w-7/12 flex justify-center px-4' onSubmit={handleSubmit}>
        <input
          className='w-full py-2 px-3 outline-none rounded-l-full'
          type='text'
          placeholder='Search'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className='px-6 bg-main text-white rounded-r-full'
          type='submit'
        >
          <BsSearch />
        </button>
      </form>
      {userId ? (
        <button
          className='bg-slate-400 hover:bg-main px-3 rounded-md text-white font-bold transition-all'
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
        <button
          className='bg-slate-400 hover:bg-main px-3 rounded-md text-white font-bold transition-all'
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      )}
    </header>
  );
}
