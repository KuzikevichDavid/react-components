import { getPaged, getRunningQueriesThunk, useGetPagedQuery } from '@/store/api/swapi';
import { setPagedResponse } from '@/store/reducers/response/pagedResponseSlice';
import { RootState, wrapper } from '@/store/store';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import styles from '@/layouts/Results.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { closeDetail } from '@/store/reducers/detailIsShowed/detailIsShowedSlice';
import ShowResults from '@/components/ShowResults';
import Loader from '@/components/loader/Loader';
import RootLayout from '@/layouts/RootLayout';
import Search from '@/components/search/Search';
import { setEndpoint, setItemsPerPage, setSearch } from '@/store/reducers/search/searchSlice';
import Pagination from '@/components/pagination/Pagination';
// import { parseBody } from 'next/dist/server/api-utils/node/parse-body';

const resultWrapperClass = 'results-wrapper';

export const resultsClass = 'results';

export const resultsTitle = '"Main" section';

function Results(/* { data } */) {
  const router = useRouter();
  const dispatch = useDispatch();

  // console.log('props');
  // console.log(props);
  console.log('router');

  console.log(router);

  const { endpoint, page } = router.query;
  const query = useGetPagedQuery(
    { endpoint: endpoint as string, page: +(page as string) },
    {
      // If the page is not yet generated, router.isFallback will be true
      // initially until getStaticProps() finishes running
      skip: router.isFallback,
    }
  );

  const { /*  isLoading, */ data } = query;
  const detailIsShowed = useSelector((state: RootState) => state.detailIsShowed.isShowed);

  // const loadingFlags = useSelector((state: RootState) => state.loadingFlags);
  // const { detailSectionIsLoading, mainSectionIsLoading } = loadingFlags;

  useEffect(() => {
    if (data) {
      dispatch(setPagedResponse(data));
    }
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
          {router.isFallback /* || isLoading */ ? <Loader /> : <ShowResults />}
        </div>

        {/* {navigation.state === 'loading' && detailSectionIsLoading ? (
          <div className={detailStyles['datail-wrapper']}>
            <Loader />
          </div>
        ) : (
          <Outlet />
        )} */}
      </div>
    </>
  );
}

Results.getLayout = (page: ReactElement, isLoading = false) => (
  <RootLayout>
    <Search />
    {isLoading ? <Loader /> : page}
  </RootLayout>
);

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  console.log('getServerSideProps');

  const { endpoint, page, search, perPage } = context.query;

  console.log(context.resolvedUrl);

  console.log(context.params);

  console.log(context.query);
  const args = {
    endpoint: (endpoint as string) ?? null,
    page: +(page as string) ?? null,
    search: (search as string) ?? null,
    itemsPerPage: +(perPage as string) ?? null,
  };

  if (args.endpoint) store.dispatch(setEndpoint(args.endpoint));
  if (args.itemsPerPage) store.dispatch(setItemsPerPage(args.itemsPerPage));
  if (args.search) store.dispatch(setSearch(args.search));
  const promise = store.dispatch(getPaged.initiate(args));

  await Promise.all(store.dispatch(getRunningQueriesThunk()));
  await promise;

  return {
    props: {
      /* data: data[0].data,
        fallback: true */
    },
  };
});

// let appStore: AppStore;
// let pp: number;

/* export async function getStaticPaths() {
  console.log('getStaticPaths');

  // const store = wrapper.useWrappedStore({}, '').store
  // wrapper.

  const store = appStore ? appStore : setupStore();
  const state = store.getState()
  console.log(pp);

  const { search: { endpoint, perPage }, pagedResponse: { response: { page } } } = state;
  const result = await store.dispatch(getPaged.initiate({ endpoint }));

  const res = []
  const prev = ``;
  const first = ``;
  const last = ``;
  const next = ``;
  return {
    paths: [`/${endpoint}/search/${page}/`,],
    fallback: true,
  };
} */

/* export const getStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    console.log('getStaticProps');
    appStore = store;
    const { endpoint, page } = context.params
    console.log(context.params);

    pp = +(page as string)
    store.dispatch(setEndpoint(endpoint as string))
    store.dispatch(getPaged.initiate({ endpoint: endpoint as string, page: +(page as string) }));

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
); */

export default Results;
