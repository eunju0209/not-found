import { ChangeEvent, FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePostRepository } from '../context/PostRepositoryContext';

export default function UpdatePost() {
  const postRepository = usePostRepository();
  const navigate = useNavigate();
  const {
    state: { post },
  } = useLocation();
  const { title, category, content } = post;
  const [updatedPost, setUpdatedPost] = useState({ title, category, content });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newPost = { ...post, ...updatedPost };
    postRepository.update(post.id, newPost);
    navigate(`/posts/detail/${post.id}`, { state: { post: newPost } });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setUpdatedPost((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form className='flex flex-col' onSubmit={handleSubmit}>
      <input
        className='text-lg p-2 border-solid border-2 border-slate-300 rounded-lg outline-none mb-3'
        type='text'
        name='title'
        value={updatedPost.title}
        placeholder='제목을 입력하세요.'
        autoFocus
        onChange={handleChange}
      />
      <select
        className='w-36 text-md p-2 border-solid border-2 border-slate-300 rounded-lg outline-none mb-3'
        name='category'
        value={updatedPost.category}
        onChange={handleChange}
      >
        <option value='javascript'>JavaScript</option>
        <option value='typescript'>TypeScript</option>
        <option value='react'>React</option>
        <option value='vue'>Vue</option>
        <option value='etc'>Etc</option>
      </select>
      <textarea
        className='text-lg p-2 border-solid border-2 border-slate-300 rounded-lg outline-none mb-4'
        name='content'
        placeholder='내용을 입력하세요.'
        value={updatedPost.content}
        rows={6}
        onChange={handleChange}
      ></textarea>
      <button
        className='w-24 py-2 ml-auto bg-slate-400 hover:bg-main px-3 rounded-md text-white font-bold transition-all'
        type='submit'
      >
        수정완료
      </button>
    </form>
  );
}
