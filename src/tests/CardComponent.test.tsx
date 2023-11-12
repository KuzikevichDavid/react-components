import { describe, it, expect, vi, afterEach } from 'vitest';
import { cleanup, screen } from '@testing-library/react';
import ShowItem from '../components/ShowItem';
import SearchContext, { contextInitValue } from '../contexts/SearchContext';
import renderWithRouter from './utils';
import { cloneFakeItem, fakeItem, fakeItemFieldsCount, fakeLoader as loader } from './CardFakes';
import Results from '../routes/Results';
import RoutePath from '../routePath';
import Detail from '../routes/Detail';
import { fakeDetailLoader } from './detailFakes';
import ShowResults from '../components/ShowResults';

const fakeLoader = () => loader(10);

/* afterEach(() => {
  cleanup();

  console.log('clean');

}); */

describe('Card component tests', () => {
  it.skip('card component renders the relevant card data', () => {
    const item = cloneFakeItem();
    const showedCount = fakeItemFieldsCount;

    // ACT
    renderWithRouter(
      <SearchContext.Provider value={contextInitValue}>
        <ShowItem item={item} showedCount={showedCount} />
      </SearchContext.Provider>
    );

    // EXPECT
    expect(screen.getByText(RegExp(fakeItem.name, 'm'))).toBeInTheDocument();
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    // ARRANGE
    /* const value = { ...contextInitValue };
    value.response[0] = loader(1);
    const { user } = renderWithRouter(
      <SearchContext.Provider value={value}>
        <Results />
      </SearchContext.Provider>,
      [{
        path: RoutePath.DetailFullPath, element: <Detail />, loader: fakeDetailLoader
      }],
      false
    ); */
    const value = { ...contextInitValue };
    value.response[0] = loader(1);
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
      fakeLoader,
      false
    );

    // ACT
    await user.click(screen.getByText(RegExp(fakeItem.name, 'm')));

    // EXPECT
    expect(screen.getByText('detail')).toBeInTheDocument();
  });
});
