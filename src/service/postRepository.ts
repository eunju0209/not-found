import {
  Database,
  endAt,
  endBefore,
  equalTo,
  limitToFirst,
  limitToLast,
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
        ? query(
            ref(this.firebaseDB, 'posts'),
            orderByChild('id'),
            limitToLast(5)
          )
        : query(
            ref(this.firebaseDB, 'posts'),
            orderByChild('category'),
            equalTo(category),
            limitToFirst(10)
          );
    onValue(postQuery, (snapshot) => {
      const data = snapshot.val();
      data ? onUpdate(data) : onUpdate([]);
    });
    return () => off(postQuery);
  }

  syncNext(onUpdate: (posts: PostType[]) => void, last: string) {
    const postQuery = query(
      ref(this.firebaseDB, 'posts'),
      orderByChild('id'),
      endBefore(last),
      limitToLast(5)
    );
    onValue(postQuery, (snapshot) => {
      const data = snapshot.val();
      data ? onUpdate(data) : onUpdate([]);
    });
    return () => off(postQuery);
  }

  syncByKeyword(onUpdate: (posts: PostType[]) => void, keyword: string) {
    const keywordQuery = query(
      ref(db, 'posts'),
      orderByChild('title'),
      startAt(keyword),
      endAt(`${keyword}\uf8ff`)
    );
    onValue(keywordQuery, (snapshot) => {
      const data = snapshot.val();
      data ? onUpdate(data) : onUpdate([]);
    });

    return () => off(keywordQuery);
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
