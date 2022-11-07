import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PostType, usePostsState } from '../context/PostContext';
import AuthService from '../service/auth';
import Post from './Post';
import { AiFillPlusCircle } from 'react-icons/ai';

type PostsProps = {
  authService: AuthService;
};

export default function Posts({ authService }: PostsProps) {
  const navigate = useNavigate();
  const { keyword } = useParams();
  const posts = usePostsState();
  const [addBtn, setAddBtn] = useState(false);

  useEffect(() => {
    authService.onAuthChange((user) => {
      user ? setAddBtn(true) : setAddBtn(false);
    });
  }, [authService]);

  const filtered = keyword ? getFilteredItems(posts, keyword) : posts;

  return (
    <section className='flex flex-col items-center py-6 h-full min-h-0'>
      {addBtn && (
        <button
          className='flex items-center justify-center bg-slate-400 w-28 text-xl py-2 rounded-lg text-white font-bold mb-4 hover:bg-main transition-all'
          onClick={() => navigate('/newpost')}
        >
          <AiFillPlusCircle className='mr-2' />
          New
        </button>
      )}
      <ul className='w-full overflow-y-auto grow shrink'>
        {filtered.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </section>
  );
}

const getFilteredItems = (posts: PostType[], filter: string) => {
  return posts.filter((post) => post.title.includes(filter));
};
