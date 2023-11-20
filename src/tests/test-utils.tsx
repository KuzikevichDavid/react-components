import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import React, { isValidElement, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import type { PreloadedState } from '@reduxjs/toolkit';
import { RouteObject, createMemoryRouter, LoaderFunction, RouterProvider } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { AppStore, RootState, setupStore } from '../store/store';
import searchLoader from '../loaders/serachLoader';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store. For
// future dependencies, such as wanting to test with react-router, you can extend
// this interface to accept a path and route and use those in a <MemoryRouter />
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
  routes?: RouteObject[];
  loader?: LoaderFunction<any>;
  initPath?: string;
  isChildRoutes?: boolean;
}

function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    routes = [],
    loader /* = searchLoader(store.dispatch, store.getState) */,
    initPath = '/',
    isChildRoutes = true,
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  const options = isValidElement(ui) ? { element: ui, path: initPath } : ui;

  const routeObj: RouteObject[] = isChildRoutes
    ? [{ ...options, loader, children: [...routes] }]
    : [{ ...options }, ...routes];

  const router = createMemoryRouter(routeObj, {
    initialEntries: [options.path],
    initialIndex: 1,
  });

  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return {
    user: userEvent.setup(),
    store,
    ...render(<RouterProvider router={router} />, { wrapper: Wrapper, ...renderOptions }),
  };
}

export { renderWithProviders };
