import { Navigate, Route, Routes } from 'react-router-dom';
import { privateRoute } from 'routes';

const PrivateLayout = () => {
  return (
    <div>
      <Routes>
        {Object.values(privateRoute).map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        <Route path='/*' element={<Navigate to={privateRoute.home.path} />} />
      </Routes>
    </div>
  );
};

export default PrivateLayout;
