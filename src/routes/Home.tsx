import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigation, useNavigate } from 'react-router-dom';
import Loader from '../components/loader/Loader';
import Search from '../components/search/Search';
import { RootState } from '../store/RootState';

const flag = true;

function Home() {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const search = useSelector((state: RootState) => state.search);
  const { endpoint } = search;

  const loadingFlags = useSelector((state: RootState) => state.loadingFlags);
  const { isFirstLoading, mainSectionIsLoading } = loadingFlags;

  useEffect(() => {
    navigate(`/${endpoint}/search/1`);
  }, [flag]);

  const isLoading =
    navigation.state === 'loading' &&
    mainSectionIsLoading &&
    (isFirstLoading || navigation.formData?.get('formName') === 'search');

  return (
    <>
      <Search />
      {isLoading ? <Loader /> : <Outlet />}
    </>
  );
}

export default Home;
