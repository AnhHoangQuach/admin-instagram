import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  Avatar,
  Chip,
  Dialog,
} from '@mui/material';
import { Spinner, TableRowEmpty } from 'components';
import { useSearch } from 'hooks';
import { DateTime } from 'luxon';
import { useQuery } from 'react-query';
import { systemService } from 'services';
import { useState } from 'react';
import { BlockConfirmPopup } from 'views/User';
import { UserType } from 'types/User';

const UserList = () => {
  const [dataSearch, onSearchChange] = useSearch();

  const { data, isFetching } = useQuery(
    ['systemService.fetchUsers', dataSearch],
    () => systemService.fetchUsers(dataSearch),
    { keepPreviousData: true },
  );

  const { items = [], total, currentPage, pages: totalPage } = data ?? {};

  const [openPopup, setOpenPopup] = useState(false);

  const [userChoice, setUserChoice] = useState<UserType>();

  return (
    <>
      <TableContainer component={Paper} className='mt-0'>
        <Spinner loading={isFetching}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Fullname</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Avatar</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className='text-center'>{item.id}</TableCell>
                  <TableCell className='text-center'>{item.email}</TableCell>
                  <TableCell className='text-center'>{item.fullname}</TableCell>
                  <TableCell className='text-center'>{item.username}</TableCell>
                  <TableCell className='text-center'>
                    <Avatar src={item.avatar} alt='' />
                  </TableCell>
                  <TableCell className='text-center'>
                    {DateTime.fromISO(item.createdAt).toFormat('dd/MM/yyyy HH:mm')}
                  </TableCell>
                  <TableCell className='text-center'>
                    {DateTime.fromISO(item.updatedAt).toFormat('dd/MM/yyyy HH:mm')}
                  </TableCell>
                  <TableCell className='text-center'>
                    <div className='flex items-center justify-center'>
                      <Switch
                        checked={item.isBlocked}
                        onClick={() => {
                          setOpenPopup(true);
                          setUserChoice(item);
                        }}
                      />
                      <Chip label={item.isBlocked ? 'Blocked' : 'Active'} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              <TableRowEmpty visible={!isFetching && items.length === 0} />
            </TableBody>
            <caption className='font-bold border-t'>{total ?? 0} Posts</caption>
          </Table>
        </Spinner>
      </TableContainer>

      <div className='flex justify-center'>
        <Pagination
          page={currentPage ?? 1}
          count={totalPage}
          onChange={(event, value) => onSearchChange({ page: value })}
        />
      </div>

      <Dialog fullWidth maxWidth='xs' open={openPopup} onClose={() => setOpenPopup(false)}>
        <BlockConfirmPopup
          isBlocked={userChoice?.isBlocked!}
          userId={userChoice?.id!}
          onClose={() => setOpenPopup(false)}
        />
      </Dialog>
    </>
  );
};

export default UserList;
