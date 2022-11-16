import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Post, { PostType } from './Post';
import { AiFillPlusCircle } from 'react-icons/ai';
import { useAuth, usePostRepository } from '../context/FirebaseContext';

export default function Posts() {
  const authService = useAuth();
  const postRepository = usePostRepository();
  const navigate = useNavigate();
  const { keyword } = useParams();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [addBtn, setAddBtn] = useState(false);
  const [category, setCategory] = useState('all');
  const [last, setLast] = useState('');
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stopSync = keyword
      ? postRepository.syncByKeyword((data) => {
          const posts = Object.values(data).filter((post) =>
            post.title.includes(keyword)
          );
          setPosts(posts);
        })
      : postRepository.sync((data) => {
          const posts = Object.values(data);
          setPosts(posts);
          setLast(posts[posts.length - 1].createdAt);
        }, category);

    return () => stopSync();
  }, [keyword, category, postRepository]);

  useEffect(() => {
    authService.onAuthChange((user) => {
      user ? setAddBtn(true) : setAddBtn(false);
    });
  }, [authService]);

  useEffect(() => {
    if (!observerTarget.current || !last) return;

    const observer = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        postRepository.syncNext((data) => {
          const posts = Object.values(data);
          setPosts((prev) => [...prev, ...posts]);
          setLast(posts[posts.length - 1].createdAt);
        }, last);
      }
    });
    observer.observe(observerTarget.current);

    return () => {
      observer.disconnect();
    };
  }, [postRepository, last]);

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
          onChange={(e) => setCategory(e.target.value)}
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
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
      {category === 'all' ? <div ref={observerTarget}>More</div> : ''}
    </section>
  );
}
