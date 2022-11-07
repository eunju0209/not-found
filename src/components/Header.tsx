import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../service/auth';

type HeaderProps = {
  authService: AuthService;
};

export default function Header({ authService }: HeaderProps) {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId('');
      }
    });
  }, [authService]);

  const handleLogout = () => {
    authService.logout();
    setUserId('');
  };

  return (
    <header>
      {userId ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={() => navigate('/login')}>Login</button>
      )}
    </header>
  );
}
