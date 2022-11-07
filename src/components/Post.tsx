import { PostType } from '../context/PostContext';

type PostProps = {
  post: PostType;
};

export default function Post({ post }: PostProps) {
  const { title, content } = post;
  return (
    <li>
      <h3>{title}</h3>
      <p>{content}</p>
    </li>
  );
}
