import { getPaged, getRunningQueriesThunk } from '@/store/api/swapi';
import { setPagedResponse } from '@/store/reducers/response/pagedResponseSlice';
import { RootState, wrapper } from '@/store/store';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import styles from '@/styles/Results.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { closeDetail, openDetail } from '@/store/reducers/detailIsShowed/detailIsShowedSlice';
import ShowResults from '@/components/ShowResults';
import Loader from '@/components/loader/Loader';
import RootLayout from '@/layouts/RootLayout';
import Search from '@/components/search/Search';
import { setEndpoint, setItemsPerPage, setSearch } from '@/store/reducers/search/searchSlice';
import Pagination from '@/components/pagination/Pagination';
import Detail from '@/components/Detail';
import { setResponse } from '@/store/reducers/response/responceSlice';
import { PagedResponseType } from '@/api/apiResponseType';

const resultWrapperClass = 'results-wrapper';

export const resultsClass = 'results';

export const resultsTitle = '"Main" section';

function Results({ data, detail }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const detailIsShowed = useSelector((state: RootState) => state.detailIsShowed.isShowed);

  useEffect(() => {
    if (data) {
      dispatch(setPagedResponse(data));
    }
  }, [data]);

  useEffect(() => {
    if (detail) {
      dispatch(openDetail());
      dispatch(setResponse(detail));
    } else {
      dispatch(closeDetail());
    }
  }, [detail]);

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
          <ShowResults />
        </div>

        {detailIsShowed && <Detail />}
      </div>
    </>
  );
}

Results.getLayout = (page: ReactElement, isLoading = false) => (
  <RootLayout>
    <Search />
    {isLoading && <Loader />}
    {page}
  </RootLayout>
);

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  console.log('getServerSideProps');

  const { endpoint, page, search, perPage, detail } = context.query;

  const args = {
    endpoint: (endpoint as string) ?? null,
    page: +(page as string) ?? null,
    search: (search as string) ?? null,
    itemsPerPage: +(perPage as string) ?? null,
  };

  const detailName = detail as string;

  if (args.endpoint) store.dispatch(setEndpoint(args.endpoint));
  if (args.itemsPerPage) store.dispatch(setItemsPerPage(args.itemsPerPage));
  if (args.search) store.dispatch(setSearch(args.search));
  const promise = store.dispatch(getPaged.initiate(args));

  const data = await Promise.all(store.dispatch(getRunningQueriesThunk()));
  await promise;

  return {
    props: {
      data: data[0].data,
      detail: detailName
        ? {
            results: [
              (data[0].data as PagedResponseType).results.find(
                (x) => x.name ?? x.title === detailName
              ),
            ],
          }
        : null,
    },
  };
});

export default Results;
