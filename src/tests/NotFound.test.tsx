import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import routes from '../router';

describe('404', () => {
  it('landing on a bad page', () => {
    // ARRANGE
    const badRoute = '/some/bad/route';

    // ACT
    render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: [badRoute] })} />);

    // verify navigation to "no match" route
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
