import { child, get, ref, remove, set, update } from 'firebase/database';
import { CommentType } from '../components/NewComment';
import { db } from './firebase';

export async function getComments(postId: string): Promise<CommentType[]> {
  return get(child(ref(db), `comments/${postId}`)) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      }
      return [];
    });
}

export async function addNewComment(
  comment: CommentType,
  postId: string
): Promise<void> {
  return set(ref(db, `comments/${postId}/${comment.id}`), comment);
}

export async function updateComment(
  comment: CommentType,
  postId: string
): Promise<void> {
  const updates = { [`comments/${postId}/${comment.id}`]: comment };
  return update(ref(db), updates);
}

export async function removeComment(
  postId: string,
  commentId: string
): Promise<void> {
  return remove(ref(db, `comments/${postId}/${commentId}`));
}
