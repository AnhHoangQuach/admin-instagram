import { SystemType } from 'types/System';
import { UserType } from 'types/Auth';
import { PostPaginateType } from 'types/Post';
import { client } from './axios';
import { PaginateParamsType } from 'types/Common';

const getSystem = (): Promise<SystemType> => client.get(`/system`);

const fetchUsers = (params: PaginateParamsType): Promise<UserType[]> => client.get(`/admin/users`, { params });
const fetchPosts = (params: PaginateParamsType): Promise<PostPaginateType> => client.get(`/admin/posts`, { params });

export default {
  getSystem,
  fetchUsers,
  fetchPosts,
};
