import { describe, it, expect, vi, afterEach } from 'vitest';
import { cleanup, screen } from '@testing-library/react';
import Detail from '../routes/Detail';
import SearchContext, { contextInitValue } from '../contexts/SearchContext';
import { fakeItem, fakeLoader } from './CardFakes';
import renderWithRouter from './utils';
import { fakeDetailLoader } from './detailFakes';
import RoutePath from '../routePath';
import Results from '../routes/Results';
import detailLoader from '../loaders/detailLoader';

global.fetch = vi.fn();

afterEach(() => {
  cleanup();
});

describe('Detailed Card component', () => {
  it.skip('detailed card component correctly displays the detailed card data', () => {
    const value = { ...contextInitValue };
    value.response[0] = fakeLoader(1);
    // ACT
    renderWithRouter(
      <SearchContext.Provider value={value}>
        <Detail />
      </SearchContext.Provider>,
      undefined,
      fakeDetailLoader
    );

    // EXPECT
    expect(screen.getByText(RegExp(fakeItem.name, 'm'))).toBeInTheDocument();
  });

  it('clicking the close button hides the component', async () => {
    // ARRANGE
    const value = { ...contextInitValue };
    value.response[0] = fakeLoader(1);
    const { user } = renderWithRouter(
      <SearchContext.Provider value={value}>
        <Results />
      </SearchContext.Provider>,
      [
        {
          path: RoutePath.DetailFullPath,
          element: <Detail />,
          loader: fakeDetailLoader,
        },
      ],
      fakeLoader.bind(null, 10),
      false
    );

    // ACT
    await user.click(screen.getByText(RegExp(fakeItem.name, 'm')));
    await user.click(screen.getByText('Close'));

    // EXPECT
    expect(screen.queryByText('detail')).not.toBeInTheDocument();
  });

  it.skip('loading indicator is displayed while fetching data', async () => {
    // ARRANGE
    const value = { ...contextInitValue };
    value.response[0] = fakeLoader(1);
    const { user } = renderWithRouter(
      <SearchContext.Provider value={value}>
        <Results />
      </SearchContext.Provider>,
      [
        {
          path: RoutePath.DetailFullPath,
          element: <Detail />,
          loader: detailLoader,
        },
      ],
      fakeLoader.bind(null, 10),
      true
    );

    // ACT
    await user.click(screen.getByText(RegExp(fakeItem.name, 'm')));

    // EXPECT
    expect(screen.getByText(RegExp('Loading', 'm'))).toBeInTheDocument();
  });
});
