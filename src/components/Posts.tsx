import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostsState } from '../context/PostContext';

import AuthService from '../service/auth';
import Post from './Post';

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
    <>
      {addBtn && <button onClick={() => navigate('/newpost')}>글쓰기</button>}
      <ul>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </>
  );
}
