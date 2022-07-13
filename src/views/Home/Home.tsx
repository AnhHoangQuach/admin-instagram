import { Grid, Paper, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { systemService } from 'services';

const Home = () => {
  const { data } = useQuery(['dashboardService.getSystem'], () => systemService.getSystem(), {
    keepPreviousData: true,
  });

  return (
    <Paper variant='outlined' className='my-6'>
      <Grid container>
        {[
          { label: 'TOTAL USERS', value: data?.userCount },
          { label: 'TOTAL POSTS', value: data?.postCount },
        ].map((item, index) => (
          <Grid item key={index} xs={12} sm={6} lg={6} className='p-8 text-center'>
            <Typography variant='h3' color='primary' className='mb-4'>
              {item.label}
            </Typography>
            <Typography variant='h1'>{item.value}</Typography>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Home;
