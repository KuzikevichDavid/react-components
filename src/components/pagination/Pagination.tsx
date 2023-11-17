import { Form, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RoutePath from '../../routePath';
import styles from './Pagination.module.css';
import { RootState } from '../../store/RootState';
import { setItemsPerPage } from '../../store/reducers/search/searchSlice';
import { mainSectionStartLoading } from '../../store/reducers/loadingFlag/loadingFlagSlice';

export const paginationFormName = 'paginationForm';

const selectClassName = 'itemsPerPage';

const method = 'post';

function Pagination() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const endpoint = useSelector((state: RootState) => state.search.endpoint);
  const itemsPerPage = useSelector((state: RootState) => state.search.perPage);
  const pagedResponse = useSelector((state: RootState) => state.pagedResponse.response);
  const { page, pageCount } = pagedResponse;

  const serachPath = `${endpoint}/${RoutePath.Search}`;

  function handleChangeItemsPerPage(e: Event) {
    const selectElement = e.target as HTMLSelectElement;
    dispatch(setItemsPerPage(+selectElement.value));
    dispatch(mainSectionStartLoading());
    navigate(`../${serachPath}/1`);
  }

  function handleChangePage() {
    dispatch(mainSectionStartLoading());
  }
  const prevDisabled = page === 1;
  const nextDisabled = page === pageCount;

  return (
    <div className={styles['pagination-wrapper']}>
      <Form method={method} action={`/${serachPath}/1`}>
        <select
          className={selectClassName}
          defaultValue={itemsPerPage}
          onChange={(e: Event) => handleChangeItemsPerPage(e)}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </Form>
      <Form method={method} action={`/${serachPath}/1`} onSubmit={() => handleChangePage()}>
        <input type="hidden" name="formName" value={paginationFormName} />
        <button type="submit" disabled={prevDisabled}>
          {'<<'}
        </button>
      </Form>
      <Form
        method={method}
        action={`/${serachPath}/${page - 1}`}
        onSubmit={() => handleChangePage()}
      >
        <input type="hidden" name="formName" value={paginationFormName} />
        <button type="submit" disabled={prevDisabled}>
          {'<'}
        </button>
      </Form>
      <button type="button" disabled>
        {page}
      </button>
      <Form
        method={method}
        action={`/${serachPath}/${page + 1}`}
        onSubmit={() => handleChangePage()}
      >
        <input type="hidden" name="formName" value={paginationFormName} />
        <button type="submit" disabled={nextDisabled}>
          {'>'}
        </button>
      </Form>
      <Form
        method={method}
        action={`/${serachPath}/${pageCount}`}
        onSubmit={() => handleChangePage()}
      >
        <input type="hidden" name="formName" value={paginationFormName} />
        <button type="submit" disabled={nextDisabled}>
          {'>>'}
        </button>
      </Form>
    </div>
  );
}

export default Pagination;
