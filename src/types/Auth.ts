import { PostType } from 'types/Post';
export type UserLoginType = {
  email: string;
  password: string;
};

export type UserType = {
  id: string;
  email: string;
  fullname: string;
  username: string;
  avatar: string;
  savedPosts: PostType[];
  createdAt: string;
  updatedAt: string;
};

export type GetUserData = {
  data: {
    user: UserType;
  };
};
