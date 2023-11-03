import { Outlet } from 'react-router-dom';
import TestErrorBoundary from '../components/errorBoundary/TestErrorBoundary';
import Search from '../components/search/Search';

function Home() {
  return (
    <>
      <TestErrorBoundary />
      <Search startPage={1} />
      <Outlet />
    </>
  );
}

export default Home;
