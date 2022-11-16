import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth, usePostRepository } from '../context/FirebaseContext';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

export default function NewPost() {
  const authService = useAuth();
  const postRepository = usePostRepository();
  const navigate = useNavigate();
  const navigateState = useLocation().state;
  const editorRef = useRef<Editor>(null);
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
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setPostValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditor = () => {
    const content = editorRef.current!.getInstance().getHTML();
    setPostValues((values) => ({ ...values, content }));
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
        <Editor
          initialValue=' '
          initialEditType='wysiwyg'
          hideModeSwitch={true}
          plugins={[colorSyntax]}
          ref={editorRef}
          onChange={handleEditor}
        />
        <button
          className='w-24 py-2 ml-auto mt-3 bg-slate-400 hover:bg-main px-3 rounded-md text-white font-bold transition-all'
          type='submit'
        >
          새 글 등록
        </button>
      </form>
    </section>
  );
}
