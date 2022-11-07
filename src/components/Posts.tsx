import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostsState } from '../context/PostContext';
import AuthService from '../service/auth';
import Post from './Post';
import { AiFillPlusCircle } from 'react-icons/ai';

type PostsProps = {
  authService: AuthService;
};

export default function Posts({ authService }: PostsProps) {
  const posts = usePostsState();
  const [addBtn, setAddBtn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    authService.onAuthChange((user) => {
      user ? setAddBtn(true) : setAddBtn(false);
    });
  }, [authService]);

  return (
    <section className='flex flex-col items-center'>
      {addBtn && (
        <button
          className='flex items-center justify-center bg-slate-400 w-28 text-xl py-2 rounded-lg text-white font-bold mb-4 hover:bg-main transition-all'
          onClick={() => navigate('/newpost')}
        >
          <AiFillPlusCircle className='mr-2' />
          New
        </button>
      )}
      <ul className='w-full'>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </section>
  );
}
