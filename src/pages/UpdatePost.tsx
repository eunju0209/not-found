import { FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updatePost } from '../api/post';
import PostInputs from '../components/PostInputs';

export default function UpdatePost() {
  const navigate = useNavigate();
  const {
    state: { post },
  } = useLocation();
  const { title, category, content } = post;
  const [updatedPost, setUpdatedPost] = useState({ title, category, content });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newPost = { ...post, ...updatedPost };
    updatePost(post.id, newPost) //
      .then(() =>
        navigate(`/posts/detail/${post.id}`, { state: { post: newPost } })
      );
  };

  return (
    <section className='pt-10'>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <PostInputs
          inputValues={updatedPost}
          onValues={setUpdatedPost}
          btnText='수정완료'
        />
      </form>
    </section>
  );
}
