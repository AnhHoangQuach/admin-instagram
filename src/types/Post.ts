import { UserType } from 'types/Auth';

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
  captions: string;
  hashtags: string[];
  createdAt: string;
  updatedAt: string;
};
