import { createContext, ReactNode, useContext } from 'react';
import AuthService from '../service/auth';
import CommentRepository from '../service/commentRepository';
import PostRepository from '../service/postRepository';

const PostRepositoryContext = createContext<PostRepository | null>(null);
const CommentRepositoryContext = createContext<CommentRepository | null>(null);
const AuthContext = createContext<AuthService | null>(null);

const postRepository = new PostRepository();
const commentRepository = new CommentRepository();
const auth = new AuthService();

export function FirebaseProvider({ children }: { children: ReactNode }) {
  return (
    <PostRepositoryContext.Provider value={postRepository}>
      <CommentRepositoryContext.Provider value={commentRepository}>
        <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
      </CommentRepositoryContext.Provider>
    </PostRepositoryContext.Provider>
  );
}

export const usePostRepository = () => {
  const result = useContext(PostRepositoryContext);
  if (!result) {
    throw new Error('cannat find PostRepository');
  }
  return result;
};

export const useCommentRepository = () => {
  const result = useContext(CommentRepositoryContext);
  if (!result) {
    throw new Error('cannat find CommentRepository');
  }
  return result;
};

export const useAuth = () => {
  const result = useContext(AuthContext);
  if (!result) {
    throw new Error('cannat find Auth');
  }
  return result;
};
