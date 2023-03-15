import { FormEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { onAuthChange } from '../api/auth';
import { addNewPost } from '../api/post';
import PostInputs from '../components/PostInputs';

export type NewPostType = {
  title: string;
  category: string;
  content: string;
};

export default function NewPost() {
  const navigate = useNavigate();
  const navigateState = useLocation().state;
  const [userInfo, setUserInfo] = useState(navigateState && navigateState.id);
  const [postValues, setPostValues] = useState({
    title: '',
    category: 'javascript',
    content: '',
  });

  useEffect(() => {
    onAuthChange((user) => {
      if (user) {
        setUserInfo({ userId: user.uid, email: user.email });
      } else {
        navigate('/');
      }
    });
  }, [navigate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const post = {
      ...postValues,
      id: Date.now().toString(),
      createdAt: new Date().toString(),
      userId: userInfo.userId,
      email: userInfo.email,
    };
    addNewPost(post) //
      .then(() => navigate('/'));
  };

  return (
    <section className='flex flex-col items-center w-full pt-10 pb-3'>
      <h1 className='text-5xl font-bold text-slate-600 mb-7'>New Post</h1>
      <form className='flex flex-col w-full' onSubmit={handleSubmit}>
        <PostInputs
          inputValues={postValues}
          onValues={setPostValues}
          btnText='새 글 등록'
        />
      </form>
    </section>
  );
}
