import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleList from '../../components/ArticleList/ArticleList';
import Header from '../../components/Header/Header';
import AuthService from '../../service/auth';

type HomeProps = {
  authService: AuthService;
};

export default function Home({ authService }: HomeProps) {
  const [addBtn, setAddBtn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    authService.onAuthChange((user) => {
      user ? setAddBtn(true) : setAddBtn(false);
    });
  });

  return (
    <>
      <Header authService={authService} />
      {addBtn && <button onClick={() => navigate('/create')}>글쓰기</button>}
      <ArticleList />
    </>
  );
}
