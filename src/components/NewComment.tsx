import { FormEvent, useEffect, useState } from 'react';
import { useAuth, useCommentRepository } from '../context/FirebaseContext';

export type CommentType = {
  id: string;
  postId: string;
  userId: string;
  email: string;
  content: string;
  createdAt: string;
};

type NewCommentProps = {
  userEmail: string;
  postId: string;
};

export default function NewComment({ userEmail, postId }: NewCommentProps) {
  const authService = useAuth();
  const commentRepository = useCommentRepository();
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    authService.onAuthChange((user) => {
      user && setUserId(user.uid);
    });
  }, [authService]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const comment = {
      id: Date.now().toString(),
      postId,
      userId,
      email: userEmail,
      content,
      createdAt: new Date().toString(),
    };
    commentRepository.save(comment, postId);
    setContent('');
  };

  return (
    <form className='flex flex-col' onSubmit={handleSubmit}>
      <textarea
        className='text-sm p-2 border-solid border-2 border-slate-300 rounded-lg outline-none mb-3'
        placeholder='댓글을 입력해 주세요.'
        rows={3}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button
        className='text-sm w-24 py-2 ml-auto bg-slate-400 hover:bg-main px-3 rounded-md text-white font-bold transition-all'
        type='submit'
      >
        등록
      </button>
    </form>
  );
}
