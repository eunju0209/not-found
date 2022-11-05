import ArticleList from '../../components/ArticleList/ArticleList';
import Header from '../../components/Header/Header';
import AuthService from '../../service/auth';

type HomeProps = {
  authService: AuthService;
};

export default function Home({ authService }: HomeProps) {
  return (
    <>
      <Header authService={authService} />
      <ArticleList />
    </>
  );
}
