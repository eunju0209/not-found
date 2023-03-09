import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleLogin, login, onAuthChange } from '../service/auth';

export default function Login() {
  const navigate = useNavigate();
  const [loginValues, setLoginValues] = useState({ email: '', password: '' });
  const [isFailed, setIsFailed] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login(loginValues.email, loginValues.password) //
      .then(() => navigate('/'))
      .catch((err) => {
        if (
          err.code === 'auth/user-not-found' ||
          err.code === 'auth/wrong-password'
        ) {
          setIsFailed(true);
        }
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGoogleLogin = () => {
    googleLogin() //
      .then(() => navigate('/'))
      .catch(console.error);
  };

  useEffect(() => {
    onAuthChange((user) => {
      user && navigate('/');
    });
  }, [navigate]);

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
      {isFailed && <p>로그인 정보가 잘못되었습니다.</p>}
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
