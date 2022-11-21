import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CommentView from '../components/CommentView';
import NewComment from '../components/NewComment';
import { useAuth, usePostRepository } from '../context/FirebaseContext';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

export default function PostDetail() {
  const authService = useAuth();
  const postRepository = usePostRepository();
  const navigate = useNavigate();
  const {
    state: { post },
  } = useLocation();
  const [user, setUser] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    authService.onAuthChange((user) => {
      user && user.uid === post.userId ? setUser(true) : setUser(false);
      user ? setUserEmail(user.email!) : setUserEmail('');
    });
  }, [authService, post.userId]);

  const handleClick = () => {
    postRepository.remove(post.id);
    navigate(-1);
  };

  return (
    <section className='flex flex-col pt-10 pb-3'>
      <h1 className='text-3xl font-bold text-slate-700 mb-4'>{post.title}</h1>
      <span className='w-32 text-md p-2 border-solid border-2 border-slate-300 rounded-lg outline-none mb-4 text-center'>
        {post.category}
      </span>
      <Viewer initialValue={post.content} />
      <div className='flex items-center justify-end mt-3'>
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
      <article className='border-t mt-10 pt-3'>
        <h2 className='text-2xl font-bold text-slate-600 mb-3'>댓글</h2>
        <CommentView postId={post.id} />
        {userEmail && <NewComment userEmail={userEmail} postId={post.id} />}
      </article>
    </section>
  );
}
