import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RoutedApp from '../RoutedApp';

describe('app', () => {
  it('renders', () => {
    // ARRANGE
    render(<RoutedApp />);

    // ACT

    // EXPECT
    expect(screen.getByText('Search')).toBeInTheDocument();
  });
});
