import { RouteObject } from 'react-router-dom';
import searchAction from './actions/searchAction';
import detailLoader from './loaders/detailLoader';
import searchLoader from './loaders/serachLoader';
import RoutePath from './routePath';
import Detail from './routes/Detail';
import Home from './routes/Home';
import NotFound from './routes/NotFound';
import Results from './routes/Results';
import { AppDispatch, AppGetState } from './store/store';

const createRoutes = (dispatch: AppDispatch, getState: AppGetState): RouteObject[] => [
  {
    path: RoutePath.Home,
    element: <Home />,
    children: [
      {
        path: RoutePath.SearchFullPath,
        action: searchAction,
        loader: searchLoader(dispatch, getState),
        element: <Results />,
        children: [
          {
            path: RoutePath.Detatil,
            loader: detailLoader(dispatch),
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

export default createRoutes;
