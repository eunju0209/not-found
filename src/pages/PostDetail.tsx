import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthService from '../service/auth';
import PostRepository from '../service/postRepository';

type PostDetailProps = {
  authService: AuthService;
};

const postRepository = new PostRepository();

export default function PostDetail({ authService }: PostDetailProps) {
  const navigate = useNavigate();
  const {
    state: { post },
  } = useLocation();
  const [user, setUser] = useState(false);

  useEffect(() => {
    authService.onAuthChange((user) => {
      user && user.uid === post.userId ? setUser(true) : setUser(false);
    });
  }, [authService, post.userId]);

  const handleClick = () => {
    postRepository.remove(post.id);
    navigate(-1);
  };

  return (
    <section className='flex flex-col'>
      <h1 className='text-3xl font-bold text-slate-700 mb-4'>{post.title}</h1>
      <span className='w-32 text-md p-2 border-solid border-2 border-slate-300 rounded-lg outline-none mb-4 text-center'>
        {post.category}
      </span>
      <p className='text-md bg-slate-100 grow p-3 min-h-[10rem] mb-4'>
        {post.content}
      </p>
      <div className='flex items-center justify-end'>
        {user && (
          <button
            className='w-24 py-2 bg-slate-400 hover:bg-red-500 px-3 rounded-md text-white font-bold transition-all mr-3'
            onClick={handleClick}
          >
            삭제
          </button>
        )}
        {user && (
          <button
            className='w-24 py-2 bg-slate-400 hover:bg-main px-3 rounded-md text-white font-bold transition-all mr-3'
            onClick={() =>
              navigate(`/posts/update/${post.id}`, { state: { post } })
            }
          >
            수정
          </button>
        )}
        <button
          className='w-24 py-2 bg-slate-400 hover:bg-main px-3 rounded-md text-white font-bold transition-all'
          onClick={() => navigate('/')}
        >
          확인
        </button>
      </div>
    </section>
  );
}
