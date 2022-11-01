import { ChangeEvent, FormEvent, useState } from 'react';
import AuthService from '../../service/auth';

type SignupProps = {
  authService: AuthService;
};

export default function Signup({ authService }: SignupProps) {
  const [signupValues, setSignupValues] = useState({ email: '', password: '' });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(signupValues);

    authService
      .signup(signupValues.email, signupValues.password)
      .then(console.log);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignupValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        name='email'
        value={signupValues.email}
        onChange={handleChange}
        placeholder='Email'
        required
      />
      <input
        type='password'
        name='password'
        value={signupValues.password}
        onChange={handleChange}
        placeholder='Password'
        minLength={6}
        required
      />
      <button type='submit'>회원가입</button>
    </form>
  );
}
