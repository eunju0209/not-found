import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../service/auth';

type SignupProps = {
  authService: AuthService;
};

export default function Signup({ authService }: SignupProps) {
  const [signupValues, setSignupValues] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    authService
      .signup(signupValues.email, signupValues.password) //
      .then(() => {
        navigate('/login');
        setSignupValues({ email: '', password: '' });
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignupValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className='flex flex-col items-center w-full'>
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
