import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import Pagination from '../components/pagination/Pagination';
import SearchContext, { contextInitValue } from '../contexts/SearchContext';
import RoutePath from '../routePath';
import { fakeLoader } from './CardFakes';
import renderWithRouter, { fakeAction } from './utils';

describe('pagination component tests', () => {
  it('updates URL query parameter when page changes', async () => {
    // ARRANGE
    const fakeElementData = 'fake element data';
    const value = { ...contextInitValue };
    value.response[0] = fakeLoader(10);
    const { user } = renderWithRouter(
      <SearchContext.Provider value={value}>
        <Pagination />
      </SearchContext.Provider>,
      [
        {
          path: RoutePath.SearchFullPath,
          element: <>{fakeElementData}</>,
          action: fakeAction,
        },
      ],
      undefined,
      false
    );

    // ACT
    await user.click(screen.getByText('>'));

    // EXPECT
    expect(screen.getByText(fakeElementData)).toBeInTheDocument();
  });
});
