import { Database, off, onValue, ref, set } from 'firebase/database';
import { CommentType } from '../components/NewComment';
import { db } from './firebase';

export default class CommentRepository {
  private firebaseDB: Database = db;

  sync(onUpdate: (comments: CommentType[]) => void, postId: string) {
    const postQuery = ref(this.firebaseDB, `comments/${postId}`);
    onValue(postQuery, (snapshot) => {
      const data = snapshot.val();
      data ? onUpdate(data) : onUpdate([]);
    });
    return () => off(postQuery);
  }

  save(comment: CommentType, postId: string) {
    set(ref(this.firebaseDB, `comments/${postId}/${comment.id}`), comment);
  }
}
