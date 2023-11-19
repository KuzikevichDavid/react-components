import { describe, it, expect, vi, afterEach } from 'vitest';
import { screen, cleanup } from '@testing-library/react';
import RoutePath from '../routePath';
import Home from '../routes/Home';
import { fakeAction } from './utils';
import Search from '../components/search/Search';
import { renderWithProviders } from './test-utils';
import { storageKey } from '../store/reducers/search/storageKeys';
import { setupStore } from '../store/store';

const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

afterEach(() => {
  localStorage.clear();
  getItemSpy.mockClear();
  setItemSpy.mockClear();
  cleanup();
});

describe('serach component tests', () => {
  it.skip('"Search" input retrieves the seed from the local storage upon mounting', async () => {
    // ARRANGE
    const searchArg = 'some test data';

    localStorage.setItem(storageKey, searchArg);

    renderWithProviders(<Search />, { store: setupStore() });

    // EXPECT
    const elem: HTMLInputElement = screen.getByRole('searchbox');
    console.log(elem.value, elem.defaultValue, elem.placeholder);

    const after = elem.value;
    expect(getItemSpy).toBeCalledWith(storageKey);
    expect(after).equals(searchArg);
  });

  it('"Search" button saves the entered value to the local storage', async () => {
    // ARRANGE
    const { user } = renderWithProviders(<Home />, {
      routes: [{ path: RoutePath.SearchFullPath, element: <></>, action: fakeAction }],
    });

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
