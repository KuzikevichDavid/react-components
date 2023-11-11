import { Outlet } from 'react-router-dom';
import TestErrorBoundary from '../components/errorBoundary/TestErrorBoundary';
import Search from '../components/search/Search';
import ContextProvider from '../contexts/ContextProvider';

function Home() {
  return (
    <ContextProvider>
      <TestErrorBoundary />
      <Search />
      <Outlet />
    </ContextProvider>
  );
}

export default Home;
