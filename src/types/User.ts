import { PaginateType } from 'types/Common';

export type UserType = {
  id: string;
  email: string;
  fullname: string;
  username: string;
  avatar: string;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UserPaginateType = PaginateType & {
  items: UserType[];
};
