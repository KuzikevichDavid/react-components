import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-router-dom';
import { Item } from '../api/apiResponseType';
import { openDetail } from '../features/detailIsShowedSlice';
import { detailSectionStartLoading } from '../features/loadingFlag/loadingFlagSlice';
import RoutePath from '../routePath';
import { RootState } from '../store/store';
import ShowItem from './ShowItem';

const showedCount = 4;

const resultSectionClass = 'apiCallResults';

function ShowResults() {
  const dispatch = useDispatch();

  const endpoint = useSelector((state: RootState) => state.search.endpoint);
  const pagedResponse = useSelector((state: RootState) => state.pagedResponse.response);
  const { page, results: resultItems } = pagedResponse;

  const serachPath = `${endpoint}/${RoutePath.Search}`;

  function handleOpenDetail(): void {
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
              <Form
                method="get"
                className="card"
                key={`${Math.random()}`}
                action={`/${serachPath}/${page}/${val.name ?? val.title}`}
                onSubmit={() => handleOpenDetail()}
              >
                <button type="submit">
                  <ShowItem item={val} showedCount={showedCount} />
                </button>
              </Form>
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
