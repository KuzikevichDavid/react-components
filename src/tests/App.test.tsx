import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RoutedApp from '../RoutedApp';
import renderWithRouter, { fakeAction } from './utils';
import { storageKey } from '../components/search/storageKeys';
import Search from '../components/search/Search';
import RoutePath from '../routePath';
import Home from '../routes/Home';
import ShowResults from '../components/ShowResults';
import SearchContext, { contextInitValue } from '../contexts/SearchContext';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import routes from '../router';

describe('app', () => {
  const getItemSpy = vi.spyOn(Storage.prototype, 'getItem')
  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')

  afterEach(() => {
    localStorage.clear()
    getItemSpy.mockClear()
    setItemSpy.mockClear()
  })

  it('renders', () => {
    // ARRANGE
    render(<RoutedApp />);

    // ACT

    // EXPECT
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('"Search" button saves the entered value to the local storage', async () => {
    // ARRANGE
    const { user } = renderWithRouter(<Home />, [{ path: RoutePath.SearchFullPath, element: <></>, action: fakeAction }]);
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

  it.skip('"Search" input retrieves the seed from the local storage upon mounting', () => {
    // ARRANGE
    const searchArg = 'some test data';
    localStorage.setItem(storageKey, searchArg);

    // ACT
    render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: ['/'], initialIndex: 1 })} />)
    // renderWithRouter(<Search />);
    // renderWithRouter(<SearchContext.Provider value={contextInitValue}><Search /></SearchContext.Provider>)
    // render(<RoutedApp />)

    // EXPECT
    const elem: HTMLInputElement = screen.getByRole('searchbox');
    console.log(elem.value, elem.defaultValue, elem.placeholder/* , localStorage.getItem(storageKey) */);

    const after = elem.value
    expect(getItemSpy).toBeCalledWith(storageKey)
    expect(after).equals(searchArg);
  })
});