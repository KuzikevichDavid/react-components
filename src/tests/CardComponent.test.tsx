import { describe, it, expect, vi, afterEach, afterAll, beforeAll } from 'vitest';
import { cleanup, screen, waitFor } from '@testing-library/react';
import { RouteObject } from 'react-router-dom';
import ShowItem from '../components/ShowItem';
import { cloneFakeItem, fakeItem, fakeItemFieldsCount, fakeLoader } from './CardFakes';
import Results from '../layouts/Results';
import RoutePath from '../routePath';
import Detail from '../components/Detail';
import { renderWithProviders } from './test-utils';
import { setupStore } from '../store/store';
import searchLoader from '../loaders/serachLoader';
import detailLoader from '../loaders/detailLoader';
import { openDatailTestId } from '../components/ShowResults';

afterEach(() => {
  cleanup();
});

describe('Card component tests', () => {
  it('card component renders the relevant card data', () => {
    const item = cloneFakeItem();
    const showedCount = fakeItemFieldsCount;

    // ACT
    renderWithProviders(<ShowItem item={item} showedCount={showedCount} />);

    // EXPECT
    expect(screen.getByText(RegExp(fakeItem.name, 'm'))).toBeInTheDocument();
  });

  it.skip('Validate that clicking on a card opens a detailed card component', async () => {
    // ARRANGE
    const response = fakeLoader(1);
    const store = setupStore({
      pagedResponse: { response },
      search: { endpoint: 'people' },
    });
    const { dispatch, getState } = store;
    const spyDetailLoader = detailLoader(dispatch, getState);
    const spySearchLoader = searchLoader(dispatch, getState);
    const { user } = renderWithProviders(<Results />, {
      store,
      routes: [
        {
          path: RoutePath.DetailFullPath,
          element: <Detail />,
          loader: spyDetailLoader,
        },
      ],
      loader: spySearchLoader,
    });

    // ACT
    await waitFor(() => {
      user.click(screen.getAllByTestId(openDatailTestId)[0]);
    });

    // EXPECT
    await waitFor(() => {
      expect(screen.getByText('detail')).toBeInTheDocument();
    });
  });

  it.skip('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    // ARRANGE
    const response = fakeLoader(1);
    const store = setupStore({
      pagedResponse: { response },
      search: { endpoint: 'people' },
    });
    const { dispatch, getState } = store;
    const spyDetailLoader = detailLoader(dispatch, getState);
    const spySearchLoader = searchLoader(dispatch, getState);
    const detailRoute: RouteObject = {
      path: RoutePath.DetailFullPath,
      element: <Detail />,
      loader: spyDetailLoader,
    };
    const loaderSpy = vi.spyOn(detailRoute, 'loader');
    const routes: RouteObject[] = [detailRoute];

    const { user } = renderWithProviders(<Results />, {
      store,
      routes,
      initPath: '/',
      loader: spySearchLoader,
    });

    // ACT
    await waitFor(() => {
      user.click(screen.getAllByTestId(openDatailTestId)[0]);
    });

    // EXPECT
    await waitFor(() => {
      expect(loaderSpy).toBeCalled();
    });
  });
});
