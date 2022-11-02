import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../service/auth';

type LoginProps = {
  authService: AuthService;
};

export default function Login({ authService }: LoginProps) {
  const [loginValues, setLoginValues] = useState({ email: '', password: '' });
  const navigate = useNavigate();

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
    <section>
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
      <button onClick={handleGoogleLogin}>Google 로그인</button>
    </section>
  );
}
