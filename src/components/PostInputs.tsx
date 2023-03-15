import { ChangeEvent, useRef } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { NewPostType } from '../pages/NewPost';

type PostFormProps<T> = {
  inputValues: T;
  onValues: React.Dispatch<React.SetStateAction<T>>;
  btnText: string;
};

export default function PostInputs({
  inputValues,
  onValues,
  btnText,
}: PostFormProps<NewPostType>) {
  const editorRef = useRef<Editor>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    onValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditor = () => {
    const content = editorRef.current!.getInstance().getHTML();
    onValues((values) => ({ ...values, content }));
  };

  return (
    <>
      <input
        className='text-lg p-2 border-solid border-2 border-slate-300 rounded-lg outline-none mb-3'
        type='text'
        name='title'
        value={inputValues.title}
        placeholder='제목을 입력하세요.'
        onChange={handleChange}
      />
      <select
        className='w-36 text-md p-2 border-solid border-2 border-slate-300 rounded-lg outline-none mb-3'
        name='category'
        value={inputValues.category}
        onChange={handleChange}
      >
        <option value='javascript'>JavaScript</option>
        <option value='typescript'>TypeScript</option>
        <option value='react'>React</option>
        <option value='vue'>Vue</option>
        <option value='etc'>Etc</option>
      </select>
      <Editor
        initialValue={inputValues.content || ' '}
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
        {btnText}
      </button>
    </>
  );
}
