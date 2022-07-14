import { UserType } from 'types/User';

export type UserLoginType = {
  email: string;
  password: string;
};

export type GetUserData = {
  user: UserType;
};
