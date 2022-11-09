import {
  Database,
  endAt,
  equalTo,
  off,
  onValue,
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

export default class PostRepository {
  private firebaseDB: Database = db;

  sync(onUpdate: (posts: PostType[]) => void, category: string) {
    const postQuery =
      category === 'all'
        ? ref(this.firebaseDB, 'posts')
        : query(
            ref(this.firebaseDB, 'posts'),
            orderByChild('category'),
            equalTo(category)
          );
    onValue(postQuery, (snapshot) => {
      const data = snapshot.val();
      data ? onUpdate(data) : onUpdate([]);
    });
    return () => off(postQuery);
  }

  syncByKeyword(onUpdate: (posts: PostType[]) => void, keyword: string) {
    const postQuery = query(
      ref(this.firebaseDB, 'posts'),
      orderByChild('title'),
      startAt(keyword),
      endAt(`${keyword}\uf8ff`)
    );
    onValue(postQuery, (snapshot) => {
      const data = snapshot.val();
      data ? onUpdate(data) : onUpdate([]);
    });
    return () => off(postQuery);
  }

  save(post: PostType) {
    set(ref(this.firebaseDB, `posts/${post.id}`), post);
  }

  remove(postId: string) {
    remove(ref(this.firebaseDB, `posts/${postId}`));
  }

  update(postId: string, post: PostType) {
    const updates = { [`/posts/${postId}`]: post };
    update(ref(this.firebaseDB), updates);
  }
}
