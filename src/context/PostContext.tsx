import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import PostRepository from '../service/postRepository';

type PostsProviderProps = {
  children: ReactNode;
};

export type PostType = {
  id: string;
  category: string;
  title: string;
  content: string;
  createdAt: string;
  userId: string;
  email: string;
};

const PostStateContext = createContext<PostType[] | null>(null);
const AddPostContext = createContext<((post: PostType) => void) | null>(null);

const postRepository = new PostRepository();

export function PostProvider({ children }: PostsProviderProps) {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const stopSync = postRepository.getAll((posts) => {
      setPosts(Object.values(posts).reverse());
    });
    return () => stopSync();
  }, []);

  const addPost = (post: PostType) => {
    postRepository.save(post);
    setPosts((posts) => [post, ...posts]);
  };

  return (
    <PostStateContext.Provider value={posts}>
      <AddPostContext.Provider value={addPost}>
        {children}
      </AddPostContext.Provider>
    </PostStateContext.Provider>
  );
}

export const usePostsState = () => {
  const result = useContext(PostStateContext);
  if (!result) {
    throw new Error('cannat find PostState');
  }
  return result;
};

export const useAddPost = () => {
  const result = useContext(AddPostContext);
  if (!result) {
    throw new Error('cannat find AddPost');
  }
  return result;
};
