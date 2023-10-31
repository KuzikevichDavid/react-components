import { Component, ReactNode } from 'react';

interface StateType {
  isThrow: boolean;
}

class TestErrorBoundary extends Component<Record<string, never>, StateType> {
  constructor(props: Record<string, never> | Readonly<Record<string, never>>) {
    super(props);
    this.state = { isThrow: false };
  }

  onClick = (): void => {
    this.setState({ isThrow: true });
  };

  render(): ReactNode {
    const { isThrow } = this.state;
    if (isThrow) throw new Error('Error in TestErrorBoundary');

    return (
      <section>
        <button type="button" onClick={this.onClick}>
          Test Error Boundary
        </button>
      </section>
    );
  }
}

export default TestErrorBoundary;
