import { client } from './axios';

const changeStatusUser = ({ userId }: { userId: string }) => client.put(`/user/change-status/${userId}`);

export default {
  changeStatusUser,
};
