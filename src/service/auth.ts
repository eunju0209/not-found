import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
} from 'firebase/auth';
import { auth } from './firebase';

export default class AuthService {
  private firebaseAuth: Auth = auth;

  signup(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.firebaseAuth, email, password);
  }

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.firebaseAuth, email, password);
  }

  googleLogin() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.firebaseAuth, provider);
  }

  logout() {
    signOut(this.firebaseAuth);
  }

  onAuthChange(onUserChanged: (user: User | null) => void) {
    onAuthStateChanged(this.firebaseAuth, (user) => {
      onUserChanged(user);
    });
  }
}
