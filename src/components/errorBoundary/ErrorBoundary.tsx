import { Component, ReactNode } from 'react';
import Fallback from './Fallback';

interface PropType {
  children: ReactNode;
}

interface StateType {
  hasError: boolean;
}

class ErrorBoundary extends Component<PropType, StateType> {
  constructor(props: PropType) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: { componentStack: unknown }) {
    console.log(error, info.componentStack);
  }

  render(): ReactNode {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      // You can render any custom fallback UI
      return <Fallback />;
    }

    return children;
  }
}

export default ErrorBoundary;
