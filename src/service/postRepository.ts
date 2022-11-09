import {
  Database,
  equalTo,
  off,
  onValue,
  orderByChild,
  query,
  ref,
  remove,
  set,
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

  syncByKeyword(onUpdate: (posts: PostType[]) => void) {
    const query = ref(this.firebaseDB, 'posts');
    onValue(query, (snapshot) => {
      const data = snapshot.val();
      data ? onUpdate(data) : onUpdate([]);
    });
    return () => off(query);
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
