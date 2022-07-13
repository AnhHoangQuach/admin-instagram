import { AppHeader } from 'containers';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { privateRoute, staticRoute } from 'routes';
import { useWindowSize } from 'hooks';
import { profileSelector } from 'reducers/profile';
import { useEffect } from 'react';

const PrivateLayout = () => {
  const { isMobile } = useWindowSize();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector(profileSelector);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(staticRoute.login.path, { replace: true });
    }
  }, [navigate, isLoggedIn]);

  return (
    <div className='App'>
      <main style={{ marginLeft: isMobile ? '0' : '280px' }}>
        <AppHeader />
        <div className='sm:px-6 px-4 py-4 pt-10'>
          <Routes>
            {Object.values(privateRoute).map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
            <Route path='*' element={<Navigate to={privateRoute.home.path} />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default PrivateLayout;
