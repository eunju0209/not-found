import {
  Auth,
  createUserWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';
import { auth } from './firebase';

export default class AuthService {
  private firebaseAuth: Auth = auth;

  signup(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.firebaseAuth, email, password);
  }
}
