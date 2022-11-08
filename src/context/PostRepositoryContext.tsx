import { createContext, ReactNode, useContext } from 'react';
import PostRepository from '../service/postRepository';

const PostRepositoryContext = createContext<PostRepository | null>(null);

const postRepository = new PostRepository();

export function PostRepositoryProvider({ children }: { children: ReactNode }) {
  return (
    <PostRepositoryContext.Provider value={postRepository}>
      {children}
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
