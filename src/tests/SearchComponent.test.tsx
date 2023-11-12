import { describe, it, expect, vi, afterEach } from 'vitest';
import { screen } from '@testing-library/react';
import { storageKey } from '../components/search/storageKeys';
import RoutePath from '../routePath';
import Home from '../routes/Home';
import renderWithRouter, { fakeAction } from './utils';
import SearchContext, { contextInitValue } from '../contexts/SearchContext';
import Search from '../components/search/Search';

const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

afterEach(() => {
  localStorage.clear();
  getItemSpy.mockClear();
  setItemSpy.mockClear();
});

describe('serach component tests', () => {
  it.skip('"Search" input retrieves the seed from the local storage upon mounting', async () => {
    // ARRANGE
    const searchArg = 'some test data';
    localStorage.setItem(storageKey, searchArg);

    renderWithRouter(
      <SearchContext.Provider value={contextInitValue}>
        <Search />
      </SearchContext.Provider>
    );

    // EXPECT
    const elem: HTMLInputElement = screen.getByRole('searchbox');
    console.log(
      elem.value,
      elem.defaultValue,
      elem.placeholder
    );

    const after = elem.value;
    expect(getItemSpy).toBeCalledWith(storageKey);
    expect(after).equals(searchArg);
  });

  it('"Search" button saves the entered value to the local storage', async () => {
    // ARRANGE
    const { user } = renderWithRouter(<Home />, [
      { path: RoutePath.SearchFullPath, element: <></>, action: fakeAction },
    ]);
    const searchArg = 'some test data';
    const elem: HTMLInputElement = screen.getByRole('searchbox');

    // ACT
    await user.type(elem, searchArg);
    await user.click(screen.getByText('Search'));

    // EXPECT
    const after = localStorage.getItem(storageKey);
    expect(setItemSpy).toBeCalledWith(storageKey, searchArg);
    expect(searchArg).equals(after);
  });
});
