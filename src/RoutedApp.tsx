import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import detailAction from './actions/detailAction';
import searchAction from './actions/searchAction';
import './App.css';
import MyError from './components/errorBoundary/MyError';
import detailLoader from './components/loader/detailLoader';
import searchLoader from './components/loader/serachLoader';
import RoutePath from './routePath';
import Detail from './routes/Detail';
import Home from './routes/Home';
import NotFound from './routes/NotFound';
import Results from './routes/Results';

const router = createBrowserRouter([
  {
    path: RoutePath.Home,
    element: <Home />,
    errorElement: <MyError />,
    children: [
      {
        path: RoutePath.SearchFullPath,
        action: searchAction,
        loader: searchLoader,
        element: <Results />,
        children: [
          {
            path: RoutePath.Detatil,
            action: detailAction,
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
]);

function RoutedApp() {
  return <RouterProvider router={router} />;
}

export default RoutedApp;
