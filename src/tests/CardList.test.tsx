import { describe, it, expect, afterEach } from 'vitest';
import { screen, cleanup } from '@testing-library/react';
import ShowResults from '../components/ShowResults';
import { fakeLoader } from './CardFakes';
import { renderWithProviders } from './test-utils';

afterEach(() => {
  cleanup();
});

describe('Card List component', () => {
  it('message is displayed if no cards are present', () => {
    // ACT
    renderWithProviders(<ShowResults />);

    // EXPECT
    expect(screen.getByText('Nothing to show')).toBeInTheDocument();
  });

  it('component renders the specified number of cards', () => {
    const count = 10;
    const response = fakeLoader(count);

    // ACT
    renderWithProviders(<ShowResults />, { preloadedState: { pagedResponse: { response } } });

    // EXPECT
    expect(screen.getAllByRole('button').length).equal(count);
  });
});
