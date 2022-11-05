import { ArticleType } from '../../context/ArticleContext';

type ArticleProps = {
  article: ArticleType;
};

export default function Article({ article }: ArticleProps) {
  const { title, content } = article;
  return (
    <li>
      <h3>{title}</h3>
      <p>{content}</p>
    </li>
  );
}
