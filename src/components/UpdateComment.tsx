import { FormEvent, useState } from 'react';
import { updateComment } from '../api/comment';
import { CommentType } from './NewComment';

type UpdateCommentProps = {
  comment: CommentType;
  postId: string;
  onSelect: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UpdateComment({
  comment,
  postId,
  onSelect,
}: UpdateCommentProps) {
  const [content, setContent] = useState(comment.content);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const updatedComment = { ...comment, content };
    updateComment(updatedComment, postId);
    onSelect(false);
  };

  return (
    <form onSubmit={handleSubmit} className='flex'>
      <input
        type='text'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className='w-5/6 text-sm p-1 border outline-none rounded-sm'
      />
      <button
        type='submit'
        className='text-sm ml-1 bg-main text-white px-2 rounded-sm'
      >
        확인
      </button>
      <button
        type='button'
        className='text-sm ml-1 bg-slate-400 text-white px-2 rounded-sm'
        onClick={() => onSelect(false)}
      >
        취소
      </button>
    </form>
  );
}
