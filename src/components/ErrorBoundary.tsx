import { Component, ReactNode } from 'react';

interface PropType {
  children: ReactNode;
  fallback: ReactNode;
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
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: { componentStack: unknown }) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    console.log(error, info.componentStack);
  }

  render(): ReactNode {
    const { hasError } = this.state;
    const { fallback, children } = this.props;
    if (hasError) {
      // You can render any custom fallback UI
      return fallback;
    }

    return children;
  }
}

export default ErrorBoundary;
