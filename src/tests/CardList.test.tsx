import { describe, it, expect, afterEach } from 'vitest';
import { screen, cleanup } from '@testing-library/react';
import SearchContext, { contextInitValue } from "../contexts/SearchContext"
import renderWithRouter from "./utils"
import ShowResults from '../components/ShowResults';
import { Item, PagedResponseType } from '../api/apiResponseType';

describe('Card List component', () => {
  const fakeLoader = (itemsCount: number): PagedResponseType => {
    const res = Array<Item>(itemsCount)
    for (let index = 0; index < res.length; index++) {
      res[index] = { name: 'fake data' };
    }
    return {
      itemsPerPage: 1,
      page: 1,
      pageCount: 1,
      results: res
    }
  };

  afterEach(() => {
    cleanup();
  });

  it('message is displayed if no cards are present', () => {
    // ACT
    renderWithRouter(<SearchContext.Provider value={contextInitValue}><ShowResults /></SearchContext.Provider>)

    // EXPECT
    expect(screen.getByText('Nothing to show')).toBeInTheDocument();
  })

  it('component renders the specified number of cards', () => {
    const value = { ...contextInitValue }
    const count = 10
    value.response[0] = fakeLoader(count)

    // ACT
    const { container } = renderWithRouter(<SearchContext.Provider value={value}><ShowResults /></SearchContext.Provider>)

    // EXPECT
    expect(screen.getAllByRole('button').length).equal(count);
  })
})