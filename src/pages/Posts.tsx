import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Post, { PostType } from '../components/Post';
import { AiFillPlusCircle } from 'react-icons/ai';
import { BsFillArrowDownCircleFill } from 'react-icons/bs';
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
          const posts = Object.values(data);
          setPosts(posts);
        }, keyword)
      : postRepository.sync((data) => {
          const posts = Object.values(data).reverse();
          setPosts(posts);
          setLast(posts[posts.length - 1].id);
        }, category);

    return () => stopSync();
  }, [keyword, category, postRepository]);

  useEffect(() => {
    if (!observerTarget.current || !last) return;

    const observer = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          postRepository.syncNext((data) => {
            const posts = Object.values(data).reverse();
            setPosts((prev) => [...prev, ...posts]);
            posts.length > 1
              ? setLast(posts[posts.length - 1].id)
              : setLast('');
          }, last);
        }, 300);
      }
    });
    observer.observe(observerTarget.current);

    return () => {
      observer.disconnect();
    };
  }, [postRepository, last]);

  useEffect(() => {
    authService.onAuthChange((user) => {
      user ? setAddBtn(true) : setAddBtn(false);
    });
  }, [authService]);

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
      {category === 'all' && last && !keyword ? (
        <div
          className='mt-5 text-5xl animate-bounce text-main'
          ref={observerTarget}
        >
          <BsFillArrowDownCircleFill />
        </div>
      ) : (
        ''
      )}
    </section>
  );
}
