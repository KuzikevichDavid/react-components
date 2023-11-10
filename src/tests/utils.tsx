/* eslint-disable import/no-extraneous-dependencies */
import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import routes from '../router';

const renderWithRouter = ({ route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return {
    user: userEvent.setup(),
    ...render(
      <RouterProvider
        router={
          // use <MemoryRouter> when you want to manually control the history
          createMemoryRouter(routes, {
            initialEntries: [route],
          })
        }
      />
    ),
  };
};

export default renderWithRouter;
