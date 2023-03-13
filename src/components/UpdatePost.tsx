import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { updatePost } from '../api/post';

export default function UpdatePost() {
  const navigate = useNavigate();
  const editorRef = useRef<Editor>(null);
  const {
    state: { post },
  } = useLocation();
  const { title, category, content } = post;
  const [updatedPost, setUpdatedPost] = useState({ title, category, content });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newPost = { ...post, ...updatedPost };
    updatePost(post.id, newPost) //
      .then(() =>
        navigate(`/posts/detail/${post.id}`, { state: { post: newPost } })
      );
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUpdatedPost((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditor = () => {
    const content = editorRef.current!.getInstance().getHTML();
    setUpdatedPost((values) => ({ ...values, content }));
  };

  return (
    <section className='pt-10'>
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
        <Editor
          initialValue={updatedPost.content}
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
          수정완료
        </button>
      </form>
    </section>
  );
}
