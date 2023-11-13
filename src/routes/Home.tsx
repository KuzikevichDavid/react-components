import { Outlet } from 'react-router-dom';
import Search from '../components/search/Search';
import ContextProvider from '../contexts/ContextProvider';

function Home() {
  return (
    <ContextProvider>
      <Search />
      <Outlet />
    </ContextProvider>
  );
}

export default Home;
