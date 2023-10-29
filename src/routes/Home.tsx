import { Component, ReactNode } from 'react';
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
      <>
        <Search handleSetState={this.handleSetState} />
        <ShowResults currentState={this.stateArg} />
      </>
    );
  }
}

export default Home;
