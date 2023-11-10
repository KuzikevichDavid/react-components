import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RoutedApp from '../RoutedApp';
import { renderWithRouter } from './utils';
import { storageKey } from '../components/search/storageKeys';

describe('app', () => {
  it('renders', () => {
    // ARRANGE
    render(<RoutedApp />);

    // ACT

    // EXPECT
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('"Search" button saves the entered value to the local storage', async () => {
    // ARRANGE
    const { user } = renderWithRouter();
    localStorage.removeItem(storageKey);
    const searchArg = 'some test data';
    const elem: HTMLInputElement = screen.getByRole('searchbox');

    // ACT
    await user.type(elem, searchArg);
    await user.click(screen.getByText('Search'));

    // EXPECT
    const after = localStorage.getItem(storageKey);
    expect(searchArg).equals(after);
  });
});

describe('404', () => {
  it('landing on a bad page', () => {
    // ARRANGE
    const badRoute = '/some/bad/route';

    // ACT
    renderWithRouter({ route: badRoute });

    // verify navigation to "no match" route
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
