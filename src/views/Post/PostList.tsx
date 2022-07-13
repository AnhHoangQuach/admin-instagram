import { Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Spinner, TableRowEmpty } from 'components';
import { useSearch } from 'hooks';
import { DateTime } from 'luxon';
import { useQuery } from 'react-query';
import { systemService } from 'services';

const PostList = () => {
  const [dataSearch, onSearchChange] = useSearch();

  const { data, isFetching } = useQuery(
    ['systemService.fetchPosts', dataSearch],
    () => systemService.fetchPosts(dataSearch),
    { keepPreviousData: true },
  );

  const { items = [], total, currentPage, pages: totalPage } = data ?? {};

  return (
    <>
      <TableContainer component={Paper} className='mt-0'>
        <Spinner loading={isFetching}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Thumbnail</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Caption</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell className='text-center'></TableCell>
                  <TableCell className='text-center'>{item.user.username}</TableCell>
                  <TableCell className='text-center'>{item.user.username}</TableCell>
                  <TableCell className='text-center'>
                    {DateTime.fromISO(item.createdAt).toFormat('dd/MM/yyyy HH:mm')}
                  </TableCell>
                  <TableCell className='text-center'>
                    {DateTime.fromISO(item.updatedAt).toFormat('dd/MM/yyyy HH:mm')}
                  </TableCell>
                </TableRow>
              ))}
              <TableRowEmpty visible={!isFetching && items.length === 0} />
            </TableBody>
            <caption className='font-bold border-t'>{total ?? 0} Items</caption>
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
    </>
  );
};

export default PostList;
