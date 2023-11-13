import { useLoaderData, Outlet, useNavigation, matchPath, useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import ShowResults from '../components/ShowResults';
import { PagedResponseType } from '../api/apiResponseType';
import Pagination from '../components/pagination/Pagination';
import styles from './Results.module.css';
import detailStyles from './Detail.module.css';
import Loader from '../components/loader/Loader';
import SearchContext from '../contexts/SearchContext';
import RoutePath from '../routePath';

const resultWrapperClass = 'results-wrapper';

export const resultsClass = 'results';

export const resultsTitle = '"Main" section';

function Results() {
  const location = useLocation();
  const navigation = useNavigation();
  const isDetailPath = navigation.location?.pathname
    ? matchPath(RoutePath.DetailFullPath, navigation.location.pathname)
    : null;
  const isDetailLoad = !!isDetailPath;

  const {
    response: [, setResponse],
    detailClose: [, setIsClose],
  } = useContext(SearchContext);

  const data = useLoaderData() as PagedResponseType;

  useEffect(() => {
    setResponse(data);
  }, [data]);

  function handleClose(e: Event) {
    if (matchPath(RoutePath.DetailFullPath, location.pathname)) {
      e.stopPropagation();
      console.log('setclose');

      setIsClose(true);
    }
  }

  return (
    <>
      <Pagination />
      <div className={styles[resultWrapperClass]}>
        <div
          className={styles[resultsClass]}
          onClickCapture={(e: Event) => handleClose(e)}
          title={resultsTitle}
        >
          <ShowResults />
        </div>

        {navigation.state === 'loading' && isDetailLoad ? (
          <div className={detailStyles['datail-wrapper']}>
            <Loader />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </>
  );
}

export default Results;
