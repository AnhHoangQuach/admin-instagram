import { UserLoginType, GetUserData } from 'types/Auth';
import { client } from './axios';

const login = (body: UserLoginType) => client.post(`/admin/login`, body);
const getProfile = (): Promise<GetUserData> => client.get(`/auth/me`);

export default {
  login,
  getProfile,
};
