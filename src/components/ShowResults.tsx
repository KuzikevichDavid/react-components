import { useDispatch, useSelector } from 'react-redux';
import { Item } from '../api/apiResponseType';
import { openDetail } from '../store/reducers/detailIsShowed/detailIsShowedSlice';
import { detailSectionStartLoading } from '../store/reducers/loadingFlag/loadingFlagSlice';
import { RootState } from '../store/RootState';
import ShowItem from './ShowItem';

const showedCount = 4;

export const openDatailTestId = 'openDatail';

const resultSectionClass = 'apiCallResults';

function ShowResults() {
  const dispatch = useDispatch();

  // const endpoint = useSelector((state: RootState) => state.search.endpoint);
  const pagedResponse = useSelector((state: RootState) => state.pagedResponse.response);
  const { /* page, */ results: resultItems } = pagedResponse;

  // const serachPath = `${endpoint}/${RoutePath.Search}`;

  function handleOpenDetail(e: Event): void {
    e.preventDefault();

    dispatch(openDetail());
    dispatch(detailSectionStartLoading());
  }

  if (resultItems) {
    const results = Object.entries(resultItems);
    if (results.length > 0) {
      return (
        <section className={resultSectionClass}>
          {results.map(function a(mapVal: [string, Item]) {
            const [, val] = mapVal;
            return (
              <form
                method="get"
                className="card"
                key={`${Math.random()}`}
                // action={`/${serachPath}/${page}/${val.name ?? val.title}`}
                onSubmit={(e: Event) => handleOpenDetail(e)}
                data-testid={openDatailTestId}
              >
                <button type="submit">
                  <ShowItem item={val} showedCount={showedCount} />
                </button>
              </form>
            );
          })}
        </section>
      );
    }
    return <p>Nothing to show</p>;
  }
  return null;
}

export default ShowResults;
