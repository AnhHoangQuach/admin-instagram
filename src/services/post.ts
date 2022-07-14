import { client } from './axios';

const deletePost = ({ postId }: { postId: string }) => client.delete(`/post/${postId}`);

export default {
  deletePost,
};
