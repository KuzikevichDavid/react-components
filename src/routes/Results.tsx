import { useLoaderData, Outlet, useNavigation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShowResults from '../components/ShowResults';
import { PagedResponseType } from '../api/apiResponseType';
import Pagination from '../components/pagination/Pagination';
import styles from './Results.module.css';
import detailStyles from './Detail.module.css';
import Loader from '../components/loader/Loader';
import { RootState } from '../store/store';
import { setPagedResponse } from '../features/response/pagedResponseSlice';
import { closeDetail } from '../features/detailIsShowed/detailIsShowedSlice';

const resultWrapperClass = 'results-wrapper';

export const resultsClass = 'results';

export const resultsTitle = '"Main" section';

function Results() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const data = useLoaderData() as PagedResponseType;

  const detailIsShowed = useSelector((state: RootState) => state.detailIsShowed.isShowed);

  const loadingFlags = useSelector((state: RootState) => state.loadingFlags);
  const { detailSectionIsLoading, mainSectionIsLoading } = loadingFlags;

  useEffect(() => {
    dispatch(setPagedResponse(data));
  }, [data]);

  function handleClose(e: Event) {
    if (detailIsShowed) {
      e.stopPropagation();

      console.log('closeDetail');

      dispatch(closeDetail());
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
          {navigation.state === 'loading' && mainSectionIsLoading ? <Loader /> : <ShowResults />}
        </div>

        {navigation.state === 'loading' && detailSectionIsLoading ? (
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
