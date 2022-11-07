import { PostType } from '../context/PostContext';

type PostProps = {
  post: PostType;
};

export default function Post({ post }: PostProps) {
  const { title, content } = post;
  return (
    <li className='w-full border-2 rounded-lg py-3 px-4 mb-3 hover:cursor-pointer hover:bg-slate-200 transition-all'>
      <h3 className='text-xl mb-1 font-bold text-slate-600'>{title}</h3>
      <p className='text-sm text-slate-400'>{content}</p>
    </li>
  );
}
