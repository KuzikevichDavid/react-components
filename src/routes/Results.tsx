import { useLoaderData, Outlet, useNavigation, matchPath, useLocation } from 'react-router-dom';
import { useState } from 'react';
import ShowResults from '../components/ShowResults';
import { PagedResponseType } from '../api/apiResponseType';
import Pagination from '../components/pagination/Pagination';
import styles from './Results.module.css';
import detailStyles from './Detail.module.css';
import Loader from '../components/loader/Loader';

const resultWrapperClass = 'results-wrapper';

export const resultsClass = 'results';

function Results() {
  const location = useLocation();
  const navigation = useNavigation();
  const isDetailPath = navigation.location?.pathname
    ? matchPath('/search/:page/:detail', navigation.location.pathname)
    : null;
  const isDetailLoad = !!isDetailPath;
  const pagedResponce: PagedResponseType = useLoaderData();

  console.log(location);

  const [isClose, setIsClose] = useState(false);

  function handleClose(e: Event) {
    if (matchPath('/search/:page/:detail', location.pathname)) {
      e.stopPropagation();
      console.log('setclose');

      setIsClose(true);
    }
  }

  return (
    <>
      <Pagination pagination={pagedResponce} />
      <div className={styles[resultWrapperClass]}>
        <div className={styles[resultsClass]} onClickCapture={(e: Event) => handleClose(e)}>
          <ShowResults response={pagedResponce} />
        </div>

        {navigation.state === 'loading' && isDetailLoad ? (
          <div className={detailStyles['datail-wrapper']}>
            <Loader />
          </div>
        ) : (
          <Outlet context={[isClose, setIsClose]} />
        )}
      </div>
    </>
  );
}

export default Results;
