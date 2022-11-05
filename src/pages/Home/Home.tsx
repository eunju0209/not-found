import { useNavigate } from 'react-router-dom';
import ArticleList from '../../components/ArticleList/ArticleList';
import Header from '../../components/Header/Header';
import AuthService from '../../service/auth';

type HomeProps = {
  authService: AuthService;
};

export default function Home({ authService }: HomeProps) {
  const navigate = useNavigate();
  return (
    <>
      <Header authService={authService} />
      <button onClick={() => navigate('/create')}>글쓰기</button>
      <ArticleList />
    </>
  );
}
