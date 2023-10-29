import { Component, ReactNode } from 'react';
import Search from '../components/Search';
import ShowResults, { State } from '../components/ShowResults';

class Home extends Component {
  // state: State = [{}];
  handleSetState = (state: State) => {
    this.setState(state);
  };

  render(): ReactNode {
    return (
      <>
        <Search handleSetState={this.handleSetState} />
        <ShowResults currentState={this.state} />
      </>
    );
  }
}

export default Home;
