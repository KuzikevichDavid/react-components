import { Provider } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Search from '../components/search/Search';
import { store } from '../store/store';

function Home() {
  return (
    <Provider store={store}>
      <Search />
      <Outlet />
    </Provider>
  );
}

export default Home;
