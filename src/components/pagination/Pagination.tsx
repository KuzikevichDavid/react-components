import { Form, useNavigate } from 'react-router-dom';
import { PagedResponseType } from '../../api/apiResponseType';
import { starageItemsPerPageKey } from '../search/storageKeys';
import styles from './Pagination.module.css';

interface PropType {
  pagination: PagedResponseType;
}

export const paginationFormName = 'paginationForm';

const selectClassName = 'itemsPerPage';

function Pagination({ pagination: { page, pageCount, itemsPerPage } }: PropType) {
  const navigate = useNavigate();

  function handleChangeItemsPerPage() {
    const selectElement: HTMLSelectElement = document.querySelector(`.${selectClassName}`)!;
    localStorage.setItem(starageItemsPerPageKey, selectElement.value);
    navigate('../search/1');
  }
  const prevDisabled = page === 1;
  const nextDisabled = page === pageCount;

  return (
    <div className={styles['pagination-wrapper']}>
      <Form method="post" action="/search/1">
        <select
          className={selectClassName}
          defaultValue={itemsPerPage}
          onChange={() => handleChangeItemsPerPage()}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </Form>
      <Form method="post" action="/search/1">
        <input type="hidden" name="formName" value={paginationFormName} />
        <button type="submit" disabled={prevDisabled}>
          {'<<'}
        </button>
      </Form>
      <Form method="post" action={`/search/${page - 1}`}>
        <input type="hidden" name="formName" value={paginationFormName} />
        <button type="submit" disabled={prevDisabled}>
          {'<'}
        </button>
      </Form>
      <button type="button" disabled>
        {page}
      </button>
      <Form method="post" action={`/search/${page + 1}`}>
        <input type="hidden" name="formName" value={paginationFormName} />
        <button type="submit" disabled={nextDisabled}>
          {'>'}
        </button>
      </Form>
      <Form method="post" action={`/search/${pageCount}`}>
        <input type="hidden" name="formName" value={paginationFormName} />
        <button type="submit" disabled={nextDisabled}>
          {'>>'}
        </button>
      </Form>
    </div>
  );
}

export default Pagination;
