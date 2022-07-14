import { SystemType } from 'types/System';
import { UserPaginateType } from 'types/User';
import { PostPaginateType } from 'types/Post';
import { client } from './axios';
import { PaginateParamsType } from 'types/Common';

const getSystem = (): Promise<SystemType> => client.get(`/system`);

const fetchUsers = (params: PaginateParamsType): Promise<UserPaginateType> => client.get(`/admin/users`, { params });
const fetchPosts = (params: PaginateParamsType): Promise<PostPaginateType> => client.get(`/admin/posts`, { params });

export default {
  getSystem,
  fetchUsers,
  fetchPosts,
};
