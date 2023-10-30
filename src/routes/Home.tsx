import { Component, ReactNode } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import TestErrorBoundary from '../components/TestErrorBoundary';
import Search from '../components/Search';
import ShowResults, { State } from '../components/ShowResults';

class Home extends Component {
  stateArg: State = [{}];

  handleSetState = (state: State) => {
    this.setState(state);
    this.stateArg = state;
  };

  render(): ReactNode {
    return (
      <ErrorBoundary
        fallback={
          <>
            <p>Something went wrong</p>
            <button type="button" onClick={() => window.location.reload()}>
              Refresh Page
            </button>
          </>
        }
      >
        <TestErrorBoundary />
        <Search handleSetState={this.handleSetState} />
        <ShowResults currentState={this.stateArg} />
      </ErrorBoundary>
    );
  }
}

export default Home;
