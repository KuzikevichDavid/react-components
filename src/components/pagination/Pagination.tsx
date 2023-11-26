import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styles from './Pagination.module.css';
import { RootState } from '../../store/RootState';
import { setItemsPerPage } from '../../store/reducers/search/searchSlice';

export const paginationformName = 'paginationform';

const selectClassName = 'itemsPerPage';

const method = 'post';

const startPage = 1;

function Pagination() {
  const router = useRouter();
  const dispatch = useDispatch();

  const search = useSelector((state: RootState) => state.search);
  const { endpoint, perPage, searchText } = search;
  const itemsPerPage = useSelector((state: RootState) => state.search.perPage);
  const pagedResponse = useSelector((state: RootState) => state.pagedResponse.response);
  const { page, pageCount } = pagedResponse;

  const getActionPath = (actionPage: number = startPage, actionPerPage: number = perPage) =>
    `/${endpoint}?page=${actionPage}${actionPerPage ? `&perPage=${actionPerPage}` : ''}${
      searchText ? `&search=${searchText}` : ''
    }`;
  const actionPath = getActionPath();

  async function handleChangeItemsPerPage(e: Event): Promise<void> {
    const selectedValue = +(e.target as HTMLSelectElement).value;
    dispatch(setItemsPerPage(selectedValue));
    await router.push(getActionPath(undefined, selectedValue));
  }
  const prevDisabled = page === 1;
  const nextDisabled = page === pageCount;

  return (
    <div className={styles['pagination-wrapper']}>
      <form method={method} action={actionPath}>
        <select
          className={selectClassName}
          defaultValue={itemsPerPage}
          onChange={(e: Event) => handleChangeItemsPerPage(e)}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </form>
      <form method={method} action={getActionPath()}>
        <input type="hidden" name="formName" value={paginationformName} />
        <button type="submit" disabled={prevDisabled}>
          {'<<'}
        </button>
      </form>
      <form method={method} action={getActionPath(page - 1)}>
        <input type="hidden" name="formName" value={paginationformName} />
        <button type="submit" disabled={prevDisabled}>
          {'<'}
        </button>
      </form>
      <button type="button" disabled>
        {page}
      </button>
      <form method={method} action={getActionPath(page + 1)}>
        <input type="hidden" name="formName" value={paginationformName} />
        <button type="submit" disabled={nextDisabled}>
          {'>'}
        </button>
      </form>
      <form method={method} action={getActionPath(pageCount)}>
        <input type="hidden" name="formName" value={paginationformName} />
        <button type="submit" disabled={nextDisabled}>
          {'>>'}
        </button>
      </form>
    </div>
  );
}

export default Pagination;
