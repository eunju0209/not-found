import { useNavigate } from 'react-router-dom';

export type PostType = {
  id: string;
  category: string;
  title: string;
  content: string;
  createdAt: string;
  userId: string;
  email: string;
};

type PostProps = {
  post: PostType;
};

export default function Post({ post }: PostProps) {
  const navigate = useNavigate();
  const { title } = post;
  return (
    <li
      className='w-full border-2 rounded-lg py-3 px-4 mb-3 hover:cursor-pointer hover:bg-slate-200 transition-all'
      onClick={() => navigate(`/posts/detail/${post.id}`, { state: { post } })}
    >
      <h3 className='text-xl mb-1 font-bold text-slate-600'>{title}</h3>
    </li>
  );
}
