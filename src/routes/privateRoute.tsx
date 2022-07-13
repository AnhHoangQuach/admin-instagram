import { Home } from 'views/Home';
import { PostList } from 'views/Post';

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
};

export default privateRoute;
