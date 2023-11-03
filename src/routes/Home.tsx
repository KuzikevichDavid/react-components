import { Outlet, useNavigation } from 'react-router-dom';
import TestErrorBoundary from '../components/errorBoundary/TestErrorBoundary';
import Loader from '../components/loader/Loader';
import Search from '../components/search/Search';

function Home() {
  const navigation = useNavigation();
  return (
    <>
      <TestErrorBoundary />
      <Search startPage={1} />
      {navigation.state === 'loading' ? <Loader /> : <Outlet />}
    </>
  );
}

export default Home;
