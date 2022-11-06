import { ArticleType } from '../context/ArticleContext';
import ArticleRepository from '../service/articleRepository';

const articleRepository = new ArticleRepository();

export type ArticleActionType = {
  type: 'add';
  userId: string;
  article: ArticleType;
};

export const articleReducer = (
  state: ArticleType[],
  action: ArticleActionType
) => {
  switch (action.type) {
    case 'add':
      const { userId, article } = action;
      articleRepository.saveArticle(userId, article);
      return [article, ...state];
  }
};
