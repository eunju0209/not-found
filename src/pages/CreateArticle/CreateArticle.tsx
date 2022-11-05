import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useArticleDispatch } from '../../context/ArticleContext';

export default function CreateArticle() {
  const navigate = useNavigate();
  const [articleValues, setArticleValues] = useState({
    title: '',
    category: '',
    content: '',
  });
  const articleDispatch = useArticleDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const article = {
      ...articleValues,
      id: Date.now().toString(),
      createdAt: new Date().toString(),
      userId: '1',
      email: 'bori@gmail.com',
    };
    articleDispatch({ type: 'add', article });
    navigate('/');
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setArticleValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='title'
        value={articleValues.title}
        onChange={handleChange}
      />
      <select
        name='category'
        value={articleValues.category}
        onChange={handleChange}
      >
        <option value='javascript'>JavaScript</option>
        <option value='typescript'>TypeScript</option>
        <option value='react'>React</option>
        <option value='vue'>Vue</option>
        <option value='etc'>Etc</option>
      </select>
      <textarea
        name='content'
        value={articleValues.content}
        onChange={handleChange}
      ></textarea>
      <button type='submit'>확인</button>
    </form>
  );
}
