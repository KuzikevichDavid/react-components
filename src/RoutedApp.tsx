import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import detailAction from './actions/detailAction';
import searchAction from './actions/searchAction';
import './App.css';
import MyError from './components/errorBoundary/MyError';
import detailLoader from './components/loader/detailLoader';
import searchLoader from './components/loader/serachLoader';
import Detail from './routes/Detail';
import Home from './routes/Home';
import NotFound from './routes/NotFound';
import Results from './routes/Results';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <MyError />,
    children: [
      {
        path: 'search/:page',
        action: searchAction,
        loader: searchLoader,
        element: <Results />,
        children: [
          {
            path: ':detail',
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
