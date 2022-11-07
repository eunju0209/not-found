import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react';
import { PostActionType, postReducer } from '../reducer/postReducer';

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

export const PostStateContext = createContext<PostType[] | null>(null);
export const PostDispatchContext =
  createContext<Dispatch<PostActionType> | null>(null);

export function PostProvider({ children }: PostsProviderProps) {
  const [postState, postDispatch] = useReducer(postReducer, posts);
  return (
    <PostStateContext.Provider value={postState}>
      <PostDispatchContext.Provider value={postDispatch}>
        {children}
      </PostDispatchContext.Provider>
    </PostStateContext.Provider>
  );
}

export const usePostState = () => {
  const result = useContext(PostStateContext);
  if (!result) {
    throw new Error('cannat find PostState');
  }
  return result;
};
export const usePostDispatch = () => {
  const result = useContext(PostDispatchContext);
  if (!result) {
    throw new Error('cannat find PostDispatch');
  }
  return result;
};

const posts = [
  {
    id: '123',
    category: 'All',
    title: '제목입니다.',
    content: '내용입니다.',
    createdAt: new Date().toString(),
    userId: '1',
    email: 'bori@gmail.com',
  },
  {
    id: '124',
    category: 'JavaScript',
    title: '제목입니다.2',
    content: '내용입니다.2',
    createdAt: new Date().toString(),
    userId: '1',
    email: 'bori@gmail.com',
  },
];
