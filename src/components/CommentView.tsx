import { useEffect, useState } from 'react';
import { useCommentRepository } from '../context/FirebaseContext';
import { CommentType } from './NewComment';

type CommentViewProps = {
  postId: string;
};

export default function CommentView({ postId }: CommentViewProps) {
  const commentRepository = useCommentRepository();
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    const stopSync = commentRepository.sync(
      (comments) => setComments(Object.values(comments)),
      postId
    );
    return () => stopSync();
  }, [commentRepository, postId]);

  return (
    <ul>
      {comments.map((comment) => (
        <li
          className='border p-2 mb-3 rounded-lg text-slate-600'
          key={comment.id}
        >
          <p className='text-sm'>{comment.content}</p>
          <span className='text-xs text-slate-400 block text-right'>
            {comment.email}
          </span>
        </li>
      ))}
    </ul>
  );
}
