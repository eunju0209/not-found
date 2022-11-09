import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth, usePostRepository } from '../context/FirebaseContext';

export default function NewPost() {
  const authService = useAuth();
  const postRepository = usePostRepository();
  const navigate = useNavigate();
  const navigateState = useLocation().state;
  const [userId, setUserId] = useState(navigateState && navigateState.id);
  const [postValues, setPostValues] = useState({
    title: '',
    category: 'javascript',
    content: '',
  });

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        navigate('/');
      }
    });
  }, [authService, navigate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const post = {
      ...postValues,
      id: Date.now().toString(),
      createdAt: new Date().toString(),
      userId,
      email: 'bori@gmail.com',
    };
    postRepository.save(post);
    navigate('/');
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setPostValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className='flex flex-col items-center w-full pt-10 pb-3'>
      <h1 className='text-5xl font-bold text-slate-600 mb-7'>New Post</h1>
      <form className='flex flex-col w-full' onSubmit={handleSubmit}>
        <input
          className='text-lg p-2 border-solid border-2 border-slate-300 rounded-lg outline-none mb-3'
          type='text'
          name='title'
          value={postValues.title}
          placeholder='제목을 입력하세요.'
          onChange={handleChange}
        />
        <select
          className='w-36 text-md p-2 border-solid border-2 border-slate-300 rounded-lg outline-none mb-3'
          name='category'
          value={postValues.category}
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
          value={postValues.content}
          placeholder='내용을 입력하세요.'
          rows={6}
          onChange={handleChange}
        ></textarea>
        <button
          className='w-24 py-2 ml-auto bg-slate-400 hover:bg-main px-3 rounded-md text-white font-bold transition-all'
          type='submit'
        >
          새 글 등록
        </button>
      </form>
    </section>
  );
}
