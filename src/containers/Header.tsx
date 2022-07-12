import { Logout, Menu as MenuIcon } from '@mui/icons-material';
import { AppBar, Divider, Drawer, IconButton, Toolbar } from '@mui/material';
import { AppBreadcrumb, AppMenu } from 'containers';
import { useWindowSize } from 'hooks';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from 'reducers/profile';
import { Link } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const { isMobile } = useWindowSize();

  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Drawer
        anchor='left'
        variant={isMobile ? 'temporary' : 'persistent'}
        open={isMobile ? openDrawer : true}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{ style: { width: '280px', padding: '8px 16px' } }}
      >
        <div className='flex justify-center items-center h-12 gap-3'>
          <Link to='/'>
            <img src={require('assets/icons/Metafarm.png')} alt='' className='h-10' />
          </Link>
          <span className='font-medium text-2xl text-primary-main'>IG</span>
        </div>
        <Divider className='my-2' />
        <AppMenu />
      </Drawer>

      <AppBar position='sticky' color='inherit' elevation={1}>
        <Toolbar>
          {isMobile && (
            <IconButton onClick={() => setOpenDrawer(true)} className='mr-2'>
              <MenuIcon />
            </IconButton>
          )}
          <AppBreadcrumb />
          <div className='flex-1' />
          <IconButton className='mr-3' onClick={() => dispatch(signOut())}>
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
