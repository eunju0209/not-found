import { ChangeEvent, FormEvent, useState } from 'react';
import AuthService from '../../service/auth';

type LoginProps = {
  authService: AuthService;
};

export default function Login({ authService }: LoginProps) {
  const [loginValues, setLoginValues] = useState({ email: '', password: '' });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    authService
      .login(loginValues.email, loginValues.password)
      .then(console.log);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        name='email'
        placeholder='Email'
        onChange={handleChange}
      />
      <input
        type='password'
        name='password'
        placeholder='Password'
        onChange={handleChange}
      />
      <button type='submit'>로그인</button>
    </form>
  );
}
