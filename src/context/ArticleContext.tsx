import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react';
import { ArticleActionType, articleReducer } from '../reducer/articleReducer';

type ArticlesProviderProps = {
  children: ReactNode;
};

export type ArticleType = {
  id: string;
  category: string;
  title: string;
  content: string;
  createdAt: string;
  userId: string;
  email: string;
};

export const ArticleStateContext = createContext<ArticleType[] | null>(null);
export const ArticleDispatchContext =
  createContext<Dispatch<ArticleActionType> | null>(null);

export function ArticleProvider({ children }: ArticlesProviderProps) {
  const [articleState, articleDispatch] = useReducer(articleReducer, articles);
  return (
    <ArticleStateContext.Provider value={articleState}>
      <ArticleDispatchContext.Provider value={articleDispatch}>
        {children}
      </ArticleDispatchContext.Provider>
    </ArticleStateContext.Provider>
  );
}

export const useArticleState = () => {
  const result = useContext(ArticleStateContext);
  if (!result) {
    throw new Error('cannat find ArticleState');
  }
  return result;
};
export const useArticleDispatch = () => {
  const result = useContext(ArticleDispatchContext);
  if (!result) {
    throw new Error('cannat find ArticleDispatch');
  }
  return result;
};

const articles = [
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
