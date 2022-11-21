import { useEffect, useState } from 'react';
import { useAuth, useCommentRepository } from '../context/FirebaseContext';
import { CommentType } from './NewComment';
import { AiOutlineCloseCircle } from 'react-icons/ai';

type CommentViewProps = {
  postId: string;
};

export default function CommentView({ postId }: CommentViewProps) {
  const authService = useAuth();
  const commentRepository = useCommentRepository();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const stopSync = commentRepository.sync(
      (comments) => setComments(Object.values(comments)),
      postId
    );
    return () => stopSync();
  }, [commentRepository, postId]);

  useEffect(() => {
    authService.onAuthChange((user) => {
      user ? setUserId(user.uid) : setUserId('');
    });
  }, [authService]);

  return (
    <ul>
      {comments.map((comment) => (
        <li
          className='relative border p-2 mb-3 rounded-lg text-slate-600'
          key={comment.id}
        >
          {comment.userId === userId ? (
            <button
              className='absolute right-1 top-1 text-slate-400 hover:scale-125 transition-transform'
              onClick={() => commentRepository.remove(postId, comment.id)}
            >
              <AiOutlineCloseCircle />
            </button>
          ) : (
            ''
          )}
          <p className='text-sm'>{comment.content}</p>
          <span className='text-xs text-slate-400 block text-right'>
            {comment.email}
          </span>
        </li>
      ))}
    </ul>
  );
}
