import { describe, it, expect, vi, afterEach } from 'vitest';
import { cleanup, screen, waitFor } from '@testing-library/react';
import Detail from '../components/Detail';
import { cloneFakeItem, fakeItem, fakeLoader } from './CardFakes';
import { fakeDetailLoader } from './detailFakes';
import RoutePath from '../routePath';
import Results from '../layouts/Results';
import detailLoader from '../loaders/detailLoader';
import { renderWithProviders } from './test-utils';
import { setupStore } from '../store/store';
import searchLoader from '../loaders/serachLoader';
import { ResponceType } from '../api/apiResponseType';

afterEach(() => {
  cleanup();
});

describe('Detailed Card component', () => {
  it('detailed card component correctly displays the detailed card data', async () => {
    // ARRANGE
    const response = await fakeDetailLoader();
    const store = setupStore({
      detailResponse: { response },
      search: { endpoint: 'people' },
    });
    const { dispatch, getState } = store;
    const spyDetailLoader = detailLoader(dispatch, getState);

    // ACT
    renderWithProviders(<Detail />, {
      store,
      loader: spyDetailLoader,
    });

    // EXPECT
    await waitFor(() => {
      expect(screen.getByText(RegExp(fakeItem.name, 'm'))).toBeInTheDocument();
    });
  });

  it.skip('clicking the close button hides the component', async () => {
    // ARRANGE
    const response = fakeLoader(1);
    const fakeRes: ResponceType = {
      count: 1,
      next: null,
      previous: null,
      results: [cloneFakeItem()],
    };
    const store = setupStore({
      pagedResponse: { response },
      detailResponse: { response: fakeRes },
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
    await waitFor(() => user.click(screen.getByText(RegExp(fakeItem.name, 'm'))));

    await waitFor(() => user.click(screen.getByText('Close')));

    // EXPECT
    await waitFor(() => expect(screen.queryByText('detail')).not.toBeInTheDocument());
  });

  it.skip('loading indicator is displayed while fetching data', async () => {
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
    await user.click(screen.getByText(RegExp(fakeItem.name, 'm')));

    // EXPECT
    expect(screen.getByText(RegExp('Loading', 'm'))).toBeInTheDocument();
  });
});
