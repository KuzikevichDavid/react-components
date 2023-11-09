import { Outlet } from 'react-router-dom';
import TestErrorBoundary from '../components/errorBoundary/TestErrorBoundary';
import Search from '../components/search/Search';

function Home() {
  return (
    <>
      <TestErrorBoundary />
      <Search />
      <Outlet />
    </>
  );
}

export default Home;
