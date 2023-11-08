import { useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import detailAction from './actions/detailAction';
import searchAction from './actions/searchAction';
import { defaultPerPage } from './api/swapi';
import './App.css';
import MyError from './components/errorBoundary/MyError';
import detailLoader from './components/loader/detailLoader';
import searchLoader from './components/loader/serachLoader';
import { storageKey, storageAPIKey, storageItemsPerPageKey } from './components/search/storageKeys';
import SearchContext from './contexts/SearchContext';
import { RoutePath } from './routePath';
import Detail from './routes/Detail';
import Home from './routes/Home';
import NotFound from './routes/NotFound';
import Results from './routes/Results';


const search = localStorage.getItem(storageKey) ?? '';
const endpoint = localStorage.getItem(storageAPIKey) ?? 'people';
const perPage = localStorage.getItem(storageItemsPerPageKey) ?? defaultPerPage;



function RoutedApp() {
  // const search = localStorage.getItem(storageKey) ?? '';
  // const endpoint = localStorage.getItem(storageAPIKey) ?? 'people';
  // const perPage = localStorage.getItem(storageItemsPerPageKey) ?? defaultPerPage;

  const router = createBrowserRouter([
    {
      path: RoutePath.Home,
      element: <Home />/* <SearchContext.Provider value={{ search: useState(search), endpoint: useState(endpoint), perPage: useState(perPage), response: useState() }}>
        <Home />
      </SearchContext.Provider> */,
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
              аction: detailAction,
              loаder: detailLoader,
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

  return <RouterProvider router={router} />//<SearchContext.Provider value={{ search: useState(search), endpoint: useState(endpoint), perPage: useState(perPage), response: useState() }}></SearchContext.Provider>;
}

export default RoutedApp;
