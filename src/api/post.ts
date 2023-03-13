import {
  endAt,
  equalTo,
  get,
  orderByChild,
  query,
  ref,
  remove,
  set,
  startAt,
  update,
} from 'firebase/database';
import { PostType } from '../components/Post';
import { db } from './firebase';

export async function getPosts(category: string): Promise<PostType[]> {
  const posts = query(ref(db, 'posts'), orderByChild('id'));
  const postsByCategory = query(
    ref(db, 'posts'),
    orderByChild('category'),
    equalTo(category)
  );
  return get(category === 'all' ? posts : postsByCategory) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      }
      return [];
    });
}

export async function searchByKeword(keyword: string): Promise<PostType[]> {
  const postByKeyword = query(
    ref(db, 'posts'),
    orderByChild('title'),
    startAt(keyword),
    endAt(`${keyword}\uf8ff`)
  );
  return get(postByKeyword) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      }
      return [];
    });
}

export async function addNewPost(post: PostType): Promise<void> {
  return set(ref(db, `posts/${post.id}`), post);
}

export async function removePost(postId: string) {
  return remove(ref(db, `posts/${postId}`));
}

export async function updatePost(postId: string, post: PostType) {
  const updates = { [`/posts/${postId}`]: post };
  return update(ref(db), updates);
}
