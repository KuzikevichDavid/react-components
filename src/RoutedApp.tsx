import { Component, ReactNode } from 'react';
import { HashRouter } from 'react-router-dom';
import App from './App';

class RoutedApp extends Component {
  render(): ReactNode {
    return (
      <HashRouter>
        <App />
      </HashRouter>
    );
  }
}

export default RoutedApp;
