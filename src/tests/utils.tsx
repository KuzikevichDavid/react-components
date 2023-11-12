/* eslint-disable import/no-extraneous-dependencies */
import { isValidElement } from 'react';
import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { createMemoryRouter, RouteObject, RouterProvider } from 'react-router-dom';

export async function fakeAction() {
  return null;
}

const renderWithRouter = (
  children,
  routes: RouteObject[] = [],
  loader?: () => unknown,
  isChild = true
) => {
  const options = isValidElement(children) ? { element: children, path: '/' } : children;

  const routeObj = isChild
    ? [{ ...options, loader, children: [...routes] }]
    : [{ ...options }, ...routes];

  const router = createMemoryRouter(routeObj, {
    initialEntries: [options.path],
    initialIndex: 1,
  });

  return {
    user: userEvent.setup(),
    ...render(<RouterProvider router={router} />),
  };
};

export default renderWithRouter;
