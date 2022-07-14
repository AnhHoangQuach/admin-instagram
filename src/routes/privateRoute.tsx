import { Home } from 'views/Home';
import { PostList } from 'views/Post';
import { UserList } from 'views/User';

type RouteType = {
  path: string;
  url?: (query: any) => string;
  name?: string;
  element: JSX.Element;
};

type PrivateRouteType = {
  [key: string]: RouteType;
};

const privateRoute: PrivateRouteType = {
  home: {
    path: '/dashboard',
    name: 'Dashboard',
    element: <Home />,
  },
  post: {
    path: '/posts',
    name: 'Posts',
    element: <PostList />,
  },
  user: {
    path: '/users',
    name: 'Users',
    element: <UserList />,
  },
};

export default privateRoute;
