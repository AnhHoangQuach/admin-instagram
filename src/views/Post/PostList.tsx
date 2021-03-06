import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  Chip,
} from '@mui/material';
import { Spinner, TableRowEmpty } from 'components';
import { useSearch } from 'hooks';
import { DateTime } from 'luxon';
import { useQuery } from 'react-query';
import { systemService } from 'services';
import { useState } from 'react';
import { DeletePostPopup } from 'views/Post';

const PostList = () => {
  const [dataSearch, onSearchChange] = useSearch();

  const { data, isFetching } = useQuery(
    ['systemService.fetchPosts', dataSearch],
    () => systemService.fetchPosts(dataSearch),
    { keepPreviousData: true },
  );

  const { items = [], total, currentPage, pages: totalPage } = data ?? {};

  const [openPopup, setOpenPopup] = useState(false);

  const [postChoice, setPostChoice] = useState('');

  const checkFileType = (type: string) => {
    return ['png', 'jpg', 'jpeg'].includes(type);
  };

  return (
    <>
      <TableContainer component={Paper} className='mt-0'>
        <Spinner loading={isFetching}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Images</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Caption</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Hashtags</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell className='text-center'>
                    {checkFileType(item.images[0].format) ? (
                      <img src={item.images[0].secureUrl} alt='' height={250} width={250} />
                    ) : (
                      <video src={item.images[0].secureUrl} controls height={250} width={250} />
                    )}
                  </TableCell>
                  <TableCell className='text-center'>{item.user.username}</TableCell>
                  <TableCell className='text-center'>{item.caption}</TableCell>
                  <TableCell className='text-center'>{item.type}</TableCell>
                  <TableCell className='text-center'>
                    <div className='flex items-center space-x-2'>
                      {item.hashtags.map((hashtag, index) => (
                        <Chip label={hashtag} key={index} />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className='text-center'>
                    {DateTime.fromISO(item.createdAt).toFormat('dd/MM/yyyy HH:mm')}
                  </TableCell>
                  <TableCell className='text-center'>
                    {DateTime.fromISO(item.updatedAt).toFormat('dd/MM/yyyy HH:mm')}
                  </TableCell>
                  <TableCell className='text-center'>
                    <Button
                      variant='outlined'
                      color='error'
                      size='small'
                      onClick={() => {
                        setOpenPopup(true);
                        setPostChoice(item.id);
                      }}
                    >
                      Delete
                    </Button>
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
        <DeletePostPopup postId={postChoice} onClose={() => setOpenPopup(false)} />
      </Dialog>
    </>
  );
};

export default PostList;
