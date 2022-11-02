import { useState } from 'react';
import ArticleList from '../../components/ArticleList/ArticleList';

export type ArticleType = {
  id: string;
  category: string;
  title: string;
  content: string;
  createdAt: string;
  userId: string;
  email: string;
};

export default function Home() {
  const [articles, setArticles] = useState([
    {
      id: '123',
      category: 'All',
      title: '제목입니다.',
      content: '내용입니다.',
      createdAt: new Date().toString(),
      userId: '1',
      email: 'bori@gmail.com',
    },
    {
      id: '124',
      category: 'JavaScript',
      title: '제목입니다.2',
      content: '내용입니다.2',
      createdAt: new Date().toString(),
      userId: '1',
      email: 'bori@gmail.com',
    },
  ]);
  return (
    <>
      <ArticleList articles={articles} />
    </>
  );
}
