import { useContext } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import SearchContext from '../../contexts/SearchContext';
import RoutePath from '../../routePath';
import { storageItemsPerPageKey } from '../search/storageKeys';
import styles from './Pagination.module.css';

export const paginationFormName = 'paginationForm';

const selectClassName = 'itemsPerPage';

const method = 'post';

function Pagination() {
  const navigate = useNavigate();
  const {
    response: [{ page, pageCount, itemsPerPage }],
    endpoint: [enpoint],
    perPage: [, setPerPage],
  } = useContext(SearchContext);

  const serachPath = `${enpoint}/${RoutePath.Search}`;

  function handleChangeItemsPerPage(e: Event) {
    const selectElement = e.target as HTMLSelectElement;
    localStorage.setItem(storageItemsPerPageKey, selectElement.value);
    setPerPage(+selectElement.value);
    navigate(`../${serachPath}/1`);
  }
  const prevDisabled = page === 1;
  const nextDisabled = page === pageCount;

  return (
    <div className={styles['pagination-wrapper']}>
      <Form method={method} action={`${serachPath}/1`}>
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
      <Form method={method} action={`/${serachPath}/1`}>
        <input type="hidden" name="formName" value={paginationFormName} />
        <button type="submit" disabled={prevDisabled}>
          {'<<'}
        </button>
      </Form>
      <Form method={method} action={`/${serachPath}/${page - 1}`}>
        <input type="hidden" name="formName" value={paginationFormName} />
        <button type="submit" disabled={prevDisabled}>
          {'<'}
        </button>
      </Form>
      <button type="button" disabled>
        {page}
      </button>
      <Form method={method} action={`/${serachPath}/${page + 1}`}>
        <input type="hidden" name="formName" value={paginationFormName} />
        <button type="submit" disabled={nextDisabled}>
          {'>'}
        </button>
      </Form>
      <Form method={method} action={`/${serachPath}/${pageCount}`}>
        <input type="hidden" name="formName" value={paginationFormName} />
        <button type="submit" disabled={nextDisabled}>
          {'>>'}
        </button>
      </Form>
    </div>
  );
}

export default Pagination;
