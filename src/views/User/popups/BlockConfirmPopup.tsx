import { LoadingButton } from '@mui/lab';
import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useMutation } from 'react-query';
import { userService, queryClient } from 'services';
import { PopupController } from 'types/Common';

type PopupProps = PopupController & {
  userId: string;
  isBlocked: boolean;
};

const BlockConfirmPopup = ({ isBlocked, userId, onClose }: PopupProps) => {
  const { mutate: changeStatusUser, isLoading } = useMutation(userService.changeStatusUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('systemService.fetchUsers');
      onClose();
    },
  });

  const handleChange = () => {
    changeStatusUser({ userId });
  };

  return (
    <>
      <DialogTitle>CONFIRMATION</DialogTitle>

      <DialogContent>
        Are you want to <span className='font-bold'>{isBlocked ? 'active' : 'blocked'}</span> this user ?
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

export default BlockConfirmPopup;
