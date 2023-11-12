import { RouteObject } from 'react-router-dom';
import searchAction from './actions/searchAction';
import detailLoader from './components/loader/detailLoader';
import searchLoader from './components/loader/serachLoader';
import RoutePath from './routePath';
import Detail from './routes/Detail';
import Home from './routes/Home';
import NotFound from './routes/NotFound';
import Results from './routes/Results';

const routes: RouteObject[] = [
  {
    path: RoutePath.Home,
    element: <Home />,
    children: [
      {
        path: RoutePath.SearchFullPath,
        action: searchAction,
        loader: searchLoader,
        element: <Results />,
        children: [
          {
            path: RoutePath.Detatil,
            loader: detailLoader,
            element: <Detail />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
