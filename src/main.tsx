import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import RoutedApp from './RoutedApp';
import './index.css';
import { setupStore } from './store/store';

const store = setupStore();
const dispatch = store.dispatch.bind(store);
const getState = store.getState.bind(store);

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <Provider store={store}>
    <RoutedApp dispatch={dispatch} getState={getState} />
  </Provider>
);
