import { Database, ref, set } from 'firebase/database';
import { ArticleType } from '../context/ArticleContext';
import { db } from './firebase';

export default class ArticleRepository {
  private firebaseDB: Database = db;

  saveArticle(userId: string, article: ArticleType) {
    set(ref(this.firebaseDB, `${userId}/articles/${article.id}`), article);
  }
}
