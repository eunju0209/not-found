import { useEffect, useState } from 'react';
import { useCommentRepository } from '../context/FirebaseContext';
import { CommentType } from './NewComment';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BsPencil } from 'react-icons/bs';
import UpdateComment from './UpdateComment';
import { onAuthChange } from '../api/auth';

type CommentProps = {
  comment: CommentType;
  postId: string;
};

export default function Comment({ comment, postId }: CommentProps) {
  const commentRepository = useCommentRepository();
  const [userId, setUserId] = useState('');
  const [isSelect, setIsSelect] = useState(false);

  useEffect(() => {
    onAuthChange((user) => {
      user ? setUserId(user.uid) : setUserId('');
    });
  }, []);

  return (
    <li
      className='relative border p-2 mb-3 rounded-lg text-slate-600'
      key={comment.id}
    >
      {comment.userId === userId ? (
        <>
          <button
            className='absolute right-1 top-1 text-slate-400 hover:scale-125 transition-transform'
            onClick={() => commentRepository.remove(postId, comment.id)}
          >
            <AiOutlineCloseCircle />
          </button>
          <button
            onClick={() => setIsSelect(true)}
            className='absolute right-6 top-1 text-sm text-slate-400 hover:scale-125 transition-transform'
          >
            <BsPencil />
          </button>
        </>
      ) : (
        ''
      )}
      {isSelect ? (
        <UpdateComment
          comment={comment}
          postId={postId}
          onSelect={setIsSelect}
        />
      ) : (
        <p className='text-sm'>{comment.content}</p>
      )}
      <span className='text-xs text-slate-400 block text-right'>
        {comment.email}
      </span>
    </li>
  );
}
