import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import createRoutes from '../createRoutes';
import { setupStore } from '../store/store';

describe('404', () => {
  it('landing on a bad page', () => {
    // ARRANGE
    const badRoute = '/some/bad/route';
    const store = setupStore();
    const { dispatch, getState } = store;

    // ACT
    render(
      <RouterProvider
        router={createMemoryRouter(createRoutes(dispatch, getState), {
          initialEntries: [badRoute],
        })}
      />
    );

    // verify navigation to "no match" route
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
