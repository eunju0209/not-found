import { PostType } from '../context/PostContext';
import PostRepository from '../service/postRepository';

const postRepository = new PostRepository();

export type PostActionType = {
  type: 'add';
  userId: string;
  post: PostType;
};

export const postReducer = (state: PostType[], action: PostActionType) => {
  switch (action.type) {
    case 'add':
      const { userId, post } = action;
      postRepository.savePost(userId, post);
      return [post, ...state];
  }
};
