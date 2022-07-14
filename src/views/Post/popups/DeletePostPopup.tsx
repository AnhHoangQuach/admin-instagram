import { LoadingButton } from '@mui/lab';
import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useMutation } from 'react-query';
import { postService, queryClient } from 'services';
import { PopupController } from 'types/Common';

type PopupProps = PopupController & {
  postId: string;
};

const DeleteConfirmPopup = ({ postId, onClose }: PopupProps) => {
  const { mutate: deletePost, isLoading } = useMutation(postService.deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('systemService.fetchPosts');
      onClose();
    },
  });

  const handleChange = () => {
    deletePost({ postId });
  };

  return (
    <>
      <DialogTitle>CONFIRMATION</DialogTitle>

      <DialogContent>
        Are you want to <span className='font-bold'>delete</span> this post ?
      </DialogContent>

      <DialogActions>
        <LoadingButton variant='outlined' color='inherit' onClick={onClose}>
          Cancel
        </LoadingButton>
        <LoadingButton variant='contained' loading={isLoading} onClick={handleChange}>
          Confirm
        </LoadingButton>
      </DialogActions>
    </>
  );
};

export default DeleteConfirmPopup;
