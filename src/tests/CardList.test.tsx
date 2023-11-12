import { describe, it, expect, afterEach } from 'vitest';
import { screen, cleanup } from '@testing-library/react';
import SearchContext, { contextInitValue } from '../contexts/SearchContext';
import renderWithRouter from './utils';
import ShowResults from '../components/ShowResults';
import { Item, PagedResponseType } from '../api/apiResponseType';
import { fakeLoader } from './CardFakes';

afterEach(() => {
  cleanup();
  console.log('clean');
});

describe('Card List component', () => {
  it('message is displayed if no cards are present', () => {
    // ACT
    renderWithRouter(
      <SearchContext.Provider value={contextInitValue}>
        <ShowResults />
      </SearchContext.Provider>
    );

    // EXPECT
    expect(screen.getByText('Nothing to show')).toBeInTheDocument();
  });

  it('component renders the specified number of cards', () => {
    const value = { ...contextInitValue };
    const count = 10;
    value.response[0] = fakeLoader(count);

    // ACT
    renderWithRouter(
      <SearchContext.Provider value={value}>
        <ShowResults />
      </SearchContext.Provider>
    );

    // EXPECT
    expect(screen.getAllByRole('button').length).equal(count);
  });
});
