import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import RoutedApp from './RoutedApp';
import './index.css';
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <Provider store={store}>
    <RoutedApp />
  </Provider>
);
