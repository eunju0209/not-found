import { useEffect, useState } from 'react';
import { CommentType } from './NewComment';

import Comment from './Comment';
import { getComments } from '../api/comment';

type CommentViewProps = {
  postId: string;
};

export default function CommentView({ postId }: CommentViewProps) {
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    getComments(postId) //
      .then(setComments)
      .catch(console.error);
  }, [postId]);

  return (
    <ul>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} postId={postId} />
      ))}
    </ul>
  );
}
