import { ChangeEvent, FormEvent, useState } from 'react';

export default function CreateArticle() {
  const [articleValues, setArticleValues] = useState({
    title: '',
    category: '',
    content: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
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
      <input type='text' value={articleValues.title} onChange={handleChange} />
      <select value={articleValues.category} onChange={handleChange}>
        <option value='javascript'>JavaScript</option>
        <option value='typescript'>TypeScript</option>
        <option value='react'>React</option>
        <option value='vue'>Vue</option>
        <option value='etc'>Etc</option>
      </select>
      <textarea
        value={articleValues.content}
        onChange={handleChange}
      ></textarea>
      <button type='submit'>확인</button>
    </form>
  );
}
