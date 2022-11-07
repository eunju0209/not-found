import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAddPost } from '../context/PostContext';
import AuthService from '../service/auth';

type NewPostProps = {
  authService: AuthService;
};

export default function NewPost({ authService }: NewPostProps) {
  const addPost = useAddPost();
  const navigate = useNavigate();
  const navigateState = useLocation().state;
  const [userId, setUserId] = useState(navigateState && navigateState.id);
  const [postValues, setPostValues] = useState({
    title: '',
    category: '',
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
    addPost(post);
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
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='title'
        value={postValues.title}
        onChange={handleChange}
      />
      <select
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
        name='content'
        value={postValues.content}
        onChange={handleChange}
      ></textarea>
      <button type='submit'>확인</button>
    </form>
  );
}
