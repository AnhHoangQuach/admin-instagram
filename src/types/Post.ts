import { UserType } from 'types/Auth';
import { PaginateType } from 'types/Common';

export type PostImageType = {
  width: number;
  height: number;
  format: string;
  url: string;
  secureUrl: string;
  id: string;
};

export type PostType = {
  id: string;
  images: PostImageType[];
  thumbnail: string[];
  user: UserType;
  caption: string;
  hashtags: string[];
  createdAt: string;
  updatedAt: string;
};

export type PostPaginateType = PaginateType & {
  items: PostType[];
};
