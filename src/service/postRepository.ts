import { Database, ref, set } from 'firebase/database';
import { PostType } from '../context/PostContext';
import { db } from './firebase';

export default class PostRepository {
  private firebaseDB: Database = db;

  savePost(userId: string, post: PostType) {
    set(ref(this.firebaseDB, `${userId}/posts/${post.id}`), post);
  }
}
