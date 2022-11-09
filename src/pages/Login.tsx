import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/FirebaseContext';

export default function Login() {
  const authService = useAuth();
  const navigate = useNavigate();
  const [loginValues, setLoginValues] = useState({ email: '', password: '' });

  const goToHome = useCallback(
    (userId: string) => {
      navigate('/', { state: { id: userId } });
    },
    [navigate]
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    authService
      .login(loginValues.email, loginValues.password)
      .then((data) => goToHome(data.user.uid));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGoogleLogin = () => {
    authService
      .googleLogin() //
      .then((data) => goToHome(data.user.uid));
  };

  useEffect(() => {
    authService.onAuthChange((user) => {
      user && goToHome(user.uid);
    });
  }, [authService, goToHome]);

  return (
    <section className='flex flex-col items-center w-full p-10 pb-3'>
      <h1 className='text-5xl font-bold text-slate-600 mb-7'>Login</h1>
      <form className='flex flex-col w-3/12' onSubmit={handleSubmit}>
        <input
          className='text-lg p-2 border-solid border-2 border-slate-300 rounded-lg outline-none mb-2'
          type='email'
          name='email'
          placeholder='Email'
          onChange={handleChange}
        />
        <input
          className='text-lg p-2 border-solid border-2 border-slate-300 rounded-lg outline-none mb-2'
          type='password'
          name='password'
          placeholder='Password'
          onChange={handleChange}
        />
        <button
          className='bg-slate-400 text-xl py-2 rounded-lg text-white font-bold'
          type='submit'
        >
          로그인
        </button>
      </form>
      <div className='flex justify-around w-3/12 mt-3'>
        <button
          className='w-36 bg-main py-2 rounded-lg text-white font-bold'
          onClick={handleGoogleLogin}
        >
          Google 로그인
        </button>
        <button
          className='w-36 bg-main py-2 rounded-lg text-white font-bold'
          onClick={() => navigate('/signup')}
        >
          회원가입
        </button>
      </div>
    </section>
  );
}
