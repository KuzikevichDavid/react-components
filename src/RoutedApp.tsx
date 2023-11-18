import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import createRoutes from './createRoutes';
import { AppDispatch, AppGetState } from './store/store';

interface PropType {
  dispatch: AppDispatch;
  getState: AppGetState;
}

function RoutedApp({ dispatch, getState }: PropType) {
  const router = createBrowserRouter(createRoutes(dispatch, getState));
  return <RouterProvider router={router} />;
}

export default RoutedApp;
