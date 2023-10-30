import { Component, ReactNode } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import TestErrorBoundary from '../components/TestErrorBoundary';
import Search from '../components/Search';
import ShowResults, { State } from '../components/ShowResults';

interface StateType {
  stateValue?: State;
  isLoad?: boolean;
}

class Home extends Component<Record<string, never>, StateType> {
  constructor(props: Record<string, never> | Readonly<Record<string, never>>) {
    super(props);

    this.state = { isLoad: false };
  }

  handleSetState = (state: State) => {
    this.setState({ stateValue: state, isLoad: false });
  };

  handleBeginLoad = () => {
    this.setState({ isLoad: true });
  };

  render(): ReactNode {
    const { stateValue, isLoad } = this.state;
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
        <Search handleSetState={this.handleSetState} handleBeginLoad={this.handleBeginLoad} />
        {isLoad ? <section>Loading...</section> : <ShowResults currentState={stateValue} />}
      </ErrorBoundary>
    );
  }
}

export default Home;
