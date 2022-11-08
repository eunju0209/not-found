import { Database, off, onValue, ref, remove, set } from 'firebase/database';
import { PostType } from '../context/PostContext';
import { db } from './firebase';

export default class PostRepository {
  private firebaseDB: Database = db;

  getAll(onUpdate: (posts: PostType[]) => void) {
    const query = ref(this.firebaseDB, `posts`);
    onValue(query, (snapshot) => {
      const data = snapshot.val();
      data && onUpdate(data);
    });
    return () => off(query);
  }

  save(post: PostType) {
    set(ref(this.firebaseDB, `posts/${post.id}`), post);
  }

  remove(postId: string) {
    remove(ref(this.firebaseDB, `posts/${postId}`));
  }
}
