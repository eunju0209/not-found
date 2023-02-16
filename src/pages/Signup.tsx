import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/FirebaseContext';

export default function Signup() {
  const authService = useAuth();
  const navigate = useNavigate();
  const [signupValues, setSignupValues] = useState({ email: '', password: '' });
  const [isDuplicate, setIsDuplicate] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    authService
      .signup(signupValues.email, signupValues.password) //
      .then(() => {
        navigate('/login');
        setSignupValues({ email: '', password: '' });
        setIsDuplicate(false);
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setIsDuplicate(true);
        }
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setIsDuplicate(false);
    }
    setSignupValues((values) => ({ ...values, [name]: value }));
  };

  return (
    <section className='flex flex-col items-center w-full p-10 pb-3'>
      <h1 className='text-5xl font-bold text-slate-600 mb-7'>Signup</h1>
      <form className='flex flex-col w-3/12' onSubmit={handleSubmit}>
        <input
          className='text-lg p-2 border-solid border-2 border-slate-300 rounded-lg outline-none mb-2'
          type='email'
          name='email'
          value={signupValues.email}
          onChange={handleChange}
          placeholder='Email'
          required
        />
        {isDuplicate && (
          <p className='text-sm text-red-600 mb-3 text-center'>
            중복된 이메일입니다.
          </p>
        )}
        <input
          className='text-lg p-2 border-solid border-2 border-slate-300 rounded-lg outline-none mb-2'
          type='password'
          name='password'
          value={signupValues.password}
          onChange={handleChange}
          placeholder='Password'
          minLength={6}
          required
        />
        <button
          className='bg-main text-xl py-2 rounded-lg text-white font-bold'
          type='submit'
        >
          회원가입
        </button>
      </form>
    </section>
  );
}
