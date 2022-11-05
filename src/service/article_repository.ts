import { Database } from 'firebase/database';
import { db } from './firebase';

export default class ArticleRepository {
  private firebaseDB: Database = db;
}
