import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import Pagination from '../components/pagination/Pagination';
import RoutePath from '../routePath';
import { fakeLoader } from './CardFakes';
import { fakeAction } from './utils';
import { renderWithProviders } from './test-utils';

describe('pagination component tests', () => {
  it('updates URL query parameter when page changes', async () => {
    // ARRANGE
    const fakeElementData = 'fake element data';
    const count = 10;
    const response = fakeLoader(count);

    // ACT
    const { user } = renderWithProviders(<Pagination />, {
      preloadedState: { pagedResponse: { response } },
      routes: [
        {
          path: RoutePath.SearchFullPath,
          element: <>{fakeElementData}</>,
          action: fakeAction,
        },
      ],
      isChildRoutes: false,
    });

    // ACT
    await user.click(screen.getByText('>'));

    // EXPECT
    expect(screen.getByText(fakeElementData)).toBeInTheDocument();
  });
});
