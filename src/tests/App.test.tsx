import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import RoutedApp from '../RoutedApp';
import { setupStore } from '../store/store';

describe('app', () => {
  it('renders', () => {
    // ARRANGE
    const store = setupStore({
      search: { endpoint: 'people' },
    });
    const { dispatch, getState } = store;

    // ACT
    render(
      <Provider store={store}>
        <RoutedApp dispatch={dispatch} getState={getState} />
      </Provider>
    );

    // EXPECT
    expect(screen.getByText('Search')).toBeInTheDocument();
  });
});
