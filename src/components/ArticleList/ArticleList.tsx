import { useState } from 'react';
import { ArticleType } from '../../pages/Home/Home';
import Article from '../Article/Article';

type ArticleListProps = {
  articles: ArticleType[];
};

export default function ArticleList({ articles }: ArticleListProps) {
  return (
    <ul>
      {articles.map((article) => (
        <Article key={article.id} article={article} />
      ))}
    </ul>
  );
}
