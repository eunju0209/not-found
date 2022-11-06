import { useArticleState } from '../../context/ArticleContext';
import Article from '../Article/Article';

export default function ArticleList() {
  const articles = useArticleState();

  return (
    <ul>
      {articles.map((article) => (
        <Article key={article.id} article={article} />
      ))}
    </ul>
  );
}
