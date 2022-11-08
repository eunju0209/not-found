import { ChangeEvent, useEffect, useState } from 'react';
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
  const [category, setCategory] = useState('all');

  useEffect(() => {
    authService.onAuthChange((user) => {
      user ? setAddBtn(true) : setAddBtn(false);
    });
  }, [authService]);

  const filtered = keyword
    ? getSearchItems(posts, keyword)
    : getFilteredItems(posts, category);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

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
      {keyword ? (
        ''
      ) : (
        <select
          className='w-36 text-md p-2 border-solid border-2 border-slate-300 rounded-lg outline-none mb-3 mr-auto'
          value={category}
          onChange={handleChange}
        >
          <option value='all'>All</option>
          <option value='javascript'>JavaScript</option>
          <option value='typescript'>TypeScript</option>
          <option value='react'>React</option>
          <option value='vue'>Vue</option>
          <option value='etc'>Etc</option>
        </select>
      )}
      <ul className='w-full overflow-y-auto grow shrink'>
        {filtered.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </section>
  );
}

const getSearchItems = (posts: PostType[], filter: string) => {
  return posts.filter((post) => post.title.includes(filter));
};

const getFilteredItems = (posts: PostType[], filter: string) => {
  if (filter === 'all') {
    return posts;
  }
  return posts.filter((post) => post.category === filter);
};
