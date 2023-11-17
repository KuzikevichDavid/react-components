import { Outlet } from 'react-router-dom';
import Search from '../components/search/Search';

function Home() {
  return (
    <>
      <Search />
      <Outlet />
    </>
  );
}

export default Home;
