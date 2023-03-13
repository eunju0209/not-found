import { createContext, ReactNode, useContext } from 'react';
import CommentRepository from '../api/commentRepository';

const CommentRepositoryContext = createContext<CommentRepository | null>(null);

const commentRepository = new CommentRepository();

export function FirebaseProvider({ children }: { children: ReactNode }) {
  return (
    <CommentRepositoryContext.Provider value={commentRepository}>
      {children}
    </CommentRepositoryContext.Provider>
  );
}

export const useCommentRepository = () => {
  const result = useContext(CommentRepositoryContext);
  if (!result) {
    throw new Error('cannat find CommentRepository');
  }
  return result;
};
