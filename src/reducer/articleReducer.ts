import { ArticleType } from '../context/ArticleContext';

export type ArticleActionType = { type: 'add'; article: ArticleType };

export const articleReducer = (
  state: ArticleType[],
  action: ArticleActionType
) => {
  switch (action.type) {
    case 'add':
      return [action.article, ...state];
  }
};
