import { useEffect, useState } from 'react';
import { useCommentRepository } from '../context/FirebaseContext';
import { CommentType } from './NewComment';

import Comment from './Comment';

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
        <Comment key={comment.id} comment={comment} postId={postId} />
      ))}
    </ul>
  );
}
