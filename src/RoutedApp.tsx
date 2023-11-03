import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import searchAction from './actions/searchAction';
import './App.css';
import MyError from './components/errorBoundary/MyError';
import searchLoader from './components/loader/serachLoader';
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
        index: true,
        loader: searchLoader,
        element: <Results />,
      },
      {
        path: 'search/:page',
        action: searchAction,
        loader: searchLoader,
        element: <Results />,
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
